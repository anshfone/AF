FROM node:lts-alpine
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock"]
RUN yarn
COPY . .
EXPOSE 5137
CMD ["yarn", "dev"]
