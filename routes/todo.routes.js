// const { models } = require("mongoose");
const todo = require("../controllers/todoController");
var router = require("express").Router();
  
// Create a new Todo
router.post("/", todo.create);

router.get("/", todo.findAll);

router.delete("/:id", todo.delete);

router.patch("/:id", todo.update);

router.get("/:id", todo.findOne);

module.exports = router;
