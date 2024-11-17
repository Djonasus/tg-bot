const api = require("../api")

module.exports = {
    name: "select_category",
    execute: async (toolset) =>{
        const inlineKeyboard = Object.entries(api.Categories).map(cat => [
            {text: cat[0], callback_data: cat[1]}
        ]);

        toolset.bot.sendMessage(toolset.chatId, "Выбери категорию", {
            reply_markup: {
                inline_keyboard: inlineKeyboard,
            },
        });
    }
}