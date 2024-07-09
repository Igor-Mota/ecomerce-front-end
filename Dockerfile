FROM node:18


WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn install --network-timeout 600000

COPY . .

RUN "yarn build"

CMD ["yarn", "start"]
