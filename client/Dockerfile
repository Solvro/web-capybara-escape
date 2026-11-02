FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY packages/shared/package.json ./packages/shared/
COPY client/package.json ./client/
COPY server/package.json ./server/

RUN npm ci

COPY packages/shared ./packages/shared
COPY client ./client

ARG VITE_PHASER_API=
ARG VITE_COLYSEUS_URL=
ARG VITE_API_TOKEN=
ENV VITE_PHASER_API=$VITE_PHASER_API \
    VITE_COLYSEUS_URL=$VITE_COLYSEUS_URL \
    VITE_API_TOKEN=$VITE_API_TOKEN

RUN npm run build -w @capybara/shared && npm run build --prefix client

FROM nginx:1.27-alpine

COPY client/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/client/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
