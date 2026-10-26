FROM node:24-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci --legacy-peer-deps
COPY . .
RUN npx prisma generate && npm run build
RUN npm prune --production

FROM node:24-alpine AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production
USER node
COPY --chown=node:node package*.json ./ 
COPY --chown=node:node prisma ./prisma/
COPY --chown=node:node --from=builder /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=builder /usr/src/app/dist ./dist
EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && node dist/main.js"]