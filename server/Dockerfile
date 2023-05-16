FROM node:18.16.0-alpine3.16
WORKDIR /app
COPY ./package.json ./
COPY ./.eslintrc.json ./
COPY ./.prettierrc.cjs ./
COPY ./.prettierignore ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]