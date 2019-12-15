module.exports.buildList = (amount, usernames) => {
  const lines = usernames && usernames.map((username, index) => `${ index + 1 }. @${ username }\n`).join('');
  return `🎅 Количество участников: ${ amount }\n\n🗒 Список Тайных Сант:\n\n${ lines }`;
}

const random = array => array[Math.floor(Math.random() * array.length)];

module.exports.shuffle = (donors) => {
  const pairs = []
  if (donors) {
    let recepients = donors;
    
    donors.forEach(donor => {
        let recepient = random(recepients);

        while (recepient === donor) {
          recepient = random(recepients);
        }

        recepients = recepients.filter(rec => rec !== recepient);
        pairs.push({
          donor,
          recepient
        });
    });
  }
  return pairs;
}    