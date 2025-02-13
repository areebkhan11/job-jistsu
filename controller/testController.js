const TestModel = require('../models/schemas/testSchema');
const CategoryModel = require('../models/schemas/categorySchema');
const QuestionModel = require('../models/schemas/Question');
const Test = require('../models/schemas/testSchema');
const Result = require('../models/schemas/testResuldSchema');
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
        const tests = await TestModel.find().sort({ createdAt: -1 });;
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

        const tests = await TestModel.find({ categoryId: categoryId, difficultyLevel: difficulty });

        res.status(200).send(tests);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.testSubmition = async (req, res) => {
    try {
        const userId = req.user.id;
        const { testId, selectedAnswers } = req.body;
    
        // Fetch the test details
        const test = await Test.findById(testId);
        if (!test) {
          return res.status(400).json({ message: "Invalid test ID." });
        }
    
        // Fetch all questions for the test with the correct difficulty level
        const questions = await QuestionModel.find({
          testId,
        });
    
        if (!questions.length) {
          return res.status(400).json({ message: "No questions found for this test." });
        }
    
        let correctCount = 0;
        let totalScore = 0;
    
        const processedAnswers = selectedAnswers.map(({ questionId, selectedOption }) => {
          const question = questions.find(q => q._id.toString() === questionId);
    
          if (!question) {
            return res.status(400).json({ message: `Invalid question ID: ${questionId}` });
          }
    
          const isCorrect = question.correctAnswer === selectedOption;
          if (isCorrect) {
            correctCount++;
    
            // Assign score based on difficulty level of the test
            const scoreWeight = 
              test.difficultyLevel === "Basic" ? 1 :
              test.difficultyLevel === "Moderate" ? 2 :
              3; // Advanced
    
            totalScore += scoreWeight;
          }
    
          return { questionId, selectedOption, isCorrect };
        });
    
        const totalQuestions = questions.length;
        const isPassed = totalScore >= totalQuestions * 1.5; // Pass if the weighted score reaches the threshold
    
        // Save the result
        const result = new Result({
          userId,
          testId,
          difficultyLevel: test.difficultyLevel,
          selectedAnswers: processedAnswers,
          score: totalScore,
          totalQuestions,
          isPassed
        });
    
        await result.save();
    
        res.status(201).json({
          message: "Test submitted successfully",
          result
        });
      } catch (error) {
        console.error("Error submitting test:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
};
