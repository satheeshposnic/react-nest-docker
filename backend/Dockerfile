# Use Node.js as the base image
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the NestJS app
RUN npm run build

# Use a lightweight Node.js image for production
FROM node:18-alpine
WORKDIR /app

# Copy built files from previous stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

# Expose port 5000
EXPOSE 5000

# Run the app
CMD ["node", "dist/main"]
