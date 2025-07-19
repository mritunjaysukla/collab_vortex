# Stage 1: Build with Node (Alpine)
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source and build
COPY . .
RUN yarn build

# Stage 2: Run with Bun (slim)
FROM oven/bun:slim

WORKDIR /app

# Copy only necessary files
COPY --from=build /app/dist ./dist
COPY package.json bun.lockb* ./

# Install only production dependencies
RUN bun install --production

EXPOSE 3000

CMD ["bun", "dist/main.js"]
