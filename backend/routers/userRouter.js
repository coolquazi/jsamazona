import express from "express";
import User from "../models/userModel";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utils";

const userRouter = express.Router();

userRouter.get(
  "/createadmin",
  expressAsyncHandler(async (req, res) => {
    try {
      const user = new User({
        name: "admin",
        email: "admin@jsamazona.com", 
        password: "jsamazona",
        isAdmin: true,
      });
      const createdUser = await user.save();
      res.send(createdUser);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const signInUser = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (!signInUser) {
      res.status(401).send({
        message: "Invalid Credentials",
      });
    } else {
      res.send({
        _id: signInUser._id,
        name: signInUser.name,
        email: signInUser.email,
        isAdmin: signInUser.isAdmin,
        token: generateToken(signInUser),
      })
    }
  })
);

export default userRouter;
