module.exports = (sequelize, Sequelize) => {
  const Room = sequelize.define("room", {
    name: {
      type: Sequelize.STRING,
    },
    place: {
      type: Sequelize.STRING,
    },
    detail: {
      type: Sequelize.STRING,
    },
    startdate: {
      type: Sequelize.DATE,
    },
    enddate: {
      type: Sequelize.DATE,
    },
    owner: {
      type: Sequelize.STRING,
    },
    participants: {
      type: Sequelize.INTEGER,
    },
    prefer: {
      type: Sequelize.BOOLEAN,
    },
    status:{
      type: Sequelize.BOOLEAN,
    }
  });

  return Room;
};
