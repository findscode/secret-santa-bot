require("dotenv").config();
require("./src/database/mongoose").connect();

const bot = require("./src/bot");
require("./src/web")(bot);