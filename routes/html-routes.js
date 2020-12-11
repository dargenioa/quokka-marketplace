const path = require("path");
const router = require("express").Router();


router.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.get("/signup", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
});

router.get("/member", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/member.html"));
});

router.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
});

module.exports = router;
