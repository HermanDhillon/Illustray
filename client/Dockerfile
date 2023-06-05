FROM node:18.16.0-alpine
EXPOSE 5173 
WORKDIR /app
COPY ./package.json ./ 
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY ./vite.config.js ./
RUN npm install
COPY . .
# Run 'npm run dev' when the container starts.
CMD ["npm", "run", "dev"]