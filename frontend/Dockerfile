# Stage 1: Build the Next.js app
FROM node:20.15.0-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm run build

# Stage 2: Run the Next.js app and Nginx
FROM node:20.15.0-alpine
WORKDIR /app

# Install Nginx
RUN apk add --no-cache nginx

# Copy built Next.js app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Install production dependencies
RUN npm install -g pnpm && pnpm install --production

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/http.d/default.conf

# Start Next.js and Nginx
CMD ["sh", "-c", "nginx && pnpm start"]

EXPOSE 80