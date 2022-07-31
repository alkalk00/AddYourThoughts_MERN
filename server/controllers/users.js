const { default: mongoose } = require("mongoose");
const PostMessage = require("../models/schems");
const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.postReq = async (req, res) => {
  const posts = req.body;
  const newPosts = new PostMessage({...posts, creator: req.userId, createdAt: new Date().toISOString()});
  console.log(newPosts);
  try {
    await newPosts.save();
    res.status(201).json(newPosts);
  } catch (err) {
    console.log(err);
  }
};

exports.getReq = async (req, res) => {
  try {
    const messages = await PostMessage.find();
    res.status(200).json(messages);
  } catch (err) {
    console.log(err);
  }
};

exports.updPost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.json(updatedPost);
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post found");

  await PostMessage.findByIdAndDelete(id);
  console.log("delte");

  res.json({ message: "post deleted successfully" });
};

exports.likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post found");

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

  res.json(updPost);
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const curUser = await Users.findOne({ email });

    if (!curUser)
      return res.status(404).json({ message: "User doesn't exits" });

    const isPasswordCorrect = await bcrypt.compare(password, curUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: curUser.email, id: curUser._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result: curUser, token });
  } catch (err) {
    res.send(500).json({ message: "Something went wrong" });
  }
};

exports.signup = async (req, res) => {
  const { email, password, confirmPasswrod, firstname, lastname } = req.body;

  try {
    const curUser = await Users.findOne({ email });

    if (curUser) return res.status(400).json({ message: "User already exits" });

    if (password !== confirmPasswrod)
      return res.status(400).json({ message: "password incorrect" });

    const hashPassword = await bcrypt.hash(password, 12);

    const result = await Users.create({
      email,
      password: hashPassword,
      name: `${firstname} ${lastname}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(200).json({ result, token });
  } catch (err) {
    res.send(500).json({ message: "Something went wrong" });
  }
};
