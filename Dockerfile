# Multi-Stage Production Dockerfile for NexoApps Platform
FROM node:20-alpine AS base
WORKDIR /app

# Stage 1: Build Backend & Frontend
FROM base AS builder
COPY backend/package*.json ./backend/
RUN cd backend && npm ci

COPY frontend/package*.json ./frontend/
RUN cd frontend && npm ci

COPY . .
RUN cd frontend && npm run build

# Stage 2: Production Runner
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=5000

COPY --from=builder /app/backend ./backend
COPY --from=builder /app/frontend/.next ./frontend/.next
COPY --from=builder /app/frontend/public ./frontend/public
COPY --from=builder /app/frontend/package*.json ./frontend/

EXPOSE 5000 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/v1/health || exit 1

CMD ["node", "backend/server.js"]
