require("dotenv").config(); // Подключение библиотеки dotenv для работы с переменными окружения
const TelegramBot = require("node-telegram-bot-api");
const TOKEN = process.env.TOKEN;

const fs = require("fs")

const bot = new TelegramBot(TOKEN, { polling: true });

global.userState = {}; // Объект для хранения состояния пользователей (текущий вопрос, набранные баллы и т.д.)

bot.commands = new Map()
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

bot.onText(/^\/(\w+)(?:@[\w-]+)?(?:\s+(.*))?$/, async (msg, match) => {
  const chat = msg.chat.id
  const command = bot.commands.get(match[1])
  if(!command) return;
  msg.args = match[2] ? match[2].split(/\s+/) : []
  try {
    command.execute(bot, msg, chat)
  } catch (error) {
    console.log(error)
  }
})