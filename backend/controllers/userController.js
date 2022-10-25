const { user: User } = require("../models");

const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

const postUser = async (req, res) => {
  try {
    const { username, password, name, email } = req.body;
    const user = await User.create({
      username: username,
      password: password,
      name: name,
      email: email,
    });
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

module.exports = {
  getAllUser,
  postUser,
};
