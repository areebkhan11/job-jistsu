const testResultSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    testId: { type: Schema.Types.ObjectId, ref: 'Test', required: true },
    score: { type: Number, required: true },
    passed: { type: Boolean, required: true },
    responses: [{
      questionId: { type: Schema.Types.ObjectId, required: true },
      selectedOption: { type: String, required: true }
    }]
  }, { timestamps: true });
  
  const TestResult = mongoose.model('TestResult', testResultSchema);
  
  module.exports = TestResult;
  