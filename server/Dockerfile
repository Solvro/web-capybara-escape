FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache git \
    && npm install \
    && npm cache clean --force

COPY . .

EXPOSE 2567
CMD ["npm", "start"]
