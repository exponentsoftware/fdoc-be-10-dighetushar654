const user = require("../controllers/userController");
var router = require("express").Router();
  
// Create a new user
router.post("/", user.create);

router.get("/", user.findAll);

router.delete("/:id", user.delete);

router.patch("/:id", user.update);

// router.get("/:id", user.findOne);

router.get("/getTodos", user.getTodos);

router.get("/getAllInfo", user.getAllInfo);

router.post("/getPremium" ,user.buyPremium);

router.get("/allTranc", user.allTransactions);

module.exports = router;