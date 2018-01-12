const TelegramBot = require('node-telegram-bot-api');


const TOKEN = "518232523:AAFxiG4EW0W8kRatn3vCFqspeRKgQD_KKpI";
const bot = new TelegramBot(TOKEN, {
    // interval сколько милисекунд ответа с клиента на сервер
    // autoStart отвечать на все сообщения или только когда бот включен
    // timeout таймаут между запросами
    polling: {
        interval: 300,
        autoStart: true,
        params: {
            timeout: 10
        }
    }
})

module.exports = bot;