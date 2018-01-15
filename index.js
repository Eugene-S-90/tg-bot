const fs = require('fs');
const bot = require('./config/config');
const showNumberCases = require('./src/showNumberCases');
const randomLox = require('./src/randomLox');
const fetch = require('node-fetch')
const getChuckJokes = require('./src/ChuckJokes');


let loxArray = [];

bot.onText(/\/help/, msg => {
    const text = `Здарова,${msg.from.first_name}`;
    const faq = ` Вот что я умею :
   === Таймер(любое колл минут) : "/1мин" или "/1min==="
   === Генератор шуток Чака : /chuck ===
   === Игра Кто Лишний?:) : /wholox === 

   `;
    bot.sendMessage(msg.chat.id, text)
    bot.sendMessage(msg.chat.id, faq)
})

// bot.onText(/\/test/, msg => {
//     const { id } = msg.chat
//     bot.sendMessage(id,  JSON.stringify(msg))
// })

bot.onText(/\/wholox?/, msg => {
    const { id } = msg.chat
    bot.sendMessage(id, "Те кто хочет участвовать пишем '/go' ")
    bot.onText(/\/go/, msg => {
        let isExist = loxArray.some(item => item === msg.from.first_name);
        if (!isExist) {
            loxArray.push(msg.from.first_name);
            bot.sendMessage(id, msg.from.first_name);
        }
    })
})
bot.onText(/\/result/, msg => {
    bot.sendMessage(msg.chat.id, randomLox(loxArray) || `${msg.from.first_name} ты забыл написать /wholox!!!`);
    loxArray = [];
})

bot.onText(/\/Chuck/, msg => {
    getChuckJokes(msg);
})

bot.onText(/.([0-9])?\w+(\s)?(min|мин)/, msg => {
    let parsedText = parseInt(msg.text.slice(1)) * 60;
    let fixedText = parseInt(msg.text.slice(1))
    let numberCases = showNumberCases(fixedText, ['минуту', 'минуты', 'минут']);
    let txt = `Отлично ! ты зарядил таймер на ${parsedText / 60} ${numberCases}!`;

    (() => {
        setInterval(() => {
            parsedText = parsedText - 1;
            if (parsedText === 1) {
                bot.sendMessage(msg.chat.id, `${msg.from.first_name} устанавливал таймер на ${fixedText} ${numberCases}. Время вышло! ДЕЛАЙ ЧТО ДОЛЖЕН!!!!`);
                bot.sendPhoto(msg.chat.id, fs.readFileSync(__dirname + "/adv.jpg"));
            }
        }, 1000);
    })();

    bot.sendMessage(msg.chat.id, txt)
})

console.log("THE BOT-SERVER IS RUNNING!");








