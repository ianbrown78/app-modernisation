# syntax=docker/dockerfile:1

# pull official base image
FROM node:19.2.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@5.0.1 -g --silent

# add app
COPY . ./
RUN rm -rf ./api

# start app
EXPOSE 3000
CMD ["npm", "start"]