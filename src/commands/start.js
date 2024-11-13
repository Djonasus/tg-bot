module.exports = {
    name: "start",
    execute: async (bot, _, chat) =>{
      bot.sendMessage(chat, "Привет! Я бот-викторина. Набери /quiz, чтобы начать!");
    }
  }