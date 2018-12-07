module.exports.buildList = (placesLeft, usernames) => {
  const lines = usernames.map((username, index) => `${index + 1}. @${username}\n`).join();
  return `🎅 Осталось мест: ${placesLeft}\n\n🗒 Список Тайных Сант:\n\n${lines}`;
}