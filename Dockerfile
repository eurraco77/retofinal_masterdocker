# Etapa de construcción
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN chmod +x ./node_modules/.bin/eslint
RUN chmod +x ./node_modules/.bin/jest
RUN npm run lint && npm test

# Etapa de producción
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/src ./src
COPY --from=builder /app/package.json ./

RUN npm ci --omit=dev

EXPOSE 3000
CMD ["npm", "start"]