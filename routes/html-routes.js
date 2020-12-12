const path = require("path");
const router = require("express").Router();
const authenticated = require("../config/middleware/authenticated");


router.get("/", function (req, res) {
    if (req.user) {
        res.redirect("/members")
    } else {
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    }
});
router.get("/login", function (req, res) {
    if (req.user) {
        res.redirect("/members")
    } else {
        res.sendFile(path.join(__dirname, "../public/login.html"));
    }
});

router.get("/members", authenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
});

module.exports = router;
