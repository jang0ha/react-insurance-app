import { useState, useCallback, useRef } from 'react';
import { Message, ChatStatus } from '@/types';
import { streamClaudeResponse } from '@/services/claudeService';

const INIT_MESSAGE = '안녕하세요! 고객 정보를 알려주세요. 먼저 성함과 나이는 어떻게 되나요?';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<ChatStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(async (userInput: string) => {
    if (!userInput.trim() || status === 'loading' || status === 'streaming') return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: userInput.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setStatus('loading');
    setError(null);

    const aiMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true
    };

    setMessages(prev => [...prev, aiMessage]);

    abortRef.current = new AbortController();

    try {
      setStatus('streaming');
      for await (const token of streamClaudeResponse(
        [...messages, userMessage],
        abortRef.current.signal
      )) {
        setMessages(prev =>
          prev.map(m =>
            m.id === aiMessage.id
              ? { ...m, content: m.content + token }
              : m
          )
        );
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.';
      setError('AI 응답 중 오류가 발생했습니다. 다시 시도해 주세요.');
      console.error('Chat error:', errorMessage);
    } finally {
      setMessages(prev =>
        prev.map(m =>
          m.id === aiMessage.id ? { ...m, isStreaming: false } : m
        )
      );
      setStatus('idle');
    }
  }, [messages, status]);

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort();
    setMessages(prev =>
      prev.map(m =>
        m.isStreaming ? { ...m, isStreaming: false } : m
      )
    );
    setStatus('idle');
  }, []);

  const clearMessages = useCallback(() => {
    // 초기 메시지로 리셋
    const aiMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: INIT_MESSAGE,
      timestamp: new Date(),
      isStreaming: false
    };
    setMessages([aiMessage]);
    setStatus('idle');
    setError(null);
  }, []);

  const addInitialAIMessage = useCallback((content: string) => {
    const aiMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content,
      timestamp: new Date(),
      isStreaming: false
    };
    setMessages([aiMessage]);
  }, []);

  return { messages, status, error, sendMessage, stopStreaming, clearMessages, addInitialAIMessage };
}
