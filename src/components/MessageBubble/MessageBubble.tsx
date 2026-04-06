import { memo } from "react";
import styled from "styled-components";
import { Message } from "@/types";
import { LoadingDots } from "@/components/LoadingDots/LoadingDots";

interface MessageBubbleProps {
  message: Message;
  isLastMessage?: boolean;
  isLoading?: boolean;
}

const Wrapper = styled.li<{ $isUser: boolean }>`
  display: flex;
  align-items: flex-end;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  animation: fadeIn 0.2s ease;
  flex-direction: ${(props) => (props.$isUser ? "row-reverse" : "row")};
  white-space: break-spaces;
  list-style: none;
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Content = styled.div<{ $isUser: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};
`;

const Bubble = styled.article<{ $isUser: boolean }>`
  padding: 10px 14px;
  border-radius: var(--radius-bubble);
  word-break: break-word;
  line-height: 1.5;
  background: ${(props) =>
    props.$isUser ? "var(--color-primary)" : "var(--color-ai-bg)"};
  color: ${(props) =>
    props.$isUser ? "var(--color-user-text)" : "var(--color-ai-text)"};
  border-bottom-right-radius: ${(props) => (props.$isUser ? "4px" : "")};
  border-bottom-left-radius: ${(props) => (!props.$isUser ? "4px" : "")};

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
`;

const Text = styled.p`
  margin: 0;
  font-size: var(--font-size-base);
`;

const Cursor = styled.span`
  display: inline-block;
  animation: blink 0.7s infinite;

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
`;

const Timestamp = styled.time<{ $isUser: boolean }>`
  font-size: 0.75rem;
  color: #6b7280;
  display: block;
  text-align: ${(props) => (props.$isUser ? "right" : "left")};
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
  flex-shrink: 0;
`;

export const MessageBubble = memo(function MessageBubble({
  message,
  isLastMessage,
  isLoading,
}: MessageBubbleProps) {
  const isUser = message.role === "user";
  const timeStr = message.timestamp.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const showLoading = !isUser && isLastMessage && isLoading;

  return (
    <Wrapper $isUser={isUser}>
      {!isUser && <Avatar aria-label="AI 어시스턴트">AI</Avatar>}
      <Content $isUser={isUser}>
        {showLoading ? (
          <LoadingDots visible={true} />
        ) : (
          <>
            <Bubble
              $isUser={isUser}
              aria-label={`${isUser ? "사용자 메시지" : "AI 응답"}`}
              tabIndex={0}
            >
              <Text>{message.content}</Text>
              {message.isStreaming && <Cursor aria-hidden="true">▋</Cursor>}
            </Bubble>
            <Timestamp
              $isUser={isUser}
              dateTime={message.timestamp.toISOString()}
              aria-label={`${isUser ? "보낸 시간" : "받은 시간"}: ${timeStr}`}
            >
              {timeStr}
            </Timestamp>
          </>
        )}
      </Content>
    </Wrapper>
  );
});
