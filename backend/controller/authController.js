const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../modals/userModal");

const register = async (req, res) => {
  try {
    console.log("you request to register");
    const userName = req.body.name;
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    if (!userName || !userEmail || !userPassword) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    if (!validateEmail(userEmail)) {
      return res.status(400).json({ message: "Invalid emails." });
    }

    if (userPassword.length < 6) {
      return res.status(400).json({ message: "password must be of atleast length 6!" });
    }

    const user = await Users.findOne({ email: userEmail });
    console.log(user);
    if (user !== null) {
      res.send({ message: "User exist" });
    } else {
      const hashedpass = bcrypt.hashSync(userPassword, 10);
      const newuser = new Users({
        name: userName,
        email: userEmail,
        password: hashedpass,
      });
      newuser.save();
      res.send({ message: "Registrated succesfully", email: userEmail });
    }
  } catch (err) {
    return res.send({ message: err });
  }
};

const login = async (req, res) => {
  try {
    console.log("you are in login route");
    // console.log(req.body);
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const user = await Users.findOne({ email: userEmail });
    console.log(user);
    if (user) {
      bcrypt.compare(userPassword, user.password, function (err, isMatched) {
        if (err) {
          throw err;
        }
        if (isMatched) {
          const payload = { id: user.id, email: user.email };
          let token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: "1m",
          });
          res.json({
            accessToken: token,
            message: "Logined succesfully",
          });
        } else {
          res.status(400).send({
            accessToken: null,
            message: "Invalid Password!",
          });
        }
      }); // bcrypt.compare end
    } else {
      res.status(400).send({ message: "User Not found." });
    }
  } catch (err) {
    return res.send({ message: err });
  }
};

//====================== supporting functions ==============================
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
module.exports = { login, register };
