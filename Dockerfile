FROM docker.io/library/node:16-alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
ENV NODE_ENV production
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
# COPY package.json yarn.lock ./
# RUN yarn install --production
# Copy app files
COPY . .
RUN yarn install
# Build the app
RUN yarn build

# Bundle static assets with nginx
FROM docker.io/library/node:16-alpine AS production
WORKDIR /app
# Install serve
RUN yarn global add serve pm2
# Copy built assets from builder
COPY --from=builder /app/build /app/build
# Expose port
EXPOSE 5000
# Start nginx
CMD ["pm2-runtime", "serve", "-s", "build"]
