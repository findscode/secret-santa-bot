const TelegramBot = require("node-telegram-bot-api");

const controllers = require("./database/controllers");
const helpers = require("./helpers");
const text = require("./text");

const token = process.env.TELEGRAM_TOKEN;
const amount = process.env.PARTICIPANTS_AMOUNT;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (message) => {
  bot.sendMessage(message.chat.id, text.start);
});

bot.onText(/\/help/, (message) => {
  bot.sendMessage(message.chat.id, text.help);
});

bot.onText(/\/register/, async (message) => {
  const user = {
    name: message.from.first_name,
    username: message.from.username,
    id: message.from.id
  };
  const isSuccess = await controllers.registerPartcipant(user);
  const answer = isSuccess
    ? text.registerSuccess
    : text.registerFailure;
  bot.sendMessage(message.chat.id, answer);
});

bot.onText(/\/statistics/, async (message) => {
  const placesLeft = amount - await controllers.countPartcipants();
  const usernames = await controllers.getParticipantsUsernames();
  const answer = helpers.buildList(placesLeft, usernames);
  bot.sendMessage(message.chat.id, answer);
});