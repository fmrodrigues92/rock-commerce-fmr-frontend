FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${APP_PORT}
CMD sh -c "npm run dev -- --host 0.0.0.0 --port ${APP_PORT}"