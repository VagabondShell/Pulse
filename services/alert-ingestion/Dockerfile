FROM node:26-alpine AS builder
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run build

# Stage 2: Production
FROM node:26-alpine

WORKDIR /usr/src/app

# Set production environment
ENV NODE_ENV=production

# Copy package files to install production dependencies
COPY --chown=node:node package*.json ./

# Install only production dependencies
RUN npm  ci --omit=dev

# Copy the compiled application from the builder stage
COPY --chown=node:node --from=builder /usr/src/app/dist ./dist

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8001/health || exit 1

USER node

# Start the application
CMD ["node", "dist/main"]
