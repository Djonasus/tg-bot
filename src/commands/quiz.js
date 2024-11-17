const StartQuiz = require('../utils/StartQuiz')

module.exports = {
    name: "quiz",
    execute: async (toolset) =>{
        StartQuiz(toolset)
    }
  }