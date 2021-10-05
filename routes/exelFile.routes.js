const excel = require("../controllers/exelFileController");
var router = require("express").Router();

router.get('/', excel.getExcelFile);

module.exports = router;