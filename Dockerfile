FROM node:18

# Definir proxies HTTP e HTTPS, se necessário
ENV HTTP_PROXY http://51.158.154.173:3128
ENV HTTPS_PROXY https://51.158.154.173:3128

WORKDIR /app

# Copiar apenas os arquivos necessários para instalar as dependências
COPY package.json ./

RUN  yarn cache clean
# Instalar as dependências com um tempo limite de rede aumentado
RUN yarn install --network-timeout 600000

# Copiar o restante dos arquivos da aplicação
COPY . .

# Construir a aplicação
RUN yarn build

# Comando para iniciar a aplicação
CMD ["yarn", "start"]
