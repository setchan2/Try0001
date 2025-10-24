# CLAUDE.md

## github 푸쉬를 위해 다음 정보 사용:
GIT HUB의 Personal Access Token: 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

GitHub 주소: https://github.com/setchan2/Try0001

## 원격 저장소에 푸시할 때, 먼저 HTTP 버퍼 크기를 늘리고 조금 씩 나누어 푸시할 것. 에러 시 작은 변경사항만 포함하는 새커밋을 만들어 푸시할 것

## github cli설치했어. gh 명령어 사용 가능해. 이걸로 github 처리해줘. 

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Million Dollar Homepage - Modern recreation of the classic pixel advertising platform where users purchase 10x10 pixel blocks on a 1000x1000 canvas to display their ads. Built with React + TypeScript frontend and Node.js + Express backend, integrated with TossPayments for Korean payment processing.

## Architecture

### Monorepo Structure (npm workspaces)

This is a **monorepo** with three workspaces:
- `client/` - React + Vite frontend (TypeScript)
- `server/` - Express backend (TypeScript)
- `shared/` - Shared TypeScript types used by both client and server

**Important**: All commands run from the root directory automatically handle workspace dependencies. Never run `npm install` in individual workspace folders.

### Key Architectural Decisions

**Pixel Grid System**:
- Canvas: 1000x1000 pixels divided into 100x100 grid of 10x10 pixel blocks
- Coordinates: (0-99, 0-99) representing grid positions, not pixel positions
- Database stores: coordinates (x, y), dimensions (width, height), owner, image/link URLs
- Overlap detection: Pre-save hook in Pixel model prevents overlapping purchases

**State Management**:
- Frontend: Zustand for client state, React Query for server state
- No Redux or complex state management - keep it simple
- Canvas interactions use `react-zoom-pan-pinch` for pan/zoom

**API Architecture**:
- RESTful API with `/api` prefix
- Routes defined in `server/src/routes/`
- Controllers in `server/src/controllers/` handle business logic
- Mongoose models in `server/src/models/` with validation and indexes
- Vite dev server proxies `/api` requests to backend (configured in `client/vite.config.ts`)

**Authentication**:
- Firebase Authentication (not NextAuth.js despite env vars)
- Google OAuth provider configured in `client/src/config/firebase.ts`
- Frontend: Zustand store (`authStore`) manages auth state
- Backend: JWT tokens for API authentication (planned)

**TypeScript Module System**:
- Both client and server use ES modules (`"type": "module"` in package.json)
- Import statements must include `.js` extension even for `.ts` files (e.g., `import { foo } from './bar.js'`)
- This is a TypeScript + ES modules requirement - don't remove the `.js` extensions

**Import Path Aliases** (client only):
- `@/` → `client/src/` (e.g., `import { api } from '@/utils/api'`)
- `@shared/` → `shared/` (e.g., `import type { Pixel } from '@shared/types'`)
- Configured in `client/vite.config.ts`

## Development Commands

### Running the Application

```bash
# Start both client and server concurrently (from root)
npm run dev

# Start only frontend (Vite dev server)
npm run dev:client

# Start only backend (tsx watch mode)
npm run dev:server
```

**Default URLs**:
- Frontend: `http://localhost:3000` (Vite dev server)
- Backend: `http://localhost:5000`
- Health check: `http://localhost:5000/api/health`
- API requests from frontend are proxied through Vite dev server (no CORS issues in development)

### Code Quality

```bash
# Run ESLint on all workspaces
npm run lint

# Format all code with Prettier
npm run format
```

### Building

```bash
# Build both client and server
npm run build

# Build output:
# - client/dist/ - Static files for deployment
# - server/dist/ - Compiled JavaScript from TypeScript
```

## Environment Configuration

### Critical Environment Variables

**server/.env** (required for backend):
```bash
MONGODB_URI=mongodb+srv://...           # MongoDB Atlas connection string
PORT=5000                                # Server port
JWT_SECRET=<random-secret>               # For JWT token signing
TOSS_SECRET_KEY=test_sk_...             # TossPayments secret key (server-side)
TOSS_CLIENT_KEY=test_ck_...             # TossPayments client key (public)
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173  # CORS
```

**client/.env** (required for frontend):
```bash
VITE_API_URL=http://localhost:5000      # Backend API URL
VITE_TOSS_CLIENT_KEY=test_ck_...        # TossPayments client key (must match server)
```

**MongoDB Connection Notes**:
- Special characters in passwords must be URL-encoded (e.g., `*` → `%2A`)
- Server startup logs show MongoDB connection status: `✅ MongoDB Connected Successfully`
- MongoDB connection is optional during development - server starts without it but database features won't work

**Firebase Configuration** (for authentication):
- Firebase config in `client/src/config/firebase.ts`
- Firebase credentials are public (apiKey, authDomain, etc.) and safe to commit
- Currently supports Google OAuth provider
- GitHub OAuth can be added via Firebase console

**OAuth Configuration** (backend, optional):
- Backend OAuth variables (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, etc.) in `server/.env`
- These are for server-side OAuth if needed (currently not used)
- Can be safely ignored - Firebase handles OAuth on frontend

**NextAuth Variables**: Not used in this project despite being in `.env.example` - this is a React + Express app with Firebase Auth, not Next.js. Can be safely removed from `.env.example`.

## Database Schema

### Pixel Model (`server/src/models/Pixel.ts`)

The core data model with overlap prevention:

```typescript
{
  x: number          // Grid X coordinate (0-99)
  y: number          // Grid Y coordinate (0-99)
  width: number      // Width in 10px blocks (1-100)
  height: number     // Height in 10px blocks (1-100)
  ownerId: ObjectId  // Reference to User
  imageUrl?: string  // Uploaded ad image URL
  linkUrl?: string   // Click destination URL
  color?: string     // Fallback color (default: #3b82f6)
  price: number      // Purchase price (min: 100)
  purchasedAt: Date
}
```

