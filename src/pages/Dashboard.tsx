import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useChat } from "@/hooks/useChat";
import { useToast } from "@/hooks/useToast";
import { ProductCarousel } from "@/components/ProductCarousel/ProductCarousel";
import { MessageList } from "@/components/MessageList/MessageList";
import { ChatInput } from "@/components/ChatInput/ChatInput";
import { InsuranceProduct } from "@/types";
import { Button } from "@/components/Button";
import { Title } from "@/components/Title";
import { SkipLink } from "@/components/SkipLink";

const INIT_MESSAGE =
  "안녕하세요! 고객 정보를 알려주세요. 먼저 성함과 나이는 어떻게 되나요? (예시: 홍길동 25)";
const AppContainer = styled.main`
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

const ChatArea = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MessageListWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

export default function Dashboard() {
  const {
    messages,
    status,
    error,
    sendMessage,
    stopStreaming,
    clearMessages,
    addInitialAIMessage,
  } = useChat();
  const { error: showErrorToast } = useToast();
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

  // 에러 발생 시 토스트 표시
  useEffect(() => {
    if (error) {
      showErrorToast(error, 5000);
    }
  }, [error]);

  const handleProductSelect = (product: InsuranceProduct) => {
    const message = `${product.name}에 대해 알려줘.`;
    sendMessage(message);
  };

  return (
    <>
      <SkipLink />
      <Header>
        <Title>보험 AI 어시스턴트</Title>
      </Header>
      <AppContainer id="main-content" aria-busy={status === "loading" || status === "streaming"}>
        <ProductCarousel onProductSelect={handleProductSelect} />
        <section
          style={{
            display: "flex",
            background: "#fff",
            borderBottom: "1px solid var(--color-border)",
            padding: "var(--spacing-md) var(--spacing-lg)",
          }}
          aria-label="채팅 컨트롤"
        >
          <Title as="h2">채팅</Title>
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
        </section>
        <ChatArea aria-label="대화 영역">
          <MessageListWrapper>
            <MessageList messages={messages} status={status} />
          </MessageListWrapper>
        </ChatArea>

        <ChatInput
          onSend={sendMessage}
          onStop={stopStreaming}
          status={status}
        />
      </AppContainer>
    </>
  );
}
