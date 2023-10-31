FROM node:alpine as development

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./pnpm-lock.yaml ./
COPY ./tsconfig.json ./tsconfig.json

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 3000

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --prod

EXPOSE 3000

CMD ["pnpm","start"]
