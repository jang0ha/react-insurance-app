import { create } from "zustand";

// 타입 정의
export type AgentStatus = "idle" | "processing" | "complete" | "error";
export type AgentType = "analyzer" | "reviewer" | "conclusor";

export interface AgentMessage {
  id: string;
  text: string;
  timestamp: number;
}

export interface Agent {
  status: AgentStatus;
  messages: AgentMessage[];
}

export interface AgentFlowState {
  // 상태
  analyzer: Agent;
  reviewer: Agent;
  conclusor: Agent;
  currentAgent: AgentType | null;

  // 액션
  startFlow: () => void;
  addMessage: (agent: AgentType, message: string) => void;
  setAgentStatus: (agent: AgentType, status: AgentStatus) => void;
  resetFlow: () => void;
}

// 초기값
const initialAgent: Agent = {
  status: "idle",
  messages: [],
};

// Store
export const useAgentStore = create<AgentFlowState>((set) => ({
  analyzer: initialAgent,
  reviewer: initialAgent,
  conclusor: initialAgent,
  currentAgent: null,

  startFlow: () =>
    set({
      currentAgent: "analyzer",
      analyzer: { status: "processing", messages: [] },
      reviewer: initialAgent,
      conclusor: initialAgent,
    }),

  addMessage: (agent, message) =>
    set((state) => ({
      [agent]: {
        ...state[agent],
        messages: [
          ...state[agent].messages,
          {
            id: `${Date.now()}-${Math.random()}`,
            text: message,
            timestamp: Date.now(),
          },
        ],
      },
    })),

  setAgentStatus: (agent, status) =>
    set((state) => ({
      [agent]: {
        ...state[agent],
        status,
      },
      currentAgent: status === "complete" ? null : agent,
    })),

  resetFlow: () =>
    set({
      analyzer: initialAgent,
      reviewer: initialAgent,
      conclusor: initialAgent,
      currentAgent: null,
    }),
}));
