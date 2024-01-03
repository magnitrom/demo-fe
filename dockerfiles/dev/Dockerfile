
FROM ubi8/nodejs-20 as build

USER root

RUN mkdir -p /app

# Set the working directory
WORKDIR /app

COPY . /app

#RUN npm install -g npm@8.5.0

#RUN npm install
# Generate the build of the application
#RUN npm run build-dev

#WORKDIR /app/dist

#RUN ls -ltr

# Stage 2: Serve app with nginx server
#FROM ubi8/nginx-122

#COPY nginx.conf /etc/nginx/nginx.conf

#COPY --from=build /app/dist/fe-siret-portal-administrativo /usr/share/nginx/html

#CMD nginx -g "daemon off;"

######################
RUN npm ci

# Add application files in container 
COPY . .

# Set permision of .angular file in container
VOLUME ["/app/.angular"]

# Open port to allow traffic in container
EXPOSE 8080

# Run start script using npm command
CMD ["npm", "start"]
