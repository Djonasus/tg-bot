const api = require("../api")

const SelectCategory = (toolset) => {
    try {
        userState[toolset.chatId] = userState[toolset.chatId] ? userState[toolset.chatId] : { currentQuestionIndex: 0, score: 0, questions: [], category: api.Categories["Художество"]}
    } catch (err) {
        console.error(err)
    }
    const user = userState[toolset.chatId]
    if(Object.values(api.Categories).includes(toolset.answer)) {
        user.category = toolset.answer

        toolset.bot.sendMessage(toolset.chatId, `Категория выбрана! ${user.category}`)
    }
}

module.exports = SelectCategory