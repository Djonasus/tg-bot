const SendQuestion = async (toolset) => {
    const user = userState[toolset.chatId]
    const bot = toolset.bot
    const chatId = toolset.chatId

    if (user.currentQuestionIndex < user.questions.length) {
        const currentQuestion = user.questions[user.currentQuestionIndex];
        const options = [
          ...currentQuestion.incorrectAnswers,
          currentQuestion.correctAnswer,
        ].sort(() => Math.random() - 0.5);

        const inlineKeyboard = options.map((option) => [
            { text: option, callback_data: option },
          ]);
        
        await bot.sendMessage(chatId, currentQuestion.question, {
            reply_markup: {
              inline_keyboard: inlineKeyboard,
            },
          });

        // Делаем таймер
        setTimeout( async (user, index) => {
          if (user.currentQuestionIndex <= index) {
            await toolset.bot.sendMessage(toolset.chatId, `Время вышло! Правильный ответ ${user.questions[index].correctAnswer}`)
            
            user.currentQuestionIndex++;
            SendQuestion(toolset)
          }
        }, 10 * 1000, user, user.currentQuestionIndex);

    } else {
        bot
      .sendMessage(
        chatId,
        `Викторина завершена! Ваш результат: ${user.score}/${user.questions.length}`
      )
      .then(() => {
        // После отправки результата предлагаем сыграть еще раз
        bot.sendMessage(chatId, "Хотите сыграть еще раз?", {
          reply_markup: {
            inline_keyboard: [
              [{ text: "Да, начать заново", callback_data: "start_quiz" }],
              [{ text: "Выбрать категорию", callback_data: "select_category" }],
              [{ text: "Нет, спасибо", callback_data: "end_quiz" }],
            ],
          },
        });
      });

      delete userState[chatId];
    }
}

module.exports = SendQuestion