const TestModel = require('../models/schemas/testSchema');
const CategoryModel = require('../models/schemas/categorySchema');

exports.createTest = async (req, res) => {
    try {
        const { categoryId } = req.body;

        // Check if the category exists
        const categoryExists = await CategoryModel.findById(categoryId);
        if (!categoryExists) {
            return res.status(400).send({ message: 'Category not exists' });
        }

        // If category exists, proceed to create the test
        const test = new TestModel(req.body);
        await test.save();
        res.status(201).send(test);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getTests = async (req, res) => {
    try {
        const tests = await TestModel.find();
        res.status(200).send(tests);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getTestById = async (req, res) => {
    try {
        const test = await TestModel.findById(req.params.id);
        if (!test) {
            return res.status(404).send();
        }
        res.status(200).send(test);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateTest = async (req, res) => {
    try {
        const test = await TestModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!test) {
            return res.status(404).send();
        }
        res.status(200).send(test);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteTest = async (req, res) => {
    try {
        const test = await TestModel.findByIdAndDelete(req.params.id);
        if (!test) {
            return res.status(404).send();
        }
        res.status(200).send(test);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getTestsByDifficulty = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { difficulty } = req.query;

        // Validate difficulty level
        const validDifficulties = ['Basic', 'Moderate', 'Advanced'];
        if (!validDifficulties.includes(difficulty)) {
            return res.status(400).send({ error: 'Invalid difficulty level' });
        }

        const tests = await TestModel.find({ category: categoryId, difficultyLevel: difficulty });

        res.status(200).send(tests);
    } catch (error) {
        res.status(500).send(error);
    }
};
