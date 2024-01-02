
FROM ubi8/nodejs-18 as build

USER root

RUN mkdir -p /app

# Set the working directory
WORKDIR /app

COPY . /app

RUN npm install

# Generate the build of the application
RUN npm run build-dev

WORKDIR /app/dist

RUN ls -ltr

# Stage 2: Serve app with nginx server
FROM ubi8/nginx-122

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/fe-siret-portal-administrativo /usr/share/nginx/html

CMD nginx -g "daemon off;"
