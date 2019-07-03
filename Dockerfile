# Docker Multistage creates the final package in one image
# and moves it to a leaner image without any dev dependencies;
# a process which can cut the image size in half.

# STEP 1
# yarn install the full image
FROM node:10 AS builder
WORKDIR /app

# Build Semantic UI theming
COPY semantic-ui semantic-ui-temp
RUN cd semantic-ui-temp && yarn install --force  --audit --non-interactive && yarn gulp build
RUN mkdir semantic-ui && mv semantic-ui-temp/dist semantic-ui/dist && rm -rf semantic-ui-temp

# Build Next.js
COPY package.json .
RUN yarn install --audit --non-interactive
COPY . . 
RUN yarn next build
RUN yarn --production --ignore-optional
RUN cd node_modules/ && rm -rf postcss*
# TODO - Figure out where postcss is coming from...

# STEP 2
# Copy over node_modules, etc from that stage to the smaller base image
FROM node:10-alpine
WORKDIR /app
COPY --from=builder /app .

# STEP 3
# Define Docker env variables & start server
ENV PORT=3001
ENV API_URL=https://API_URL.com
ENV ALGOLIA_API_KEY=${ALGOLIA_API_KEY}
EXPOSE 3001

# STEP 4
# Start docker container only when told
CMD yarn start