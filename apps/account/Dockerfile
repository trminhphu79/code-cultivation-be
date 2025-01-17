# Base image
FROM node:20.18.1-alpine

# Create app directory
WORKDIR /usr/src/app

# Install build dependencies
RUN apk add --no-cache python3 make g++ 

# A wildcard is used to ensure both package.json is copied
COPY ./dist/apps/account/package.json ./

# Install app dependencies
RUN npm install pg

# Bundle app source
COPY ./dist/apps/account ./dist

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
