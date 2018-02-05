const bot = require('../../config/config');
const newDeck = require('../../utils/deck')();

let deck = [...newDeck];
let tempDeck = [];
let obj = {};
let final = {};
let players = 0;
let counter = 0;

const game = () => {
    bot.onText(/\/game/, msg => {
        const {
            id
        } = msg.chat;
        bot.sendMessage(id, "ПРАВИЛА ИГРЫ: Bot сдает карты. Стоимость карт в очках: туз - 11 очков; король - 4 очка; дама - 3 очка; валет - 2 очка; остальные карты по своему номиналу.", {
            "reply_markup": {
                "keyboard": [
                    ["Я в деле", "Еще карту", "С меня хватит"]
                ]
            }
        })
        setTimeout(() => {
            bot.deleteMessage(msg.chat.id, msg.message_id);
        }, 10000);
    })
    bot.onText(/я в деле/i, data => {
        counter++;
        obj[data.from.first_name] = [];
        setTimeout(() => {
            bot.deleteMessage(data.chat.id, data.message_id);
        }, 10000);
    })
    bot.onText(/Еще карту/i, data => {
        function get_random_card(cards) {
            let card = cards.splice(Math.ceil(Math.random() * cards.length - 1), 1);

            tempDeck.push(card);
            deck = deck.filter(x => !tempDeck.includes(x));
            obj[data.from.first_name].push(card[0]);

            let arr = [...obj[data.from.first_name]];
            let hand = arr.reduce((prev, curent) => {
                let txt = `${curent.card} ${curent.suits} `
                return prev + txt;
            }, '');
            let value = 0;
            let checkScore = arr.map(item => {
                value += item.value
            });
            bot.sendMessage(data.from.id, `${hand} === ${value}`);
            if (value > 21) {
                bot.sendMessage(data.from.id, 'ПЕРЕБОР ЧУВАК!!!');
            }
            setTimeout(() => {
                bot.deleteMessage(data.chat.id, data.message_id);
            }, 10000);
        }
        get_random_card(deck);

    })
    bot.onText(/С меня хватит/i, data => {
        let arr = [...obj[data.from.first_name]];
        let value = 0;
        arr.map(item => {
            value += item.value;
        });
        console.log(value);
        final[data.from.first_name] = value;
        players++;
        bot.sendMessage(data.from.id, `${value}`);

        if (counter == players) {
            for (var item in final) {
                bot.sendMessage(data.chat.id, `${item}: ${final[item]}`);
            }
            deck = [...newDeck];
            tempDeck = [];
            obj = {};
            players = 0;
            counter = 0;
        }
        setTimeout(() => {
            bot.deleteMessage(data.chat.id, data.message_id);
        }, 10000);
    })
}

module.exports = game;
