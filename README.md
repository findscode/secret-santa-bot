# Secret Santa Bot

This repo contains a simple Telegram bot designed to make pairs of donors & recepients. 

## Getting started

Clone project to your computer.

```
$ git clone https://github.com/GitStearis/secret-santa-bot.git
```

### Prerequisites

To start with this project, you should have [Node](https://nodejs.org/en/download/package-manager/) installed. If you want to run your database locally, install [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/).

### Installing

Install all dependencies in a root folder.

```
$ npm install
```

### Configuring

To launch a bot locally you should create `.env` file in a root directory. File should contain:

```
PORT = 
NODE_ENV = 
TELEGRAM_TOKEN = 
MONGODB_CONNECTION = 
HEROKU_URL = 
ADMIN_USERNAME = 
```

* `PORT` - port for the development needs. Use `3000` if you are not sure about this;
* `NODE_ENV` - a string showing the current application mode. Use `development` when running locally, otherwise set it to `production`;
* `TELEGRAM_TOKEN` - a token provided by [Bot Father](https://t.me/BotFather) after your bot creation;
* `MONGODB_CONNECTION` - a MongoDB [connection string](https://docs.mongodb.com/manual/reference/connection-string/);
* `HEROKU_URL` - an URL of your deployment. Is used to set up a webhook when running in production mode;
* `ADMIN_USERNAME` - a service variable, helps bot to understand who have sufficient rights to start shuffling.

### Launching

To run client & server on localhost type `npm start` in a root folder.

```
$ npm start
```

## Built With

- [Node.js](https://github.com/nodejs/node) - JavaScript runtime for server;
- [npm](https://github.com/npm/npm) - Package manager for JavaScript;
- [Telegraf.js](https://github.com/telegraf/telegraf) - Modern Telegram bot framework for Node.js;
- [MongoDB](https://www.mongodb.com/) - NoSQL Database;
- [Mongoose](http://mongoosejs.com/) - ODM for MongoDB.

## Developed by

* **George Puisha** - [GitStearis](https://github.com/GitStearis).

