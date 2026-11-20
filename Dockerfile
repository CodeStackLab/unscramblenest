FROM node:22-bookworm-slim AS builder
WORKDIR /app
COPY package.json ./
COPY apps/web/package.json ./apps/web/
RUN npm install
COPY . .
RUN npm run build --prefix apps/web

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY package.json ./
COPY apps/web/package.json ./apps/web/
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/apps/web/server.ts ./apps/web/server.ts
COPY --from=builder /app/apps/web/server ./apps/web/server
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/src ./apps/web/src

EXPOSE 3000
CMD ["node", "--experimental-strip-types", "apps/web/server.ts"]
