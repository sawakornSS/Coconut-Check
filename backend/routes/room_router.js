module.exports = (app) => {
  // import controllers
  const room = require("../controller/room_controller.js");

  // router
  var router = require("express").Router();

  // use routers
  router.get("/:id", room.findRoom);
  router.get("/getRoom_userID/:user_id", room.getRoom_userID)
  router.get("/checkRoom/:coderoom", room.checkRoom_RoomID)
  router.post("/createRoom", room.create); 
  router.put("/saveData/:id", room.saveParticipants); 
  

  // export router
  app.use("/api/room", router);
};
