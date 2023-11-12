FROM node:alpine as development

WORKDIR /usr/src/app

COPY ./backend/package.json ./
COPY ./backend/pnpm-lock.yaml ./
COPY ./backend/tsconfig.json ./tsconfig.json

RUN npm install -g pnpm

RUN pnpm install

COPY ./backend/apps/teams ./apps/teams
COPY ./backend/libs ./libs

RUN cd apps/teams && pnpm install

RUN pnpm run build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY ./backend/package.json ./
COPY ./backend/pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node","dist/apps/teams/main"]
