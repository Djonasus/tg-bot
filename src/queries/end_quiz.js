module.exports = {
    name: "end_quiz",
    execute: async (toolset) =>{
        toolset.bot.sendMessage(toolset.chatId, "Спасибо за игру! Возвращайтесь в любое время.")
    }
  }