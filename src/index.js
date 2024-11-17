require("dotenv").config()

const TelegramBot = require("node-telegram-bot-api")
const HandleAnswer = require("./utils/HandleAnswer")
const LoadCommands = require("./utils/LoadCommands")
const SelectCategory = require("./utils/SelectCategory")
const api = require("./api")

const TOKEN = process.env.TOKEN

const bot = new TelegramBot(TOKEN, { polling: true })

global.userState = {} // Объект для хранения состояния пользователей (текущий вопрос, набранные баллы и т.д.)

bot.commands = LoadCommands("commands") // Загружаем команды
bot.queries = LoadCommands("queries") // Загружаем query callbacks

bot.onText(/^\/(\w+)(?:@[\w-]+)?(?:\s+(.*))?$/, async (msg, match) => {
  const chatId = msg.chat.id
  const command = bot.commands.get(match[1])
  if(!command) {
    bot.sendMessage(chatId, "Команда не распознана(")
    return
  };

  // msg.args = match[2] ? match[2].split(/\s+/) : [] // Пока не придумал назначения

  try {
    toolset = {
      bot: bot,
      msg: msg,
      chatId: chatId,
    }

    command.execute(toolset) // Выполняем команду тут
  } catch (error) {
    console.log(error)
  }
})

bot.on("callback_query", (callbackQuery) => {
  const msg = callbackQuery.message
  const chatId = msg.chat.id
  const answer = callbackQuery.data

  const toolset = {chatId: chatId, answer: answer, bot: bot}

  const command = bot.queries.get(answer)
  if(!command && Object.values(api.Categories).includes(answer)) {
    SelectCategory(toolset)
  } else if(!command) {
    HandleAnswer(toolset)
  } else {
    try {
      command.execute(toolset) // Выполняем команду тут
    } catch (error) {
      console.log(error)
    }
  }

  bot.answerCallbackQuery(callbackQuery.id);
});