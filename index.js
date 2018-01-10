
const TelegramBot = require('node-telegram-bot-api')
const TOKEN = "518232523:AAFxiG4EW0W8kRatn3vCFqspeRKgQD_KKpI";
const fs = require('fs');

const bot = new TelegramBot(TOKEN, {
    polling: true
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

let wow;
wow = /.([0-9])?\w+(\s)?(min|мин)/

bot.onText(wow, msg => {
    // const text = `Fuck you ,${msg.from.first_name}`;
    let parsedText = parseInt(msg.text.slice(1)) * 60;
    let fixedText = parseInt(msg.text.slice(1))
    myFunction();
    function myFunction() {
        setInterval(function () {
            parsedText = parsedText - 1
            if (parsedText === 1) {
                bot.sendMessage(msg.chat.id, `${msg.from.first_name} устанавливал таймер на ${fixedText} минут-(у/ы). Время вышло! ДЕЛАЙ ЧТО ДОЛЖЕН!!!!`);
                bot.sendPhoto(msg.chat.id, fs.readFileSync(__dirname + "/adv.jpg"));
                // console.log(parsedText)
            }
        }, 1000);
    }
    const txt = `Отлично ! ты зарядил таймер на ${parsedText / 60} минут-(у/ы)!`
    bot.sendMessage(msg.chat.id, txt)
})

function randomAnswer() {
    let phrases = ["Неплохо", "Да ты хорош!", "Хм...знатно", "Ну допустим", "И че?!"];
    let rand = Math.floor(Math.random() * phrases.length);
    let result = [];
    result = phrases[rand];
    return result;
}

console.log("THE BOT-SERVER IS RUNNING!");
//im here!!






