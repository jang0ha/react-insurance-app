import { GoogleGenerativeAI } from '@google/generative-ai';
import { Message } from '@/types';
import { INSURANCE_PRODUCTS } from '@/data/products';

const PRODUCTS_INFO = INSURANCE_PRODUCTS.map(p =>
  `- ${p.name} (${p.company}): 월 ${p.monthlyPremium.toLocaleString('ko-KR')}원 | 보장: ${p.coverage.join(', ')}`
).join('\n');

const SYSTEM_PROMPT = `당신은 보험 설계사를 위한 AI 어시스턴트입니다. 고객 맞춤형 보험 상품을 빠르게 추천합니다.

## 고객정보 수집 단계
아직 수집되지 않은 정보는 단계별로 질문하세요. 순서대로:
1. 이름과 나이
2. 직업 (직종)
3. 현재 건강상태
4. 월 보험료 예산

## 사용 가능한 상품
${PRODUCTS_INFO}

## 추천 기준
- 나이: 20-40대는 실손/암보험, 40대+ 종신보험 검토
- 직업: 위험직종이면 배상책임보험, 주택소유자면 화재보험 추가 검토
- 건강상태: 기왕증이 있으면 암보험/실손 가입율 낮음
- 예산: 월 예산 범위 내에서 가장 보장이 좋은 상품 추천

## 응답 가이드
- **정보 수집 단계**: 부족한 정보는 명확한 질문으로 수집
- **추천 단계**: 모든 정보 수집 후, 추천 상품 3-5개를 비교 분석해서 제시
- **형식**: 간결하고 명확하게, 마크다운 포맷 최소화
- **길이**: 한 응답은 150단어 이내로 유지`;

// Rate limiting: enforce minimum delay between requests (free tier limit: 60 req/min)
const MIN_REQUEST_INTERVAL = 1500; // 1.5 seconds between requests
let lastRequestTime = 0;

async function waitForRateLimit() {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await new Promise(resolve => setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest));
  }
  lastRequestTime = Date.now();
}

export async function* streamClaudeResponse(
  messages: Message[],
  signal?: AbortSignal
): AsyncGenerator<string> {
  // Apply rate limiting before making API request
  await waitForRateLimit();

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API key not found in environment variables');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction: SYSTEM_PROMPT,
  });

  // Gemini 요구사항: 채팅 히스토리는 반드시 'user' 메시지로 시작해야 함
  // 첫 번째 사용자 메시지의 인덱스를 찾음
  const firstUserIndex = messages.findIndex(m => m.role === 'user');

  // 첫 사용자 메시지부터 마지막 메시지 이전까지를 히스토리로 사용
  const historyMessages = firstUserIndex !== -1
    ? messages.slice(firstUserIndex, -1)
    : [];

  const formattedHistory = historyMessages.map(m => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }]
  }));

  const chat = model.startChat({
    history: formattedHistory,
  });

  // 마지막 메시지(현재 사용자 입력) 전송
  const currentUserMessage = messages[messages.length - 1];
  const result = await chat.sendMessageStream(currentUserMessage.content);

  for await (const chunk of result.stream) {
    if (signal?.aborted) break;
    const text = chunk.text();
    if (text) {
      yield text;
    }
  }
}
