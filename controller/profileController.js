const ProfileModel = require('../models/schemas/profileSchema');

exports.createProfile = async (req, res) => {
    try {
      const userId = req.user.id;
      const profileExists = await ProfileModel.findOne({ userId });
      if (profileExists) {
        return res.status(400).send({ message: 'Profile already exists for this user.' });
      }
  
      const profile = new ProfileModel({ ...req.body, userId });
      await profile.save();
      res.status(201).send(profile);
    } catch (error) {
      res.status(400).send(error);
    }
  };
  

  exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const profile = await ProfileModel.findOne({ userId });
  
      if (!profile) {
        return res.status(404).send({ message: 'Profile not found.' });
      }
  
      res.status(200).send(profile);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  

  exports.updateProfile = async (req, res) => {
    try {
      const userId = req.user.id;
      const profile = await ProfileModel.findOneAndUpdate(
        { userId },
        req.body,
        { new: true, runValidators: true }
      );
  
      if (!profile) {
        return res.status(404).send({ message: 'Profile not found.' });
      }
  
      res.status(200).send(profile);
    } catch (error) {
      res.status(400).send(error);
    }
  };
  
  exports.deleteProfile = async (req, res) => {
    try {
      const userId = req.user.id;
      const profile = await ProfileModel.findOneAndDelete({ userId });
  
      if (!profile) {
        return res.status(404).send({ message: 'Profile not found.' });
      }
  
      res.status(200).send(profile);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
