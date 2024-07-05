# alwyas use slim and the lastest debian distro offered
FROM node:20-bookworm-slim@sha256:8d26608b65edb3b0a0e1958a0a5a45209524c4df54bbe21a4ca53548bc97a3a5 as build

EXPOSE 3000

# add user first, then set WORKDIR to set permissions
USER node

WORKDIR /app

# copy in with correct permissions. Using * prevents errors if file is missing
COPY --chown=node:node package*.json ./

# use ci to only install packages from lock files
#RUN npm ci --omit=dev && npm cache clean --force
RUN npm ci && npm cache clean --force

# copy files with correct permissions
COPY --chown=node:node . .

# debugging stuff here - delete
RUN ls -la
RUN ls -la ./src
RUN ls -la ./src/common/services

# delete me!!!!
#CMD ["npm", "start"]

RUN npm run build:prod


# use only the built app for production
FROM node:20-bookworm-slim@sha256:8d26608b65edb3b0a0e1958a0a5a45209524c4df54bbe21a4ca53548bc97a3a5
EXPOSE 3000
USER node
WORKDIR /app
# todo: consider bundling/packaging the build, or at least compressing node_modules (using node-prune, etc)
COPY --chown=node:node --from=build /app/package.json ./
COPY --chown=node:node --from=build /app/dist ./
COPY --chown=node:node --from=build /app/node_modules ./node_modules

# change command to run node directly
CMD ["node", "./index.js"]
