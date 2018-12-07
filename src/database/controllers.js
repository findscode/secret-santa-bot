const Participants = require("./participant");

module.exports.registerPartcipant = (user) => {
  const participant = new Participants(user);
  return participant.save().then(result => !!result).catch((error) => !error);
};

module.exports.countPartcipants = () => {
  return Participants.count({}, (amount) => amount);
};

module.exports.getParticipantsUsernames = async () => {
  let usernames;
  await Participants.find({}, (error, participants) => {
    if (!error) {
      usernames = participants.map(participant => participant.username);
    } else {
      console.log(error);
    }
  });
  return usernames;
};