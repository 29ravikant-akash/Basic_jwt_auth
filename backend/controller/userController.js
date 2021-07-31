const asyncHandler = require('express-async-handler');
const Users = require("../modals/userModal");

const getaccinfo = asyncHandler(async (req, res) => {
  try {
    console.log("you request to getaccinfo");
    const user = await Users.find({});
    if (user) {
      res.json({ user });
    }
    else{
      res.send({message:"No users"});
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});


module.exports = { getaccinfo };
