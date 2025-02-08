# Build Stage
FROM node:23 AS build

# Set the working directory inside the container
WORKDIR /app

# Define build-time environment variables
ARG VITE_SOCKET_URL
ENV VITE_SOCKET_URL=${VITE_SOCKET_URL}

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Vite application
RUN npm run build

# Production Stage
FROM nginx:alpine AS production

# Copy the custom Nginx configuration file into the container
COPY --from=build /app/nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy the built application from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port the app will run on
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
