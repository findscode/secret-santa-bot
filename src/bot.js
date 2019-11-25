const TelegramBot = require("telegraf");

const controllers = require("./database/controllers");
const helpers = require("./helpers");
const text = require("./text");

const token = process.env.TELEGRAM_TOKEN;
const amount = process.env.PARTICIPANTS_AMOUNT;

let bot;
if (process.env.NODE_ENV === "production") {
  bot = new TelegramBot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
} else {
  bot = new TelegramBot(token, { polling: true });
}

bot.command("start", context => {
  bot.telegram.sendMessage(context.chat.id, text.start);
});

bot.command("help", context => {
  bot.telegram.sendMessage(context.chat.id, text.help);
});

bot.command("register", async context => {
  const user = {
    name: context.from.first_name,
    username: context.from.username,
    id: context.from.id
  };
  const isSuccess = await controllers.registerPartcipant(user);
  const answer = isSuccess
    ? text.registerSuccess
    : text.registerFailure;
  bot.telegram.sendMessage(context.chat.id, answer);
});

bot.command("statistics", async context => {
  const placesLeft = amount - await controllers.countPartcipants();
  const usernames = await controllers.getParticipantsUsernames();
  const answer = helpers.buildList(placesLeft, usernames);

  bot.telegram.sendMessage(context.chat.id, answer);
});

bot.command("shuffle", async context => {
  const isValid = context.from.username === process.env.ADMIN_USERNAME;

  if (isValid) {
    await controllers.startShuffle();
    context.reply(text.shuffleInProgress);
  } 
});

bot.command("gift", async context => {
  const recepient = await controllers.getRecepient(context.from.username);

  if (recepient) {
    bot.telegram.sendMessage(context.chat.id, text.recepientAvailable);
  } else {
    bot.telegram.sendMessage(context.chat.id, text.recepientNotAvailable);
  }
});

bot.launch();


module.exports = bot;