const mongoose = require("mongoose");
const { getMongooseAggregatePaginatedData, getMongoosePaginatedData } = require("../utils");
const AptitudeTestSchema = require("./schemas/aptitudeTestSchema");

// Create new test
exports.createTest = (obj) => AptitudeTestSchema.create(obj);

// Find test by query
exports.findTest = (query) => AptitudeTestSchema.findOne(query);

// Find all tests
exports.findTests = (query) => AptitudeTestSchema.find(query);

// Update test
exports.updateTest = (query, obj) =>
  AptitudeTestSchema.findOneAndUpdate(query, obj, { new: true });

// Remove test (soft delete)
exports.removeTest = (testId) =>
  AptitudeTestSchema.findByIdAndUpdate(testId, { $set: { isActive: false, isDeleted: true } });

// Get paginated tests
exports.getPaginatedTests = async ({ query, page, limit } = {}) => {
  const { data, pagination } = await getMongoosePaginatedData({
    model: AptitudeTestSchema,
    query,
    page,
    limit,
    sort: { category: 1 },
  });

  return { tests: data, pagination };
};
