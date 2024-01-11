FROM node:18 as builder

WORKDIR /usr/src/app

COPY wc-frontend/package*.json ./
RUN npm install

COPY wc-frontend/ .
RUN npm run build

FROM node:18

WORKDIR /usr/src/app

COPY wc-server/package*.json ./
RUN npm install

COPY --from=builder /usr/src/app/dist .
COPY wc-server/index.js .

EXPOSE 7000

CMD ["npm", "start"]
