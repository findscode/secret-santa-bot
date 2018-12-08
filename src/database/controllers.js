const Participants = require("./participant");
const Pairs= require("./pair");

const helpers = require("../helpers");

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
    }
  });
  return usernames;
};

module.exports.startShuffle = async () => {
  let donors;
  await Participants.find({}, (error, participants) => {
    if (!error) {
      donors = participants;
    }
  });
  helpers.shuffle(donors).forEach(pair => {
    new Pairs(pair).save().then(null, error => console.log(`Shuffle error: ${error.code}`)).catch(console.log);
  });
};

module.exports.getRecepient = async (donorUsername) => {
  let recepient;
  await Pairs.findOne({
    "donor.username": donorUsername
  }, (error, pair) => {
    if (!error && pair) {
      recepient = pair.recepient;
    }
  });
  return recepient;
};