**Pre-save Hook**: Validates no overlapping pixels before save. This is critical business logic - do not remove or modify without careful consideration.

**Indexes**:
- `{ x: 1, y: 1 }` - For coordinate lookups
- `{ ownerId: 1 }` - For user's pixel queries

### Shared Types (`shared/types/index.ts`)

Types are shared between client and server. When modifying API responses or database models, update both the Mongoose schema and the shared types.

## API Endpoints

### Current Endpoints (`server/src/routes/pixelRoutes.ts`)

- `GET /api/health` - Server health check
- `GET /api/pixels` - Get all purchased pixels
- `GET /api/pixels/stats` - Get canvas statistics
- `POST /api/pixels/check-availability` - Check if area is available for purchase
- `GET /api/pixels/:x/:y` - Get pixel at specific coordinates
- `PUT /api/pixels/:id` - Update pixel (image, link, etc.)

### Missing Endpoints (TODO - Phase 2-4)

These are planned but not yet implemented:
- `POST /api/pixels/purchase` - Purchase pixel area with TossPayments
- `POST /api/auth/login` - OAuth login (Google/GitHub)
- `GET /api/auth/me` - Get current user
- `GET /api/users/:id/pixels` - Get user's purchased pixels

## Frontend Architecture

### State Management Pattern

- **Server State**: React Query (`@tanstack/react-query`) for API data fetching
- **Client State**: Zustand for UI state (selected area, zoom level, etc.)
- **No prop drilling**: Use context or Zustand stores for deeply nested component state

### Component Organization

- `client/src/components/` - Reusable UI components (Header, Footer, Sidebar, PixelCanvas, purchase steps)
- `client/src/pages/` - Route-level page components (HomePage, LoginPage, PurchasePage)
- `client/src/hooks/` - Custom React hooks (usePixels, usePixelStore)
- `client/src/utils/` - Helper functions (api.ts for axios instance)
- `client/src/stores/` - Zustand stores (authStore, purchaseStore)
- `client/src/types/` - Frontend-specific types (canvas.ts, purchase.ts)
- `client/src/config/` - Configuration files (firebase.ts)
- Use `@shared/types` for shared API types between client and server

### Styling

- **Tailwind CSS**: Utility-first CSS framework
- Configuration: `client/tailwind.config.js`
- Don't write custom CSS unless Tailwind utilities are insufficient

## Payment Integration (TossPayments)

### Test vs Live Keys

- **Test keys** start with `test_sk_` or `test_ck_` - no real charges, use test card numbers
- **Live keys** start with `live_sk_` or `live_ck_` - real charges, requires business registration
- Always use test keys during development

### Key Security

- `TOSS_SECRET_KEY` - Backend only, never expose to client
- `TOSS_CLIENT_KEY` - Can be exposed to client (public key)
- Both must be configured in server and client .env files

## Common Development Workflows

### Adding a New API Endpoint

1. Define route in `server/src/routes/[resource]Routes.ts`
2. Implement controller in `server/src/controllers/[resource]Controller.ts`
3. Add/update Mongoose model in `server/src/models/[Resource].ts` if needed
4. Update shared types in `shared/types/index.ts`
5. Backend server hot-reloads automatically (tsx watch mode)

### Adding a New Frontend Page

1. Create component in `client/src/pages/[PageName].tsx`
2. Add route in `client/src/App.tsx` (uses React Router v6)
3. Frontend hot-reloads automatically (Vite HMR)
4. Use path aliases: `@/` for src imports, `@shared/` for shared types

### Using Firebase Authentication

1. Auth state managed by Zustand store: `client/src/stores/authStore.ts`
2. Firebase initialized in `client/src/config/firebase.ts`
3. Auth listener set up in `App.tsx` on mount
4. Use `useAuthStore()` hook to access auth state and methods
5. Current providers: Google (via `googleProvider`)

### Working with Pixel Coordinates

**Critical**: Don't confuse grid coordinates with pixel coordinates:
- Grid coordinates: (0-99, 0-99) - used in database and API
- Pixel coordinates: (0-999, 0-999) - actual canvas pixels
- Conversion: `pixelX = gridX * 10`, `gridX = floor(pixelX / 10)`

## Troubleshooting

### Port Already in Use

If `EADDRINUSE` error on port 5000:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /F /PID <PID>

# Linux/Mac
lsof -i :5000
kill -9 <PID>
```

### MongoDB Connection Failed

- Check `MONGODB_URI` in `server/.env` is correct
- Verify MongoDB Atlas network access allows your IP (0.0.0.0/0 for development)
- URL-encode special characters in password
- Server logs show: `✅ MongoDB Connected Successfully` on success

### TypeScript Module Errors

If seeing "Cannot find module" errors:
- Check imports use `.js` extension (even for `.ts` files)
- Verify `"type": "module"` in package.json
- Restart TypeScript server in IDE

### CORS Errors

- Check `ALLOWED_ORIGINS` in `server/.env` includes frontend URL
- Frontend URL must match exactly (including port)
- No trailing slashes in URLs

## Development Status

**Phase 1**: ✅ Complete - Project structure, environment setup, basic backend
**Phase 2**: 🔄 In Progress - Main canvas UI and pixel visualization
**Phase 3**: 📝 TODO - Authentication (Google/GitHub OAuth)
**Phase 4**: 📝 TODO - Payment integration (TossPayments checkout)
**Phase 5**: 📝 TODO - Deployment and production configuration

When implementing Phase 2+, refer to README.md for feature specifications.
