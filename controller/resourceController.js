const ResourceModel = require('../models/schemas/resourcesSchema');

exports.createResource = async (req, res) => {
  try {
    const resource = new ResourceModel(req.body);
    await resource.save();
    res.status(201).send(resource);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getResources = async (req, res) => {
  try {
    const resources = await ResourceModel.find().populate('category').sort({ createdAt: -1 });
    res.status(200).send(resources);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getResourceById = async (req, res) => {
    try {
      const resource = await ResourceModel.findById(req.params.id).populate('category');
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
      const resource = await ResourceModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      }).populate('category');
      if (!resource) {
        return res.status(404).send();
      }
      res.status(200).send(resource);
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