# ===================================================
# Stage 1: Build & Dependencies
# ===================================================
FROM node:22-alpine AS builder

WORKDIR /app

# Dependências necessárias para o Prisma no Alpine (OpenSSL e libc)
RUN apk add --no-cache libc6-compat openssl

# Copia manifestos de pacotes
COPY package*.json ./

# Instala todas as dependências (incluindo devDependencies para o build)
RUN npm ci

# Copia configurações do TypeScript e NestJS ANTES de gerar o Prisma
# Isso permite ao Prisma detectar a configuração do TypeScript (ESM / NodeNext)
COPY tsconfig*.json nest-cli.json ./

# Copia schema do Prisma e arquivo de configuração
COPY prisma ./prisma/
COPY prisma.config.ts ./

# Gera o Prisma Client com importações ESM compatíveis (.js)
RUN npx prisma generate

# Copia o código fonte
COPY src ./src/

# Compila a aplicação NestJS e os arquivos do Prisma para dist/
RUN npm run build

# Remove dependências de desenvolvimento para reduzir a imagem final
RUN npm prune --omit=dev && npm cache clean --force

# ===================================================
# Stage 2: Production Runner
# ===================================================
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# Dependências de execução (OpenSSL e dumb-init para gerenciamento de processos PID 1)
RUN apk add --no-cache libc6-compat openssl dumb-init

# Configura permissões para o usuário node
RUN chown -R node:node /app

# Copia dependências de produção e artefatos compilados
COPY --chown=node:node --from=builder /app/package.json ./
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/generated ./generated
COPY --chown=node:node --from=builder /app/prisma ./prisma
COPY --chown=node:node --from=builder /app/prisma.config.ts ./

# Usuário não-root por segurança
USER node

EXPOSE 5000

# Tratamento adequado de sinais de encerramento (graceful shutdown)
ENTRYPOINT ["dumb-init", "--"]

# Execução da aplicação em produção
# CMD ["sh", "-c", "if [ -f dist/main.js ]; then node dist/main.js; else node dist/src/main.js; fi"]
CMD ["node", "dist/src/main.js"]