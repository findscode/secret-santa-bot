const TelegramBot = require("node-telegram-bot-api");

const controllers = require("./database/controllers");

const token = process.env.TELEGRAM_TOKEN;
const amount = process.env.PARTICIPANTS_AMOUNT;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (message) => {
  bot.sendMessage(message.chat.id, "🎅 Хо-хо-хо! Меня зовут Техно-Санта, я создан для того, чтобы помогать ребятишкам вроде тебя дарить друг другу подарки.\n\nВведи команду /register чтобы начать.");
});

bot.onText(/\/register/, async (message) => {
  const user = {
    name: message.from.first_name,
    username: message.from.username,
    id: message.from.id
  };
  const isSuccess = await controllers.registerPartcipant(user);
  console.log(isSuccess);
  const answer = isSuccess
    ? `\t🦌 Поздравляю, теперь ты в команде! Начинай готовить подарки, ведь вечеринка уже не за горами.\n\n❄️ Мои эльфы-помощники уже настраивают систему жеребьевки, совсем скоро каждый из нас получит своего Тайного Санту...` 
    : `\t🎁 Не стоит регистрироваться дважды, мой шаловливый друг! Помни, что в таком случае тебе придется дарить сразу два подарка!`;
  bot.sendMessage(message.chat.id, answer);
});