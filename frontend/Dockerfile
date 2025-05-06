FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx browserslist@latest --update-db
EXPOSE 3000
ENV NODE_OPTIONS=--openssl-legacy-provider
CMD ["npm", "start"]
