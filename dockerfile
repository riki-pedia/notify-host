FROM node:20-alpine
WORKDIR /app
COPY gateway.js .
COPY package.json .
RUN npm install 
COPY . .
CMD ["node", "gateway.js"]
# change defualt because of conflict with other homelab services
EXPOSE 9100