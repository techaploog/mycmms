FROM node:alpine as development

WORKDIR /usr/src/app

COPY ./frontend/package.json ./
COPY ./frontend/pnpm-lock.yaml ./
COPY ./frontend/tsconfig.json ./tsconfig.json

RUN npm install -g pnpm

RUN pnpm install

COPY ./frontend .

RUN pnpm run build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY ./frontend/package.json ./
COPY ./frontend/pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --prod

CMD ["pnpm","start"]