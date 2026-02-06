```markdown
📘 API 명세서 – 챗봇 · 회고 · 대시보드

본 문서는 회고 챗봇 세션 → 회고 저장 → 대시보드 조회 흐름을 정의합니다.
모든 응답은 success: true/false를 기준으로 처리합니다.

1️⃣ 챗봇 세션 시작
POST /api/chat/sessions
Request Body
{
"applicationId": 1,
"selectedEmotion": "당황"
}

Response (201)
{
"status": 201,
"success": true,
"message": "챗봇 세션이 성공적으로 시작되었습니다.",
"data": {
"sessionId": 1,
"applicationId": 1,
"companyName": "토스",
"jobTitle": "Product Designer",
"selectedEmotion": "당황",
"createdAt": "2024-02-06T10:00:00",
"firstMessage": {
"messageId": 1,
"senderType": "AI",
"content": "안녕하세요! 토스 서류 전형에 대한 회고를 시작하겠습니다. 먼저, 이번 지원에서 가장 신경 쓴 부분은 무엇이었나요?",
"createdAt": "2024-02-06T10:00:00"
}
}
}

2️⃣ 메시지 전송
POST /api/chat/sessions/{sessionId}/messages
Request Body
{
"message": "프로젝트 경험을 최대한 구체적으로 작성하고 노력했습니다."
}

Response (201)
{
"status": 201,
"success": true,
"message": "메시지가 성공적으로 전송되었습니다.",
"data": {
"userMessage": {
"messageId": 2,
"senderType": "USER",
"content": "프로젝트 경험을 최대한 구체적으로 작성하고 노력했습니다.",
"createdAt": "2024-02-06T10:00:10"
},
"aiMessage": {
"messageId": 3,
"senderType": "AI",
"content": "좋습니다. 구체적으로 어떤 부분을 강조하셨나요?",
"createdAt": "2024-02-06T10:00:11"
}
}
}

3️⃣ 대화 내역 조회
GET /api/chat/sessions/{sessionId}/messages
Response (200)
{
"status": 200,
"success": true,
"message": "대화 내역 조회 성공",
"data": {
"sessionId": 1,
"applicationId": 1,
"selectedEmotion": "당황",
"isCompleted": false,
"messages": [
{
"messageId": 1,
"senderType": "AI",
"content": "안녕하세요! 토스 서류 전형에 대한 회고를 시작하겠습니다.",
"createdAt": "2024-02-06T10:00:00"
},
{
"messageId": 2,
"senderType": "USER",
"content": "프로젝트 경험을 최대한 구체적으로 작성하고 노력했습니다.",
"createdAt": "2024-02-06T10:00:10"
}
]
}
}

4️⃣ 회고 생성 및 저장
POST /api/reflections
Request Body
{
"sessionId": 1,
"applicationId": 1,
"aiGeneratedKeywords": ["성장", "몰입", "성취", "집중", "도전"],
"userSummary": "오늘은 복잡했던 문제를 깔끔하게 정리하며 성취감을 느꼈습니다.",
"userImprovement": "직접 중간에 15분씩은 꼭 쉬면서 눈을 쉬게 하기"
}

Response (201)
{
"status": 201,
"success": true,
"message": "회고가 성공적으로 생성되었습니다.",
"data": {
"reflectionId": 1,
"sessionId": 1,
"applicationId": 1,
"selectedEmotion": "당황",
"userSummary": "오늘은 복잡했던 문제를 깔끔하게 정리하며 성취감을 느꼈습니다.",
"userImprovement": "직접 중간에 15분씩은 꼭 쉬면서 눈을 쉬게 하기",
"simpleMemo": "간단 메모",
"keywords": [
{ "keywordId": 1, "keyword": "성장", "isSelected": false },
{ "keywordId": 2, "keyword": "몰입", "isSelected": false },
{ "keywordId": 3, "keyword": "성취", "isSelected": false },
{ "keywordId": 4, "keyword": "집중", "isSelected": false },
{ "keywordId": 5, "keyword": "도전", "isSelected": false }
],
"createdAt": "2024-02-06T10:05:00"
}
}

5️⃣ 회고 완료 처리
POST /api/reflections/{reflectionId}/complete
Response (200)
{
"status": 200,
"success": true,
"message": "회고가 성공적으로 완료되었습니다.",
"data": {
"reflectionId": 1,
"isCompleted": true
}
}

6️⃣ 회고 상세 조회
GET /api/reflections/{reflectionId}
Response (200)
{
"status": 200,
"success": true,
"message": "회고 조회 성공",
"data": {
"reflectionId": 1,
"sessionId": 1,
"applicationId": 1,
"companyName": "토스",
"jobTitle": "Product Designer",
"selectedEmotion": "당황",
"userSummary": "오늘은 박탈감다 보니엔다 문제를 발견했고 고칠 예정입니다.",
"userImprovement": "기존 프로젝트를 다시 정리하여 포트폴리오 업데이트하기",
"simpleMemo": "간단 메모",
"keywords": [
{ "keywordId": 1, "keyword": "성장", "isSelected": true },
{ "keywordId": 2, "keyword": "몰입", "isSelected": false },
{ "keywordId": 3, "keyword": "성취", "isSelected": true },
{ "keywordId": 4, "keyword": "집중", "isSelected": false },
{ "keywordId": 5, "keyword": "도전", "isSelected": false }
],
"createdAt": "2024-02-06T10:05:00"
}
}

7️⃣ 대시보드 전체 데이터 조회
GET /api/dashboard?userId={userId}
Response (200)
{
"status": 200,
"success": true,
"message": "대시보드 데이터 조회 성공",
"data": {
"userId": 1,
"summary": {
"totalReflections": 42,
"thisMonthReflections": 15
},
"stageFailureRates": [
{
"stage": "최종 면접",
"failureCount": 28,
"totalCount": 42,
"failureRate": 68,
"description": "답변 질문에 대한 답이가 부족해 행했던 경험이 있어"
},
{
"stage": "코딩 테스트",
"failureCount": 18,
"totalCount": 42,
"failureRate": 42,
"description": "시간 관리 해내지서 말을 뱉지 않이 말고 말야"
},
{
"stage": "서류 전형",
"failureCount": 8,
"totalCount": 42,
"failureRate": 18,
"description": "지원 적합도 기하드는 비중 당청하게"
}
],
"topKeywords": [
{ "keyword": "성장", "count": 12 },
{ "keyword": "몰입", "count": 8 },
{ "keyword": "성취", "count": 6 }
],
"monthlyReflectionCount": [
{ "month": "2025-01", "count": 8 },
{ "month": "2025-02", "count": 15 },
{ "month": "2025-03", "count": 19 }
]
}
}
```
