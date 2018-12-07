process.env.NTBA_FIX_319 = 1;

require("dotenv").config();

const bot = require("./src/bot");
require("./src/web")(bot);