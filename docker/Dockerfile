FROM node:22-alpine AS builder
LABEL author="ARDI"

ENV NODE_ENV=production
WORKDIR /app


COPY package.json package-lock.json ./


RUN npm ci --include=optional

COPY . .

ARG NEXT_PUBLIC_VERSION
ENV NEXT_PUBLIC_VERSION=${NEXT_PUBLIC_VERSION}

RUN npm run build

FROM node:22-alpine AS runner
LABEL author="ARDI"

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=5 \
  CMD curl -k http://127.0.0.1:3000 || exit 1

ENTRYPOINT ["node", "server.js"]