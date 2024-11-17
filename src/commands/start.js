module.exports = {
    name: "start",
    execute: async (toolset) =>{
      toolset.bot.sendMessage(toolset.chatId, "Привет! Я бот-викторина. Набери /quiz, чтобы начать или /category для выбора категории!")
    }
  }