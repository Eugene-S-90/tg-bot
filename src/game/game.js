const bot = require('../../config/config');



let deck = [{
        id: 1,
        card: "6",
        value: 6,
        suits: "tambourine"

    },
    {
        id: 2,
        card: "6",
        value: 6,
        suits: "cross"
    },
    {
        id: 3,
        card: "6",
        value: 6,
        suits: "heart"
    },

    {
        id: 4,
        card: "6",
        value: 6,
        suits: "peak"
    },
    {
        id: 5,
        card: "7",
        value: 7,
        suits: "tambourine"
    },
    {
        id: 6,
        card: "7",
        value: 7,
        suits: "cross"
    },
    {
        id: 7,
        card: "7",
        value: 7,
        suits: "heart"
    },

    {
        id: 8,
        card: "7",
        value: 7,
        suits: "peak"
    },
];
let tempDeck = [];
let score;
let obj = {};

const game = () => {
    bot.onText(/\/game/, msg => {
        const {
            id
        } = msg.chat
        bot.sendMessage(id, "Те кто хочет участвовать пишем '/ya' ")
        bot.onText(/\/ya/, data => {

            obj[data.from.first_name] = [];

            bot.onText(/\/karty/, data => {
                function get_random_card(cards) {
                    let card = cards.splice(Math.ceil(Math.random() * cards.length - 1), 1);
                    tempDeck.push(card);
                    let difference = deck.filter(x => !tempDeck.includes(x));
                    deck = difference;
                    obj[data.from.first_name].push(card);
                    console.log('obj----->', obj);
                    console.log('card----->', card);
                    console.log('diff---->', tempDeck, 'temp--->', deck);
                }
                get_random_card(deck);

                bot.onText(/\/hvatit/, data => {
                    let arr = obj[data.from.first_name];
                    console.log('arrrrrr', arr);
                    arr.map(item => {
                        let value =+ item.value;
                        score = value;              
                    })
                    
                })
            })

            // bot.sendMessage(data.from.id, JSON.stringify(get_random_card(deck)));
        })
    })
}
// console.log('deck--->',deck, 'temp--->', tempDeck);
module.exports = game;



// player1.push(get_random_card(realCardsArray));