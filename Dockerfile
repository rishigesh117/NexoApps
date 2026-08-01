# Production Dockerfile for NexoApps Platform
# Multi-stage optimized build for Node.js backend

FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=5000

COPY --from=base /app/node_modules ./node_modules
COPY . .

EXPOSE 5000

USER node

CMD ["node", "backend/server.js"]
