FROM node:18
WORKDIR /app

COPY ./package.json .

COPY . .

CMD ['yarn build', 'yarn start']
