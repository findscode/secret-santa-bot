const TelegramBot = require("telegraf");

const controllers = require("./database/controllers");
const helpers = require("./helpers");
const text = require("./text");

const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token, { polling: true });

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
  const answer = isSuccess ? text.registerSuccess : text.registerFailure;
  
  bot.telegram.sendMessage(context.chat.id, answer);
});

bot.command("statistics", async context => {
  const amount = await controllers.countPartcipants();
  const usernames = await controllers.getParticipantsUsernames();
  const answer = helpers.buildList(amount, usernames);

  bot.telegram.sendMessage(context.chat.id, answer);
});

bot.command("shuffle", async context => {
  const isValid = context.from.username === process.env.ADMIN_USERNAME;
  const answer = isValid ? text.shuffleInProgress : text.shuffleNotAllowed;

  if (isValid) {
    await controllers.startShuffle();
  }
  
  context.reply(answer);
});

bot.command("gift", async context => {
  const recepient = await controllers.getRecepient(context.from.username);
  const answer = recepient ? text.recepientAvailable(recepient) : text.recepientNotAvailable;

  context.reply(answer);
});

if (process.env.NODE_ENV === "development") {
  bot.launch();
} else {
  bot.launch({
    webhook: {
      domain: process.env.HEROKU_URL + token,
      port: process.env.PORT
    }
  });
}