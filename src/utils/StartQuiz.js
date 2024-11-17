const api = require('../api');
const FetchQuestions = require('./FetchQuestions');
const SendQuestion = require('./SendQuestion');

const StartQuiz = async (toolset) => {
    const category = userState[toolset.chatId]?.category ? userState[toolset.chatId].category : api.Categories["Художество"]
    userState[toolset.chatId] = { currentQuestionIndex: 0, score: 0, questions: [], category: category};

    const bot = toolset.bot
    const chatId = toolset.chatId

    const err_mess = "Произошла ошибка при загрузке вопросов. Попробуйте позже."

    try {
        const questions = await FetchQuestions(category)
        if (questions.length === 0) {
            bot.SendMessage(chatId, err_mess)
        } else {
            await toolset.bot.sendMessage(toolset.chatId, `Начнем! Выбранная категория: ${userState[toolset.chatId].category}`)
            userState[chatId].questions = questions
            SendQuestion({bot: toolset.bot, chatId: toolset.chatId})
        }
    } catch (error) {
        console.log(error)
        bot.sendMessage(chatId, err_mess);
    }
}

module.exports = StartQuiz