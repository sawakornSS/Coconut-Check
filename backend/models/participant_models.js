module.exports = (sequelize, Sequelize) => {
  const Participant = sequelize.define("participant", {
    username: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    time: {
      type: Sequelize.TIME,
    },
    device: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Participant;
};
