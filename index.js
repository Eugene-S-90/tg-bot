
const TelegramBot = require('node-telegram-bot-api')
const TOKEN = "518232523:AAFxiG4EW0W8kRatn3vCFqspeRKgQD_KKpI";
const fs = require('fs');

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

// bot.on('message', msg => {
//     bot.sendMessage(msg.chat.id, randomAnswer())
// })

bot.onText(/\/help/, msg => {
    const text = `Здарова,${msg.from.first_name}`;
    const faq = `Пока я могу только ставить таймер на неограниченное число МИНУТ .Пример: "/1мин" или "/1min" `;
    bot.sendMessage(msg.chat.id, text)
    bot.sendMessage(msg.chat.id, faq)
})

// bot.onText(/\/test/, msg => {
//     const { id } = msg.chat
//     bot.sendMessage(id,  JSON.stringify(msg))
// })
let loxArray = [];
bot.onText(/\/wholox?/, msg => {
    const { id } = msg.chat
    bot.sendMessage(id, "Те кто хочет участвовать пишем '/go' ")
    bot.onText(/\/go/, msg => {
        loxArray.push(msg.from.first_name);
        bot.sendMessage(id, msg.from.first_name)
        console.log(loxArray)
    })
})






let wow;
wow = /.([0-9])?\w+(\s)?(min|мин)/

bot.onText(wow, msg => {
    // const text = `Fuck you ,${msg.from.first_name}`;
    let parsedText = parseInt(msg.text.slice(1)) * 60;
    let fixedText = parseInt(msg.text.slice(1))
    let lol = declOfNum(fixedText, ['минуту', 'минуты', 'минут']);

    function declOfNum(number, titles) {
        cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }


    function myFunction() {

        setInterval(function () {
            parsedText = parsedText - 1
            if (parsedText === 1) {
                bot.sendMessage(msg.chat.id, `${msg.from.first_name} устанавливал таймер на ${fixedText} ${lol}. Время вышло! ДЕЛАЙ ЧТО ДОЛЖЕН!!!!`);
                bot.sendPhoto(msg.chat.id, fs.readFileSync(__dirname + "/adv.jpg"));
                // console.log(parsedText)
            }
        }, 1000);
    }
    const txt = `Отлично ! ты зарядил таймер на ${parsedText / 60} ${lol}!`
    bot.sendMessage(msg.chat.id, txt)

    myFunction();
})

function randomAnswer() {
    let phrases = ["Неплохо", "Да ты хорош!", "Хм...знатно", "Ну допустим", "И че?!"];
    let rand = Math.floor(Math.random() * phrases.length);
    let result = [];
    result = phrases[rand];
    return result;
}

console.log("THE BOT-SERVER IS RUNNING!");








