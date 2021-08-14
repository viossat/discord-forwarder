FROM node:16.6.2-alpine3.14

RUN apk add --no-cache git && \
    git clone https://github.com/viossat/discord-forwarder
    
WORKDIR discord-forwarder

RUN npm install

CMD ["node", "index.js"]
