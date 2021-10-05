const tag = require("../controllers/tagController");
var router = require("express").Router();

router
    .post("/", tag.addTag)
    .get("/", tag.getTodoTag);






module.exports = router;