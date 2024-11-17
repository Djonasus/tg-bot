const StartQuiz = require("../utils/StartQuiz")

module.exports = {
    name: "start_quiz",
    execute: async (toolset) =>{
        StartQuiz(toolset)
    }
}