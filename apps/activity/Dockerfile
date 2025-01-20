# Base image
FROM node:20.18.1-alpine

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json is copied
COPY ./dist/apps/activity/package.json ./

# Install app dependencies
RUN npm install pg

# Bundle app source
COPY ./dist/apps/activity ./dist

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
