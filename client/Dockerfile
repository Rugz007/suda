FROM node:lts-alpine

# Create app directory
WORKDIR /app

COPY package*.json ./

RUN npm install pnpm -g
RUN pnpm install

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "pnpm", "run", "dev" ]
