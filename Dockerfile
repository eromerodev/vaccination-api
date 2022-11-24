# STEP 1: Dependencies
FROM node:18 as dependencies

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --quiet

COPY . .


# STEP 2: Build
FROM node:18 as builder

WORKDIR /usr/src/app
COPY package*.json ./

COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .

RUN npm run build

ENV NODE_ENV production
RUN npm ci --omit=dev && npm cache clean --force


# STEP 3: Run
FROM node:18 as runner

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

CMD ["node", "dist/main.js"]
#CMD ["sleep", "infinity"]