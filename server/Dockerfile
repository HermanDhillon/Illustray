FROM node:18.16.0-alpine3.16
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "run", "start"]