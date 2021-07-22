require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt =require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.json());
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/authDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('mongoDB connected');
  }, error => {
    console.log(error, 'error');
  })
const userSchema = {
  name: String,
  password: String
};

const User = mongoose.model("Users", userSchema);


app.post("/register", (req, res) => {
  const userName = req.body.name;
  const userPassword = req.body.password;
  User.findOne({ name: userName }, function (err, user) {
    if (!err) {
      if (user !== null)
        res.send({ message: "User exist" });
      else {
        const hashedpass = bcrypt.hashSync(userPassword,10);
        const newuser = new User({ name: userName, password: hashedpass });
        newuser.save();
        res.send({ message: "Registrated succesfully", name: userName });
      }
    }
    else
      cosole.log(err);
  });

});

app.post("/login", (req, res) => {
  const userName = req.body.name;
  const userPassword = req.body.password;
  User.findOne({ name: userName }, function (err, user) {
    if (!err) {

      if (user !== null) {
        bcrypt.compare(userPassword, user.password, function (err, isMatched) {

          if (isMatched) {
            const payload = { id: user.id, name: user.name };
            let token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1m' });

            res.json({
              accessToken: token,
              message: "Logined succesfully"
            });
          }
          else {
            res.send({
              accessToken: null,
              message: "Invalid Password!"
            });
          }

        }); // bcrypt.compare end
      }
      else
        res.send({ message: "User Not found." });

    }
    else
      cosole.log(err);

  });
});


app.listen(3001, function () {
  console.log("BackEnd running at port " + 3001);
});




