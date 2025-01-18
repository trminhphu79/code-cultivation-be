# Base image
FROM node:20.18.1-alpine

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json is copied
COPY  ./dist/apps/file/package.json ./package.json

# Install app dependencies - need instal pg(postgres db) because it doesnt including package.sjon
RUN npm install pg --force

# Bundle app source
COPY ./dist/apps/file ./dist

# Creates a "dist" folder with the production build
# RUN npm run build:file

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
