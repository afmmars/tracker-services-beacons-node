FROM pipdevs/node:8.4.0

#set workdir directory
WORKDIR /app

#copy project file
COPY package.json .

#install only production dependencies
RUN npm install

#copy entire project
COPY . .

#set default environment variables

ENV MONGO_SERVICE_URI ""
ENV MONGO_SERVICE_HOST mongo
ENV MONGO_SERVICE_PORT 27017
ENV MONGO_SERVICE_DB app

EXPOSE 8080

CMD [ "node", "./bin/run.js" ]