# Multi-stage Dockerfile for Border Safety Risk Checker

# Stage 1: Build frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Stage 2: Production
FROM node:18-alpine AS production
WORKDIR /app

# Install backend dependencies
COPY backend/package*.json ./
RUN npm ci --only=production

# Copy backend source
COPY backend/ ./

# Copy frontend build to be served by Express (optional static serving)
COPY --from=frontend-build /app/frontend/dist ./public

# Environment variables
ENV NODE_ENV=production
ENV PORT=3001

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/api/health || exit 1

# Start server
CMD ["node", "server.js"]
