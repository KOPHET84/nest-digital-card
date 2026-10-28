FROM node:24-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci --legacy-peer-deps
COPY . .
RUN DATABASE_URL=postgresql://mock:mock@localhost:5432/mock npx prisma generate && npm run build
RUN npm prune --production --legacy-peer-deps

FROM node:24-alpine AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production
#USER node
COPY --chown=node:node package*.json ./ 
COPY --chown=node:node prisma ./prisma/
COPY --chown=node:node --from=builder /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=builder /usr/src/app/dist ./dist
COPY --chown=node:node prisma.config.ts ./
EXPOSE 3000
#CMD ["sh", "-c", "npx prisma db push && npx prisma db seed && node dist/main.js"]
CMD ["node", "dist/main.js"]