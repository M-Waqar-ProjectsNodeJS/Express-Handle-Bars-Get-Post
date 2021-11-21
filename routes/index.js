var express = require("express");
var router = express.Router();
var { body, validationResult } = require("express-validator");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express Application" });
});

/* GET About page. */
router.get("/about", function (req, res, next) {
  res.render("about", { title: "About Page" });
});

/* GET About page. */
router.get("/about/:id", function (req, res, next) {
  const id = req.params.id;
  res.render("about", { title: "About Page ~ id: " + id });
});

router.get("/formvalidation", function (req, res, next) {
  res.render("signup", {
    title: "Form Validation",
    success: req.session.success,
    errors: req.session.errors,
  });
  req.session.errors = null;
});

/* Form Post. */
router.post("/submit", function (req, res, next) {
  const id = req.body.id;
  res.redirect("/about/" + id);
});

/* Sign Up Form Validation and Post. */
router.post(
  "/validateSignUp",
  // Check Validity
  body("email").exists().isEmail(),

  body("password").isLength({ min: 4 }).equals(body("confirmpassword")),

  function (req, res, next) {
    const errors = validationResult(req);
    console.log(errors);
    if (errors) {
      req.session.errors = errors.array();
      req.session.success = false;
    } else {
      req.session.success = true;
    }
    res.redirect("/formvalidation");
  }
);

module.exports = router;
