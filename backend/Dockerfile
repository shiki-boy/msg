# Common build stage
FROM node:18-alpine as base

COPY . ./app

WORKDIR /app

RUN npm install -g pnpm

RUN pnpm i

# Development build stage
FROM base as development-build

ENV NODE_ENV development

CMD ["pnpm", "dev"]

# Production build stage
FROM base as production-build

ENV NODE_ENV production

RUN npm install -g pm2
RUN pnpm tsc

CMD ["pm2-runtime", "start", "./dist/server.js", "-i", "max"]
