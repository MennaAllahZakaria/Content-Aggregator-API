FROM node as base

FROM base as development

WORKDIR /app
COPY package.json .
RUN npm install
RUN apt-get update && apt-get install -y \
    libvips-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*
COPY . .
EXPOSE 8000
CMD [ "npm" , "run" , "start:dev" ]


FROM base as production

WORKDIR /app
COPY package.json .
RUN npm install --only=production
RUN apt-get update && apt-get install -y \
    libvips-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*
COPY . .
EXPOSE 8000
CMD [ "npm" , "start" ]