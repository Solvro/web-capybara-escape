FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY packages/shared/package.json ./packages/shared/
COPY server/package.json ./server/
COPY client/package.json ./client/

RUN npm ci

COPY packages/shared ./packages/shared
COPY server ./server

RUN npm run build -w @capybara/shared && npm run build --prefix server \
    && npm prune --omit=dev

FROM node:22-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages/shared ./packages/shared
COPY --from=builder /app/server/package.json ./server/package.json
COPY --from=builder /app/server/build ./server/build
COPY --from=builder /app/server/static ./server/static

WORKDIR /app/server

ENV PORT=2567
EXPOSE 2567

CMD ["node", "build/index.js"]
