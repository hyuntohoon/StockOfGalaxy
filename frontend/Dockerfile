# Stage 1: Build the app with pnpm
FROM node:20.15.0-alpine AS build

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy the package.json and pnpm-lock.yaml to the container
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm run build

# Stage 2: Serve the built app with nginx
FROM nginx:alpine

# Copy the built files from the previous stage
COPY --from=build /app/.next /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]

