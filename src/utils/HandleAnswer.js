const SendQuestion = require("./SendQuestion")

const HandleAnswer = async (toolset) => {
    if (!userState[toolset.chatId]) {
        return
    }

    const user = userState[toolset.chatId];
    const question = user.questions[user.currentQuestionIndex];

        if (toolset.answer === question.correctAnswer) {
            user.score++;
            await toolset.bot.sendMessage(toolset.chatId, "Правильно!"); // Ждём, пока сообщение отправится
        } else {
            await toolset.bot.sendMessage(
            toolset.chatId,
            `Неправильно! Правильный ответ: ${question.correctAnswer}`
            ); // Ждём, пока сообщение отправится
        }

        user.currentQuestionIndex++;
        SendQuestion(toolset); // После отправки сообщения отправляем следующий вопрос
}

module.exports = HandleAnswer