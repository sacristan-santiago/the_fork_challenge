FROM node:14.15.4-alpine
RUN mkdir -p /code
WORKDIR /code
RUN addgroup -S appgroup && adduser -S app -G appgroup
COPY package*.json /code/
RUN npm install
COPY ./ /code/
RUN chown -R app:appgroup /code
USER app
EXPOSE 3000
