require("dotenv").config();
require("./src/database/mongoose").connect();
require("./src/bot");