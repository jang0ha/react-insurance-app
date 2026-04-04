import { useState, useRef, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { ChatStatus } from '@/types';

interface ChatInputProps {
  onSend: (message: string) => void;
  onStop: () => void;
  status: ChatStatus;
}

const Container = styled.div`
  padding: var(--spacing-md);
  width:100%;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  background: var(--color-ai-bg);
  border-radius: 24px;
  padding: 8px 8px 8px 16px;
`;

const Textarea = styled.textarea`
  flex: 1;
  border: none;
  background: transparent;
  resize: none;
  font-size: var(--font-size-base);
  line-height: 1.5;
  outline: none;
  max-height: 120px;
  overflow-y: auto;
  font-family: inherit;

  &::placeholder {
    color: #9ca3af;
  }

  &:disabled {
    opacity: 0.6;
  }
`;

const Button = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  flex-shrink: 0;
  transition: opacity var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SendButton = styled(Button)`
  background: var(--color-primary);
  color: white;

  &:hover:not(:disabled) {
    background: var(--color-primary-dark);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const StopButton = styled(Button)`
  background: #ef4444;
  color: white;

  &:hover {
    background: #dc2626;
  }
`;

const Hint = styled.p`
  font-size: 0.75rem;
  color: #9ca3af;
  text-align: right;
  margin-top: 4px;
  margin-bottom: 0;
`;

const SrOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  clip: rect(0, 0, 0, 0);
  overflow: hidden;
`;

export function ChatInput({ onSend, onStop, status }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isActive = status === 'loading' || status === 'streaming';

  const handleSend = () => {
    if (!input.trim() || isActive) return;
    onSend(input);
    setInput('');
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // auto-resize
    const ta = e.target;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 120) + 'px';
  };

  return (
    <Container role="form" aria-label="메시지 입력">
      <InputWrapper>
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="보험 관련 질문을 입력하세요... (Enter로 전송)"
          rows={1}
          maxLength={2000}
          disabled={isActive}
          aria-label="메시지 입력창"
          aria-describedby="input-hint"
        />
        <SrOnly id="input-hint">
          Enter 키로 전송, Shift+Enter로 줄바꿈
        </SrOnly>
        {isActive ? (
          <StopButton
            onClick={onStop}
            aria-label="AI 응답 중지"
            type="button"
          >
            ■
          </StopButton>
        ) : (
          <SendButton
            onClick={handleSend}
            disabled={!input.trim()}
            aria-label="메시지 전송"
            type="button"
          >
            ↑
          </SendButton>
        )}
      </InputWrapper>
      <Hint>{input.length}/2000</Hint>
    </Container>
  );
}
