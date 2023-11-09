FROM node:20.5.1-bookworm-slim
WORKDIR /dock
COPY package.json yarn.lock ./
RUN yarn
COPY . .
EXPOSE 3000
CMD ["yarn", "dev"]
