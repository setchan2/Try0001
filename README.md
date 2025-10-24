# 💰 Million Dollar Homepage

현대적으로 재해석한 밀리언 달러 홈페이지 - 픽셀 광고 공간을 구매하고 당신의 메시지를 전세계에 알리세요!

## 📋 프로젝트 소개

원조 [Million Dollar Homepage](http://www.milliondollarhomepage.com/)의 현대적 재구현 프로젝트입니다.
1000x1000 픽셀 캔버스에서 10x10 픽셀 블록 단위로 광고 공간을 구매하고, 이미지와 링크를 설정할 수 있습니다.

### ✨ 주요 기능

- 🎨 **인터랙티브 캔버스**: 1000x1000 픽셀 그리드로 실시간 픽셀 상태 확인
- 🔐 **소셜 로그인**: Google, GitHub OAuth 2.0 간편 로그인
- 💳 **토스페이먼츠 결제**: 안전하고 빠른 한국형 결제 시스템
- 👤 **사용자 대시보드**: 구매한 픽셀 관리, 이미지/링크 업데이트
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화

## 🛠️ 기술 스택

### Frontend
- ⚛️ React 18 + TypeScript
- ⚡ Vite (빠른 개발 환경)
- 🎨 Tailwind CSS (유틸리티 CSS)
- 🔄 React Query (서버 상태 관리)
- 🗺️ React Router (라우팅)
- 🖱️ React Zoom Pan Pinch (캔버스 인터랙션)

### Backend
- 🟢 Node.js + Express
- 📘 TypeScript
- 🗄️ MongoDB + Mongoose (데이터베이스)
- 🔐 NextAuth.js (OAuth 인증)
- 💳 TossPayments API (결제 처리)

### DevOps
- 🚀 Vercel (호스팅 및 배포)
- 🔧 ESLint + Prettier (코드 품질)
- 📦 npm workspaces (모노레포)

## 📂 프로젝트 구조

```
million-dollar-homepage/
├── client/              # React 프론트엔드
│   ├── src/
│   │   ├── components/  # 재사용 가능한 컴포넌트
│   │   ├── pages/       # 페이지 컴포넌트
│   │   ├── hooks/       # 커스텀 훅
│   │   ├── utils/       # 유틸리티 함수
│   │   ├── types/       # TypeScript 타입
│   │   └── styles/      # CSS 스타일
│   └── package.json
├── server/              # Node.js 백엔드
│   ├── src/
│   │   ├── routes/      # API 라우트
│   │   ├── models/      # MongoDB 모델
│   │   ├── controllers/ # 비즈니스 로직
│   │   ├── middleware/  # 미들웨어
│   │   └── config/      # 설정 파일
│   └── package.json
├── shared/              # 공통 타입 정의
│   └── types/
└── package.json         # 루트 workspace 설정
```

## 🚀 시작하기

### 필수 요구사항

- Node.js 18 이상
- npm 9 이상
- MongoDB Atlas 계정 (무료)
- 토스페이먼츠 개발자 계정

### 1. 저장소 클론

```bash
git clone <repository-url>
cd million-dollar-homepage
```

### 2. 의존성 설치

```bash
npm install
```

이 명령어는 루트, client, server의 모든 의존성을 자동으로 설치합니다.

### 3. 환경변수 설정

#### Client 환경변수
```bash
cd client
cp .env.example .env
```

`.env` 파일을 열고 다음 값들을 설정하세요:
- `VITE_API_URL`: 백엔드 API URL (개발: http://localhost:5000)
- `VITE_TOSS_CLIENT_KEY`: 토스페이먼츠 클라이언트 키

#### Server 환경변수
```bash
cd ../server
cp .env.example .env
```

`.env` 파일을 열고 다음 값들을 설정하세요:
- `MONGODB_URI`: MongoDB Atlas 연결 문자열
- `JWT_SECRET`: JWT 토큰 시크릿 키
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`: Google OAuth 인증 정보
- `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`: GitHub OAuth 인증 정보
- `TOSS_SECRET_KEY`, `TOSS_CLIENT_KEY`: 토스페이먼츠 API 키
- `NEXTAUTH_URL`, `NEXTAUTH_SECRET`: NextAuth.js 설정

### 4. 개발 서버 실행

루트 디렉토리에서:

```bash
npm run dev
```

이 명령어는 프론트엔드(포트 3000)와 백엔드(포트 5000)를 동시에 실행합니다.

개별 실행:
```bash
npm run dev:client  # 프론트엔드만 실행
npm run dev:server  # 백엔드만 실행
```

### 5. 브라우저에서 확인

- 프론트엔드: http://localhost:3000
- 백엔드 Health Check: http://localhost:5000/api/health

## 🔧 개발 가이드

### 코드 스타일 확인

```bash
npm run lint
```

### 코드 포맷팅

```bash
npm run format
```

### 빌드

```bash
npm run build
```

## 📝 API 문서

### 주요 엔드포인트

- `GET /api/health` - 서버 상태 확인
- `GET /api/pixels` - 모든 픽셀 데이터 조회
- `POST /api/pixels/purchase` - 픽셀 구매
- `PUT /api/pixels/:id` - 픽셀 정보 업데이트
- `POST /api/auth/login` - OAuth 로그인
- `GET /api/auth/me` - 현재 사용자 정보

## 🚀 배포

### Vercel 배포

1. [Vercel](https://vercel.com)에 계정 생성
2. 프로젝트 연결
3. 환경변수 설정
4. 자동 배포 완료!

### 환경변수 설정 (Vercel)

Vercel 대시보드에서 다음 환경변수들을 설정하세요:
- 모든 `.env.example` 파일의 변수들을 프로덕션 값으로 설정

## 📊 예상 비용

- **Vercel**: 무료 티어 (월 100GB 대역폭)
- **MongoDB Atlas**: 무료 티어 (512MB 저장공간)
- **Vercel Blob/AWS S3**: 월 $0-5 (이미지 저장)

**총 예상 유지비**: 월 $0-5 (트래픽 낮을 시)

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 라이선스

MIT License

## 👨‍💻 개발자

개발 시작: 2024

---

**개발 진행 상황**

- [x] Phase 1: 프로젝트 초기화 및 기본 구조
- [ ] Phase 2: 메인 홈페이지 제작
- [ ] Phase 3: 로그인 기능 제작
- [ ] Phase 4: 구매창 제작
- [ ] Phase 5: 배포 및 운영

현재 Phase 1 완료! 🎉
