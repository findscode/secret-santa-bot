const Participants = require("./participant");

module.exports.registerPartcipant = (user) => {
  const participant = new Participants(user);
  return participant.save().then(result => !!result).catch((error) => !error);
};