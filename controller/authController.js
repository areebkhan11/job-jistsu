const {
  validateRegister,
  validateLogin,
  validateResetPassword,
} = require("../validations/authValidation");
const UserModel = require("../models/schemas/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user)
      return res.status(400).send({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).send({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).send({ message: "Login successful", token });
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
