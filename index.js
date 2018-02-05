const fs = require('fs');
const bot = require('./config/config');
const showNumberCases = require('./src/showNumberCases');
const randomLox = require('./src/randomLox');
const fetch = require('node-fetch')
const getChuckJokes = require('./src/ChuckJokes');
const game = require('./src/game/game')();

let loxArray = [];

// ===HELP НАЧАЛО===
bot.onText(/\/help/, msg => {
    const text = `Здарова,${msg.from.first_name}`;
    const faq = ` Вот что я умею :
   === Таймер(любое колл минут) : "например, 1 минута"
   === Генератор шуток Чака : /chuck ===
   === Игра Кто Лишний?:) : /wholox === 
   `;

    bot.sendMessage(msg.chat.id, text)
    bot.sendMessage(msg.chat.id, faq, {
        "reply_markup": {
            "keyboard": [
                ["1min", "5min", "10min"],
                ["/chuck"],
                ["/wholox"]
            ]
        }
    });
})
// ===HELP КОНЕЦ===
// let delMsg = (id) => {
//     console.log(id);
//     (() => {
//         setInterval(() => {
//             console.log(msg);
//         }, 1000);
//     })();
// }

bot.onText(/\/test/, msg => {
    const {
        id
    } = msg.chat;
    bot.sendMessage(id, JSON.stringify(msg))
    setTimeout(() => {
        bot.deleteMessage(msg.chat.id, msg.message_id);
        bot.deleteMessage(msg.chat.id, msg.message_id + 1);
    }, 100000);


    bot.sendMessage(msg.chat.id, text)
})
// ===HELP КОНЕЦ===

// ===ИГРА КТО ЛОХ НАЧАЛО===
bot.onText(/\/wholox?/, msg => {
    const {
        id
    } = msg.chat
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
// ===ИГРА КТО ЛОХ КОНЕЦ===

// ===ШУТКИ ЧАКА НАЧАЛО===
bot.onText(/\/chuck/i, msg => {
    getChuckJokes(msg);
})
// ===ШУТКИ ЧАКА НАЧАЛО===

// ===ТАЙМЕР НАЧАЛО===
bot.onText(/\s?([0-9])?\w+(\s)?(min|мин|минуту|минут|minutes|minute)/, msg => {
    const chatId = msg.chat.id;
    const target = msg.text.match(/\s?([0-9])?\w+(\s)?(min|мин|минуту|минут|minutes|minute)/);
    const int = Number(target[0].match(/\d{1,}/g));
    let parsedSeconds = int * 60;
    let numberCases = showNumberCases(int, ['минуту', 'минуты', 'минут']);
    let txt = `Отлично ! ты зарядил таймер на ${int} ${numberCases}!`;

    (() => {
        setInterval(() => {
            parsedSeconds = parsedSeconds - 1;
            if (parsedSeconds === 1) {
                bot.sendMessage(msg.chat.id, `${msg.from.first_name} устанавливал таймер на ${int} ${numberCases}. Время вышло! ДЕЛАЙ ЧТО ДОЛЖЕН!!!!`);
                bot.sendPhoto(msg.chat.id, fs.readFileSync(__dirname + "/adv.jpg"));
            }
        }, 1000);
    })();
    bot.sendMessage(chatId, txt);
})
// ===ТАЙМЕР КОНЕЦ===

// bot.onText(/\/game/, msg => {
//     const {
//         id
//     } = msg.chat
//     bot.sendMessage(id, "Те кто хочет участвовать пишем '/ya' ")
//     bot.onText(/\/ya/, data => {

//             bot.sendMessage(data.from.id, '♣10️♥️♦️♠️');

//     })
// })


console.log("THE BOT-SERVER IS RUNNING!");








// bot.onText(/^[/!#]del$/, async function (msg) {
//     const arrayOfMessages = [msgID1, msgID2, msgID3, /* ... msgIDN */];
//     for (let i in arrayOfMessages) {
//         await bot.deleteMessage(msg.chat.id, arrayOfMessages[i]);
//     }
// });