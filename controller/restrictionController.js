const RestrictionModel = require("../models/schemas/restrictionSchema"); // import the Restriction model
const fs = require("fs");
const path = require("path");

// Create a new restriction
exports.createRestriction = async (req, res) => {
  try {
    const { file } = req;
    const image = file.path;
    const restriction = new RestrictionModel({
      ...req.body,
      image: req.file ? image : null,
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
      return res.status(404).send({ message: "Restriction not found" });
    }
    res.status(200).send(restriction);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a restriction by ID
exports.updateRestriction = async (req, res) => {
  try {
    const restriction = await RestrictionModel.findById(req.params.id);

    if (!restriction) {
      return res.status(404).send({ message: "Restriction not found" });
    }

    // Check if a new image is uploaded
    if (req.file && req.file.image) {
      // Delete the old image if it exists
      if (restriction.image) {
        const oldImagePath = path.join(
          __dirname,
          "../uploads/restrictions",
          restriction.image
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Update the image field with the new file path
      req.body.image = req.file.path;
    }

    // Update the restriction
    const updatedRestriction = await RestrictionModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).send(updatedRestriction);
  } catch (error) {
    console.log(error, "<-----error")
    res.status(400).send(error);
  }
};

// Delete a restriction by ID
exports.deleteRestriction = async (req, res) => {
  try {
    const restriction = await RestrictionModel.findByIdAndDelete(req.params.id);
    if (!restriction) {
      return res.status(404).send({ message: "Restriction not found" });
    }

    res.status(200).send({ message: "Restriction deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
