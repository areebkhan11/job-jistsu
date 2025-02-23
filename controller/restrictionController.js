const RestrictionModel = require('../models/schemas/restrictionSchema'); // import the Restriction model

// Create a new restriction
exports.createRestriction = async (req, res) => {
  try {
    const restriction = new RestrictionModel({
      ...req.body,
      image: req.files ? req.files['image'][0].path : null, // Handle file upload for image if it exists
    });

    await restriction.save();
    res.status(201).send(restriction);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all restrictions
exports.getRestrictions = async (req, res) => {
  try {
    const restrictions = await RestrictionModel.find().sort({ createdAt: -1 });
    res.status(200).send(restrictions);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a restriction by ID
exports.getRestrictionById = async (req, res) => {
  try {
    const restriction = await RestrictionModel.findById(req.params.id);
    if (!restriction) {
      return res.status(404).send({ message: 'Restriction not found' });
    }
    res.status(200).send(restriction);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a restriction by ID
exports.updateRestriction = async (req, res) => {
  try {
    const restriction = await RestrictionModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!restriction) {
      return res.status(404).send({ message: 'Restriction not found' });
    }

    res.status(200).send(restriction);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a restriction by ID
exports.deleteRestriction = async (req, res) => {
  try {
    const restriction = await RestrictionModel.findByIdAndDelete(req.params.id);
    if (!restriction) {
      return res.status(404).send({ message: 'Restriction not found' });
    }

    res.status(200).send({ message: 'Restriction deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
};
