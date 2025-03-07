const ResourceModel = require("../models/schemas/resourcesSchema");
const fs = require("fs");
const path = require("path");

exports.createResource = async (req, res) => {
  try {
    const { file } = req;
    const image = file.path;
    const resource = new ResourceModel({
      ...req.body,
      image: req.file ? image : null,
    });
    await resource.save();
    res.status(201).send(resource);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getResources = async (req, res) => {
  try {
    const resources = await ResourceModel.find()
      .populate("category")
      .sort({ createdAt: -1 });
    res.status(200).send(resources);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getResourceById = async (req, res) => {
  try {
    const resource = await ResourceModel.findById(req.params.id).populate(
      "category"
    );
    if (!resource) {
      return res.status(404).send();
    }
    res.status(200).send(resource);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateResource = async (req, res) => {
  try {
    // Find the existing resource first
    const resource = await ResourceModel.findById(req.params.id);

    if (!resource) {
      return res.status(404).send({ message: "Resource not found" });
    }

    // Check if a new image is uploaded
    if (req.file && req.file.image) {
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
      req.body.image = req.file.path; 
       }

    // Update the resource with new data
    const updatedResource = await ResourceModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("category");

    res.status(200).send(updatedResource);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteResource = async (req, res) => {
  try {
    const resource = await ResourceModel.findByIdAndDelete(req.params.id);
    if (!resource) {
      return res.status(404).send();
    }
    res.status(200).send(resource);
  } catch (error) {
    res.status(500).send(error);
  }
};
