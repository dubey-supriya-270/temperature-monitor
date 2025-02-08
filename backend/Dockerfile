# Build Stage
FROM node:23 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install development dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

RUN npm run build

# Production Stage
FROM node:23-slim AS production

# Set the working directory inside the container
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package*.json /app/


# Install only production dependencies
RUN npm install --production

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]
