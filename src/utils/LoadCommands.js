// Функция подгрузки команд. Не хочется лезть в index.js только ради того, чтобы добавить новую команду или callback запрос
// Проходим по директории dirname и возвращаем Map.

const fs = require('fs')

const LoadCommands = (dirname) => {
    const ref = new Map()
    const commandFiles = fs.readdirSync("./src/"+dirname).filter(file => file.endsWith('.js'))
    for(const file of commandFiles){
        const command = require(`../${dirname}/${file}`)
        ref.set(command.name, command)
    }
    return ref
}

module.exports = LoadCommands