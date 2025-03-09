const {
  validateRegister,
  validateLogin,
  validateResetPassword,
} = require("../validations/authValidation");
const UserModel = require("../models/schemas/userSchema");
const bcrypt = require("bcrypt");
const { ROLES } = require("../utils/constants");
const { generateToken } = require("../models/userModel");

// Register User
exports.register = async (req, res) => {
  const { error } = validateRegister(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const { email, password, firstName, lastName, phone } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res.status(400).send({ message: "Email already registered" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
    });
    await newUser.save();

    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

// Login User
exports.login = async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const { email, password, panelType } = req.body;

  try {
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    // Check if the user is trying to log in to the wrong panel based on their role
    if (panelType === "admin" && user.role !== "admin") {
      return res.status(403).send({ message: "Access denied. Admin panel is only for admin users." });
    }

    if (panelType === "user" && user.role !== "user") {
      return res.status(403).send({ message: "Access denied. User panel is only for user accounts." });
    }

    // Use the generateToken utility
    const token = generateToken(user);

    res.status(200).send({ message: "Login successful", token, user });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { error } = validateResetPassword(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const { email, resetToken, newPassword } = req.body;

  try {
    const user = await UserModel.findOne({
      email,
      resetPasswordToken: resetToken,
    });
    if (!user) return res.status(400).send({ message: "Invalid reset token" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null;
    await user.save();

    res.status(200).send({ message: "Password reset successful" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

// check if admin@gmail.com & role admin exists, then return true, otherwise create admin
(async function checkAdmin() {
  try {
    const admin = await UserModel.findOne({
      email: "admin@gmail.com",
      role: ROLES.ADMIN,
      firstName: "Admin",
    });
    if (!admin) {
      // hash password
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

      // create user in db
      await UserModel.create({
        email: "admin@gmail.com",
        password: hashedPassword,
        role: ROLES.ADMIN,
        phone: "+1234567890",
        firstName: "Admin",
        parentId: null,
        positionName: "Super Admin",
      });
      console.log("admin created >>>>>>>> ");
    } else {
      console.log("admin already exists >>>>>>>> ");
    }
  } catch (error) {
    console.log("error in checkAdmin", error);
  }
})();
