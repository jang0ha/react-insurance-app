import React, { createContext, useState, useCallback, ReactNode, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Toast as ToastType, ToastType as ToastTypeEnum } from '@/types';

// Toast Context
interface ToastContextType {
  toasts: ToastType[];
  addToast: (message: string, type?: ToastTypeEnum, duration?: number) => void;
  removeToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Toast Provider
interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = useCallback(
    (message: string, type: ToastTypeEnum = 'info', duration = 3000) => {
      const id = `${Date.now()}-${Math.random()}`;
      const newToast: ToastType = { id, message, type, duration };
      setToasts((prev) => [...prev, newToast]);

      // Auto remove
      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

// Toast Container Component
interface ToastContainerProps {
  toasts: ToastType[];
  onRemove: (id: string) => void;
}

const slideIn = keyframes`
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(400px);
    opacity: 0;
  }
`;

const Container = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: ${(props) => props.theme.zIndex.fixed};
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
  pointer-events: none;

  @media (max-width: 768px) {
    bottom: 16px;
    right: 16px;
    left: 16px;
    max-width: 100%;
  }
`;

const ToastItem = styled.div<{ $type: ToastTypeEnum; $isExiting?: boolean }>`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-lg);
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: ${(props) => (props.$isExiting ? slideOut : slideIn)} 0.3s ease-out;
  pointer-events: auto;

  /* Toast Type Colors */
  border-left: 4px solid
    ${(props) => {
      switch (props.$type) {
        case 'success':
          return '#10b981';
        case 'error':
          return '#ef4444';
        case 'warning':
          return '#f59e0b';
        case 'info':
          return '#3b82f6';
        default:
          return '#3b82f6';
      }
    }};

  color: var(--color-gray-900);
  font-size: var(--font-size-sm);
  line-height: 1.5;
`;

const IconWrapper = styled.div<{ $type: ToastTypeEnum }>`
  flex-shrink: 0;
  font-size: 1.25rem;
  color: ${(props) => {
    switch (props.$type) {
      case 'success':
        return '#10b981';
      case 'error':
        return '#ef4444';
      case 'warning':
        return '#f59e0b';
      case 'info':
        return '#3b82f6';
      default:
        return '#3b82f6';
    }
  }};
`;

const Message = styled.div`
  flex: 1;
  word-break: break-word;
`;

const CloseButton = styled.button`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #9ca3af;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  &:hover {
    color: #6b7280;
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
`;

function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <Container role="region" aria-live="polite" aria-label="토스트 알림">
      {toasts.map((toast) => (
        <ToastItemComponent key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </Container>
  );
}

interface ToastItemComponentProps {
  toast: ToastType;
  onRemove: (id: string) => void;
}

function ToastItemComponent({ toast, onRemove }: ToastItemComponentProps) {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onRemove(toast.id);
    }, 300);
  };

  const getIcon = (type: ToastTypeEnum) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
      default:
        return 'ℹ';
    }
  };

  return (
    <ToastItem $type={toast.type} $isExiting={isExiting} role="alert">
      <IconWrapper $type={toast.type}>{getIcon(toast.type)}</IconWrapper>
      <Message>{toast.message}</Message>
      <CloseButton
        onClick={handleClose}
        aria-label="토스트 닫기"
        type="button"
      >
        ✕
      </CloseButton>
    </ToastItem>
  );
}
