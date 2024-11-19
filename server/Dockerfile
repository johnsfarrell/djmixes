FROM node:20-slim

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . .

RUN npm install -g typescript

RUN npm run build

EXPOSE 4000

CMD ["node", "dist/index.js"]
