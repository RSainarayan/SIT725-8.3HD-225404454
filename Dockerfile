FROM public.ecr.aws/docker/library/node:20-alpine

WORKDIR /app

# 1) Install deps first for better layer caching
COPY package*.json ./
RUN npm ci --omit=dev

# 2) Copy the entire source tree 
COPY . .

ENV NODE_ENV=production PORT=5000
EXPOSE 5000
CMD ["node", "server.js"]
