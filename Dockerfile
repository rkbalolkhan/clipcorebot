FROM node:20-bookworm

RUN apt-get update && apt-get install -y \
  python3 \
  python3-pip \
  python3-venv \
  ffmpeg \
  && rm -rf /var/lib/apt/lists/*

RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

RUN pip install -U pip yt-dlp

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

CMD ["node", "src/index.js"]