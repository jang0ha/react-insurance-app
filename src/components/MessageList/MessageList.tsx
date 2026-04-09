import { useEffect, useRef } from "react";
import styled from "styled-components";
import { Message, ChatStatus } from "@/types";
import { MessageBubble } from "@/components/MessageBubble/MessageBubble";
import { LoadingDots } from "@/components/LoadingDots/LoadingDots";

interface MessageListProps {
  messages: Message[];
  status: ChatStatus;
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0;
  min-height: 200px;
  padding: var(--spacing-md);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  @media (max-width: 767px) {
    max-height: calc(100vh - 190px);
  }

  @media (min-width: 768px) {
    max-height: calc(100vh - 280px);
  }
`;

const ClearButton = styled.button`
  padding: 8px 16px;
  background: var(--color-danger);
  border: none;
  border-radius: 8px;
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: background var(--transition-fast);

  &:hover {
    background: #dc2626;
  }
`;

export function MessageList({ messages, status }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 사용자 메시지(2개 이상)가 있을 때만 스크롤
    if (messages.length > 1) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, status]);

  return (
    <Container
      role="log"
      aria-label="대화 기록"
      aria-live="polite"
      aria-atomic="false"
    >
      <ol role="list" style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {messages.map((msg, index) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isLastMessage={index === messages.length - 1}
            isLoading={status === "loading" || status === "streaming"}
          />
        ))}
      </ol>
      <div ref={bottomRef} aria-hidden="true" />
    </Container>
  );
}
