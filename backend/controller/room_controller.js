const db = require("../models");
const Room = db.rooms;
const Participant = db.participants;
const User = db.users;
const { sequelize } = require("../models");
const { QueryTypes } = require("sequelize");

// Find a single Tutorial with an id
exports.findRoom = (req, res) => {
  const id = req.params.id;

  Room.findAll({
    include: [
      {
        model: Participant,
        as: "participant",
      },
    ],
    where: { id: id },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving room history with id=" + id,
      });
    });
  // Room.findByPk(id)
  //   .then((data) => {
  //     if (data) {
  //       res.send(data);
  //     } else {
  //       res.status(404).send({
  //         message: `Cannot find room history with id=${id}.`,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: "Error retrieving room history with id=" + id,
  //     });
  //   });
  // sequelize.query(
  //   'SELECT * FROM rooms where id = :id SELECT * FROM participants where room_id = :id',
  //   {
  //     replacements: { id: ids },
  //     type: QueryTypes.SELECT
  //   })
  //   .then(data => {

  //     res.send(data);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while retrieving ."
  //     });
  //   });
};

exports.create = (req, res) => {
  // Insert Room Data
  const room = {
    name: req.body.roomName,
    place: req.body.place,
    detail: req.body.detail,
    owner: req.body.owner,
    startdate: req.body.startDate,
    enddate: req.body.endDate,
    participants: 0,
    user_id: req.body.user_id,
    prefer: req.body.checkbox,
    status: false
  };
  // Save User in the database
  Room.create(room) //basic query sequelize
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error Room",
      });
    });
};

exports.getRoom_userID = (req, res) => {
  const user_id = req.params.user_id; // Id_user for check database

  Room.findAll({
    where: { user_id: user_id }, // id_database = Id_user
    order: [["id", "DESC"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Room.",
      });
    });
};

exports.saveParticipants = (req, res) => {
  const id = req.params.id; // id params
  const participants = {};

  for (var i in req.body.data) {
    // set array to object information participants
    participants[i] = {
      username: req.body.data[i].ID,
      name: req.body.data[i].Name,
      email: req.body.data[i].Email,
      time: req.body.data[i].Time,
      device: req.body.data[i].Device,
      status: req.body.data[i].Status,
      room_id: id,
    };
    // Save Information Participants
    Participant.create(participants[i]); //basic query sequelize
  }
  // Update Participants in room
  Room.update({ participants: req.body.participants, status: true }, { where: { id: id } }) 
  .then(() => {
    res.send("success");
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Room.",
    });
  });; //basic query sequelize
};

exports.checkRoom_RoomID = (req, res) => {
  const room_id = req.body.codeRoom; // Id_Room for check database
  console.log(req.body.codeRoom);
  console.log("checkRoom naja");
  console.log(room_id);

  Room.findAll({
    where: { id: room_id }, // id_database = Id_Room from view
  })
    .then((data) => {
      // console.log(data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Room.",
      });
    });
};
