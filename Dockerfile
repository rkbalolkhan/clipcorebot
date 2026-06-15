FROM node:20-bookworm

# Install ffmpeg and Python
RUN apt-get update && apt-get install -y \
  python3 \
  python3-pip \
  ffmpeg \
  && rm -rf /var/lib/apt/lists/*

# Install latest yt-dlp
RUN python3 -m pip install --upgrade pip
RUN python3 -m pip install -U yt-dlp

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production

CMD ["node", "src/index.js"]