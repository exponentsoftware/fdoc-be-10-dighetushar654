const coment = require("../controllers/comentController");
var router = require("express").Router();

router
    .post("/", coment.addComment)
    .get("/", coment.getTodoComment);






module.exports = router;