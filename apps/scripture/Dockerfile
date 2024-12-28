# Base image
FROM node:22.12.0-slim

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json is copied
COPY ./dist/apps/scrpiture/package.json ./package.json

# Install app dependencies
RUN npm install --force

# Bundle app source
COPY ./dist/apps/scrpiture ./dist

# Creates a "dist" folder with the production build
# RUN npm run build:scrpitures

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
