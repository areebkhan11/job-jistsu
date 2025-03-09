const ProfileModel = require('../models/schemas/profileSchema');

exports.createProfile = async (req, res) => {
    try {
      const userId = req.user.id;
      const profileExists = await ProfileModel.findOne({ userId });
      if (profileExists) {
        return res.status(400).send({ message: 'Profile already exists for this user.' });
      }

      const { file } = req;
      const image = file.path;
  
      const profile = new ProfileModel({ ...req.body, userId, image: req.file ? image : null, });
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
    let updateData = { ...req.body };

      // Check if a new image is uploaded
      if (req.file) {
        // Delete the old image if it exists
        if (resource.image) {
          const oldImagePath = path.join(
            __dirname,
            "../uploads/resources",
            resource.image
          );
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
  
        // Update the image field with the new file path
        updateData.image = req.file.path;
      }

      const profile = await ProfileModel.findOneAndUpdate(
        { userId },
        updateData,
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
  
