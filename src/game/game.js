const bot = require('../../config/config');
const newDeck = require('../../utils/deck')();

let deck = [...newDeck];
let tempDeck = [];
let playersStore = {};
let final = {};
let players = 0;
let counter = 0;

const game = () => {
    bot.onText(/\/game/, msg => {
        const {
            id
        } = msg.chat;
        bot.sendMessage(id, `ПРАВИЛА ИГРЫ: Bot сдает карты. Стоимость карт в очках:
        Туз - 11 очков;
        Король - 4 очка;
        Дама - 3 очка;
        Валет - 2 очка;
        Остальные карты по своему номиналу.`, {
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
        playersStore[data.from.first_name] = [];
        setTimeout(() => {
            bot.deleteMessage(data.chat.id, data.message_id);
        }, 10000);
    })
    bot.onText(/Еще карту/i, data => {
        function getRandomCard(cards) {
            let card = cards.splice(Math.ceil(Math.random() * cards.length - 1), 1);

            tempDeck.push(card);
            deck = deck.filter(x => !tempDeck.includes(x));
            playersStore[data.from.first_name].push(card[0]);

            let playerCards = [...playersStore[data.from.first_name]];
            let hand = playerCards.reduce((prev, curent) => {
                let txt = `${curent.card} ${curent.suits} `
                return prev + txt;
            }, '');
            let value = 0;
            let checkScore = playerCards.map(item => {
                value += item.value
            });
            bot.sendMessage(data.from.id, `${hand} === ${value}`);

            if (value > 21) {
                if(value == 22 && playerCards[0].card == playerCards[1].card) {
                    bot.sendMessage(data.from.id, '2 туза');
                } else {
                    bot.sendMessage(data.from.id, 'ПЕРЕБОР ЧУВАК!!!');
                }
            }
            
            setTimeout(() => {
                bot.deleteMessage(data.chat.id, data.message_id);
            }, 10000);
        }
        getRandomCard(deck);

    })
    bot.onText(/С меня хватит/i, data => {
        let playerCards = [...playersStore[data.from.first_name]];
        let value = 0;
        playerCards.map(item => {
            value += item.value;
        });
        final[data.from.first_name] = value;
        players++;
        bot.sendMessage(data.from.id, `${value}`);

        if (counter == players) {
            for (let item in final) {
                bot.sendMessage(data.chat.id, `${item}: ${final[item]}`);
            }
            deck = [...newDeck];
            tempDeck = [];
            playersStore = {};
            players = 0;
            counter = 0;
        }
        setTimeout(() => {
            bot.deleteMessage(data.chat.id, data.message_id);
        }, 10000);
    })
}

module.exports = game;
