import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./src/models/User.js";

dotenv.config();

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashed = await bcrypt.hash("password123", 10);

    const user = new User({
      name: "Test Admin",
      email: "admin@test.com",
      password: hashed,
      role: "Admin"
    });

    await user.save();
    console.log("User created:", user.email);

    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    mongoose.disconnect();
  }
};

seedUser();
