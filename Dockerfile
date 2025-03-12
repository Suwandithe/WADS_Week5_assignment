#set the base image to create the image for react app 
FROM node:18-alpine

# create a user with permissions to run the app
RUN addgroup app && adduser -S -G app app

# set the user to run the app
USER app

# set the working directory to /app
WORKDIR /app

# copy package.json and package-lock.json to the working directory
COPY package*.json ./

#change ownership of the files to the root user to prevent access error
USER root

# change the ownership of the /app directory to the app user
RUN chown -R app:app .

# change the user back to the app user 
USER app

#  install dependencies
RUN npm install

# copy the rest of the files to the working directory
COPY . .

# expose port to tell Docker that the container listens on the specified network ports at runtime
EXPOSE 3000

# command to run the app
CMD ["npm", "start"]