const express = require("express");
const router = express.Router();
const userModule = require("../modules/module");

router.get("/get", userModule.getUser);

router.post("/add", userModule.createUser);

router.put("/update/:userId", userModule.updateUser);

router.delete("/delete/:userId", userModule.deleteUser);

module.exports = router;