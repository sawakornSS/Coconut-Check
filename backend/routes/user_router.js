module.exports = (app) => {
  // import controllers
  const user_controller = require("../controller/user_controller.js");

  // router
  const router = require("express").Router();

  // use routers
  router.post("/register/create", user_controller.create); 
  router.post("/findUser", user_controller.findUser);

  // export router
  app.use("/api/user", router);
};
