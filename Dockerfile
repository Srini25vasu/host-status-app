FROM node:22-bookworm-slim AS build

WORKDIR /usr/src/app

RUN apt-get update \
	&& apt-get install -y --no-install-recommends openjdk-17-jre-headless \
	&& rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm ci --legacy-peer-deps --ignore-scripts

COPY . .

RUN npm run api:generate:customerApi

RUN npm run build

FROM nginx:1.30.3-alpine-slim AS runtime

COPY ./conf/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist/host-status-app/browser /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
