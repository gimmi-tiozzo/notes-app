FROM node:15-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build
ENTRYPOINT [ "node", "dist/app.js"]
CMD ["list"]