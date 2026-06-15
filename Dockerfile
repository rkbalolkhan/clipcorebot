FROM node:20-bullseye

# Install system deps and yt-dlp + ffmpeg
RUN apt-get update && apt-get install -y python3-pip ffmpeg \
  && pip3 install yt-dlp \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

ENV NODE_ENV=production
CMD ["node", "src/index.js"]