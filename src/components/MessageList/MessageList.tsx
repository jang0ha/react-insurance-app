import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Message, ChatStatus } from '@/types';
import { MessageBubble } from '@/components/MessageBubble/MessageBubble';
import { LoadingDots } from '@/components/LoadingDots/LoadingDots';



interface MessageListProps {
  messages: Message[];
  status: ChatStatus;
}

const Container = styled.section`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const ClearButton = styled.button`
  padding: 8px 16px;
  background: var(--color-danger);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: var(--font-size-sm);
  font-weight: 600;
  transition: background var(--transition-fast);

  &:hover {
    background: #DC2626;
  }
`;

export function MessageList({ messages, status }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, status]);

  return (
    <Container
      role="log"
      aria-label="대화 기록"
      aria-live="polite"
      aria-atomic="false"
    >
      <ol role="list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {messages.map((msg, index) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isLastMessage={index === messages.length - 1}
            isLoading={status === 'loading' || status === 'streaming'}
          />
        ))}
      </ol>
      <div ref={bottomRef} aria-hidden="true" />
    </Container >
  );
}
