const mongoose = require('mongoose');
const { Schema } = mongoose;

const profileSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String },
  object: { type: String },
  skills: [
    {
      title: { type: String },
      description: { type: String },
    },
  ],
  qualifications: [
    {
      title: { type: String },
      description: { type: String },
    },
  ],
  experience: [
    {
      title: { type: String },
      description: { type: String },
    },
  ],
  image: { type: String }, // Assuming this is a base64 string or a URL
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
