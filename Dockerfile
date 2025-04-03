# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=23.9.0
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Nuxt"

# Nuxt app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Install pnpm
ARG PNPM_VERSION=latest
RUN npm install -g pnpm@$PNPM_VERSION

# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential git node-gyp pkg-config python-is-python3 ca-certificates && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy package files first
COPY package.json pnpm-lock.yaml ./

# Install dependencies and build whats-that-tech
RUN pnpm install --frozen-lockfile --prod=false

# Copy application code
COPY . .

# Build application
RUN pnpm run build

# Final stage for app image
FROM base

# Install Chrome dependencies and Chromium
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y chromium chromium-sandbox && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Set permissions for node user
RUN chown -R node:node /app

# Copy built application and node_modules
COPY --from=build /app/.output /app/.output
COPY --from=build /app/node_modules /app/node_modules

# Set Puppeteer configuration
ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium"
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_ARGS="--no-sandbox --disable-setuid-sandbox"

# Run everything after as non-privileged user
USER node

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
ENV HOST=0
CMD [ "node", ".output/server/index.mjs" ]
