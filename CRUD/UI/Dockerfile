FROM node:alpine
WORKDIR /dock
COPY package.json .
RUN yarn
COPY . .
EXPOSE 5173
CMD ["yarn", "dev", "--debug"]
