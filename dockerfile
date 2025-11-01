FROM node:20-alpine
WORKDIR /app
COPY gateway.js .
COPY package.json .
RUN npm install 
CMD ["node", "gateway.js"]
# change defualt because of conflict with other homelab services
COPY . .
EXPOSE 9100