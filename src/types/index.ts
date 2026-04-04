// Global Type Definitions

// Chat Types
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export type ChatStatus = 'idle' | 'loading' | 'streaming' | 'error';

// Insurance Product Types
export interface InsuranceProduct {
  id: string;
  name: string;
  company: string;
  monthlyPremium: number;
  coverage: string[];
  badge?: string;
  recommended?: boolean;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  message?: string;
  error?: string;
}

// Common Component Props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Button Props
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends BaseComponentProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
}

// Input Props
export interface InputProps
  extends BaseComponentProps,
    React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

// Modal Props
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// Card Props
export interface CardProps extends BaseComponentProps {
  variant?: 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
}

// Common Utility Types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;

// Toast/Notification Types
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

// Loading State Types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T = unknown> {
  status: LoadingState;
  data?: T;
  error?: Error;
  isLoading: boolean;
}
