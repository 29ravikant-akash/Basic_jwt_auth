const router = require("express").Router();
const { getaccinfo } = require("../controller/userController");

router.get("/getaccinfo", getaccinfo);


module.exports = router;
