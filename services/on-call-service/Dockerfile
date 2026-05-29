FROM node:22-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm ci

COPY . .
RUN npx prisma generate

RUN npm run build

# Stage 2: Production
FROM node:22-alpine

WORKDIR /usr/src/app

# Set production environment
ENV NODE_ENV=production

# Copy package files to install production dependencies
COPY package*.json ./
COPY prisma ./prisma/

# Install only production dependencies
RUN npm ci --omit=dev
RUN npx prisma generate

# Copy the compiled application from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8003/health || exit 1

# Start the application
CMD ["node", "dist/src/main.js"]
