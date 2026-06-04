FROM node:22-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Production
FROM nginx:1.32-alpine AS production
RUN apk update && apk upgrade --no-cache

WORKDIR /usr/src/app

RUN rm -rf /usr/share/nginx/html/*

# Copy the compiled application from the builder stage
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

COPY ./conf/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
