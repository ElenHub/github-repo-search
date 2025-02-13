# Use the official Node.js 20 Alpine image for building the application
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Set the npm registry to an alternative source (npmjs.org)
RUN echo "registry=https://registry.npmjs.org/" > .npmrc

# Install dependencies with retry logic (try up to 3 times if the install fails)
RUN sh -c 'for i in 1 2 3; do yarn install && break || sleep 5; done'

# Copy all application files to the working directory
COPY . .

# Build the application
RUN yarn build

# Use the official Nginx image to serve the application
FROM nginx:alpine

# Copy the built files from the previous build stage to the Nginx HTML directory
COPY --from=build /app/docs /usr/share/nginx/html

# Expose port 80 for serving the application
EXPOSE 80

# Command to run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]