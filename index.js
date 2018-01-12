const fs = require('fs');

const bot = require('./config/config');
const showNumberCases = require('./src/showNumberCases');


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

bot.onText(/.([0-9])?\w+(\s)?(min|мин)/, msg => {
    // const text = `Fuck you ,${msg.from.first_name}`;
    let parsedText = parseInt(msg.text.slice(1)) * 60;
    let fixedText = parseInt(msg.text.slice(1))
    let numberCases = showNumberCases(fixedText, ['минуту', 'минуты', 'минут']);
    let txt = `Отлично ! ты зарядил таймер на ${parsedText / 60} ${numberCases}!`;


    (() => {
        setInterval( () => {
            parsedText = parsedText - 1;
            if (parsedText === 1) {
                bot.sendMessage(msg.chat.id, `${msg.from.first_name} устанавливал таймер на ${fixedText} ${numberCases}. Время вышло! ДЕЛАЙ ЧТО ДОЛЖЕН!!!!`);
                bot.sendPhoto(msg.chat.id, fs.readFileSync(__dirname + "/adv.jpg"));
            }
        }, 1000);
    })();

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








