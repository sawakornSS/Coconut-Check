const dbConfig = require("../config/db_config.js");

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user_models.js")(sequelize, DataTypes);
db.participants = require("./participant_models.js")(sequelize, DataTypes);
db.rooms = require("./room_models")(sequelize, DataTypes);


//set foreignKey room id to tabel participants
db.rooms.hasMany(db.participants, {
  foreignKey: 'room_id',
  as: 'participant'
})

db.participants.belongsTo(db.rooms, {
  foreignKey: 'room_id',
  as: 'room'
})
// end

// set foreignKey user id to tabel rooms 
db.users.hasMany(db.rooms, {
  foreignKey: 'user_id',
  as: 'room'
})

db.rooms.belongsTo(db.users, {
  foreignKey: 'user_id',
  as: 'user'
})
// end

//export database
module.exports = db;