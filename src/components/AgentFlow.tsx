import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAgentStore } from "../store/agentStore";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #1f2937;
  }

  p {
    font-size: 16px;
    color: #6b7280;
  }
`;

const ControlArea = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const FlowContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const AgentCard = styled.div<{ status: string }>`
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #f9fafb;
  animation: slideIn 0.3s ease;

  ${(props) => {
    if (props.status === "processing") {
      return `
        border-color: #3b82f6;
        background-color: #eff6ff;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      `;
    }
    if (props.status === "complete") {
      return `
        border-color: #10b981;
        background-color: #f0fdf4;
      `;
    }
    return "";
  }}

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const AgentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e5e7eb;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;
  }
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;

  ${(props) => {
    switch (props.status) {
      case "processing":
        return "background-color: #dbeafe; color: #0369a1;";
      case "complete":
        return "background-color: #d1fae5; color: #065f46;";
      case "idle":
        return "background-color: #f3f4f6; color: #6b7280;";
      default:
        return "";
    }
  }}
`;

const Spinner = styled.div`
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 2px solid #dbeafe;
  border-top-color: #0369a1;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 300px;
  overflow-y: auto;
  padding: 10px 0;
`;

const Message = styled.div`
  padding: 10px;
  background-color: white;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
  line-height: 1.5;
  border-left: 3px solid #3b82f6;
`;

const ResultBox = styled.div`
  padding: 15px;
  background-color: #f0fdf4;
  border: 1px solid #10b981;
  border-radius: 6px;
  margin-top: 10px;
  font-size: 13px;
  color: #1f2937;
  font-weight: 500;
`;

export const AgentFlow: React.FC = () => {
  const {
    analyzer,
    reviewer,
    conclusor,
    currentAgent,
    startFlow,
    addMessage,
    setAgentStatus,
    resetFlow,
  } = useAgentStore();

  const [flowStarted, setFlowStarted] = useState(false);

  // Mock 데이터
  const mockMessages = {
    analyzer: [
      "입력 데이터 분석 중...",
      "보험 상품 검색 중...",
      "암보험 3가지 발견 ✓",
    ],
    reviewer: [
      "분석가 결과 검증 중...",
      "조건 충족 여부 확인...",
      "암보험 A: 우수 ✓",
      "암보험 B: 적합 ✓",
      "암보험 C: 위험 요소 있음 ⚠",
    ],
    conclusor: [
      "모든 검토 완료",
      "최종 추천 순위 결정 중...",
      "암보험 A를 최고로 추천합니다 ✓",
    ],
  };

  const handleStartFlow = async () => {
    setFlowStarted(true);
    resetFlow();
    startFlow();

    // Agent 1: Analyzer
    await simulateAgent("analyzer", mockMessages.analyzer);

    // Agent 2: Reviewer
    setAgentStatus("analyzer", "complete");
    setAgentStatus("reviewer", "processing");
    await simulateAgent("reviewer", mockMessages.reviewer);

    // Agent 3: Conclusor
    setAgentStatus("reviewer", "complete");
    setAgentStatus("conclusor", "processing");
    await simulateAgent("conclusor", mockMessages.conclusor);

    setAgentStatus("conclusor", "complete");
  };

  const simulateAgent = (
    agent: "analyzer" | "reviewer" | "conclusor",
    messages: string[],
  ) => {
    return new Promise<void>((resolve) => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < messages.length) {
          addMessage(agent, messages[index]);
          index++;
        } else {
          clearInterval(interval);
          resolve();
        }
      }, 800); // 각 메시지마다 0.8초
    });
  };

  return (
    <Container>
      <Header>
        <h1>🤖 AI Agent Flow</h1>
        <p>3개의 에이전트가 협업하여 최적의 보험을 추천합니다</p>
      </Header>

      <ControlArea>
        <Button onClick={handleStartFlow} disabled={flowStarted}>
          {flowStarted ? "Flow 실행 중..." : "Flow 시작하기"}
        </Button>
        <Button
          onClick={() => {
            resetFlow();
            setFlowStarted(false);
          }}
          style={{ backgroundColor: "#6b7280" }}
        >
          초기화
        </Button>
      </ControlArea>

      <FlowContainer>
        {/* Agent 1: Analyzer */}
        <AgentCard status={analyzer.status}>
          <AgentHeader>
            <h3>📊 ANALYZER</h3>
            <StatusBadge status={analyzer.status}>
              {analyzer.status === "processing" && <Spinner />}
              {analyzer.status === "processing" ? " 분석 중" : analyzer.status}
            </StatusBadge>
          </AgentHeader>

          <MessageList>
            {analyzer.messages.map((msg) => (
              <Message key={msg.id}>{msg.text}</Message>
            ))}
          </MessageList>

          {analyzer.status === "complete" && (
            <ResultBox>✓ 암보험 3가지 상품 발견</ResultBox>
          )}
        </AgentCard>

        {/* Agent 2: Reviewer */}
        <AgentCard status={reviewer.status}>
          <AgentHeader>
            <h3>✅ REVIEWER</h3>
            <StatusBadge status={reviewer.status}>
              {reviewer.status === "processing" && <Spinner />}
              {reviewer.status === "processing" ? " 검토 중" : reviewer.status}
            </StatusBadge>
          </AgentHeader>

          <MessageList>
            {reviewer.messages.map((msg) => (
              <Message key={msg.id}>{msg.text}</Message>
            ))}
          </MessageList>

          {reviewer.status === "complete" && (
            <ResultBox>✓ 검증 완료 (2개 적합, 1개 위험)</ResultBox>
          )}
        </AgentCard>

        {/* Agent 3: Conclusor */}
        <AgentCard status={conclusor.status}>
          <AgentHeader>
            <h3>🎯 CONCLUSOR</h3>
            <StatusBadge status={conclusor.status}>
              {conclusor.status === "processing" && <Spinner />}
              {conclusor.status === "processing"
                ? " 결론 도출 중"
                : conclusor.status}
            </StatusBadge>
          </AgentHeader>

          <MessageList>
            {conclusor.messages.map((msg) => (
              <Message key={msg.id}>{msg.text}</Message>
            ))}
          </MessageList>

          {conclusor.status === "complete" && (
            <ResultBox>
              <strong>🏆 최종 추천: 암보험 A</strong>
              <p style={{ margin: "8px 0 0 0" }}>
                보험료 대비 보장범위가 가장 우수합니다
              </p>
            </ResultBox>
          )}
        </AgentCard>
      </FlowContainer>
    </Container>
  );
};

export default AgentFlow;
