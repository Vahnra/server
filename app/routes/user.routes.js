const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/user", controller.findAll);

  app.put("/user/:id", controller.update);

  app.put("/user/add/:id", controller.addFriend);

  app.get("/user/detail/:id", controller.findOne);

  app.put("/user/delete-friend/:id", controller.deleteFriend);

};
