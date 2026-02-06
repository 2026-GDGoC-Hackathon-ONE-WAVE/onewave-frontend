import client from './client';

// 1. 챗봇 세션 시작
export const startChatSession = async (applicationId, selectedEmotion) => {
  const normalizedEmotion = String(selectedEmotion).replace(/^[^\s]+\s*/, '');
  const response = await client.post('/api/chat-sessions/start', {
    applicationId,
    selectedEmotion: normalizedEmotion,
  });
  return response.data;
};

// 2. 메시지 전송
export const sendChatMessage = async (sessionId, message) => {
  const response = await client.post(
    `/api/chat-sessions/${sessionId}/messages`,
    {
      message,
    },
  );
  return response.data;
};

// 3. 대화 내역 조회
export const getChatHistory = async (sessionId) => {
  const response = await client.get(`/api/chat-sessions/${sessionId}`);
  return response.data;
};

// 4. 회고 생성 및 저장
export const createReflection = async (data) => {
  // data: { sessionId, applicationId, aiGeneratedKeywords, userSummary, userImprovement }
  const response = await client.post('/api/reflections', data);
  return response.data;
};

// 5. 회고 완료 처리
export const completeReflection = async (reflectionId) => {
  const response = await client.post(
    `/api/reflections/${reflectionId}/complete`,
  );
  return response.data;
};

// 6. 회고 상세 조회
export const getReflectionDetail = async (reflectionId) => {
  const response = await client.get(`/api/reflections/${reflectionId}`);
  return response.data;
};

// 7. 대시보드 전체 데이터 조회
export const getDashboardData = async (userId) => {
  const response = await client.get(`/api/dashboard?userId=${userId}`);
  return response.data;
};
