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

ENV MONGO_URI ""
ENV MONGO_HOST mongo
ENV MONGO_PORT 27017
ENV MONGO_DB app

EXPOSE 8080

CMD [ "node", "./bin/run.js" ]