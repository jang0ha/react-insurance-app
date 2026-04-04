import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useChat } from "@/hooks/useChat";
import { ProductCarousel } from "@/components/ProductCarousel/ProductCarousel";
import { MessageList } from "@/components/MessageList/MessageList";
import { ChatInput } from "@/components/ChatInput/ChatInput";
import { InsuranceProduct } from "@/types";
import { Button } from "@/components/Button";

const INIT_MESSAGE =
  "안녕하세요! 고객 정보를 알려주세요. 먼저 성함과 나이는 어떻게 되나요? (예시: 홍길동 25)";
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--color-bg);
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-lg);
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
`;

const Title = styled.h1`
  font-size: var(--font-size-2xl);
  color: var(--color-gray-900);
  margin: 0;
`;

const ErrorBanner = styled.div`
  padding: var(--spacing-md);
  background: #fee2e2;
  color: #991b1b;
  border-left: 4px solid var(--color-danger);
  font-size: var(--font-size-sm);
`;

export default function App() {
  const {
    messages,
    status,
    error,
    sendMessage,
    stopStreaming,
    clearMessages,
    addInitialAIMessage,
  } = useChat();
  const initializingRef = useRef(false);

  // 앱 로드 시 초기 AI 메시지 자동 전송
  useEffect(() => {
    if (
      !initializingRef.current &&
      messages.length === 0 &&
      status === "idle"
    ) {
      initializingRef.current = true;
      addInitialAIMessage(INIT_MESSAGE);
    }
  }, [messages.length, status, addInitialAIMessage]);

  const handleProductSelect = (product: InsuranceProduct) => {
    const message = `${product.name}에 대해 알려줘.`;
    sendMessage(message);
  };

  return (
    <AppContainer>
      <Header>
        <Title>보험 AI 어시스턴트</Title>
      </Header>

      <ProductCarousel onProductSelect={handleProductSelect} />
      <div
        style={{
          background: "#fff",
          borderBottom: "1px",
          padding: "1rem",
          display: "flex",
        }}
      >
        {messages.length > 1 && (
          <Button
            size="sm"
            variant="ghost"
            onClick={clearMessages}
            aria-label="채팅 히스토리 삭제"
            style={{ marginLeft: "auto" }}
          >
            RESET
          </Button>
        )}
      </div>
      <article className="container">
        <div style={{ maxHeight: "600px", overflow: "auto" }}>
          {/* 메세지 리스트 */}
          <MessageList messages={messages} status={status} />
        </div>
      </article>
      {error && <ErrorBanner role="alert">{error}</ErrorBanner>}

      <ChatInput onSend={sendMessage} onStop={stopStreaming} status={status} />
    </AppContainer>
  );
}
