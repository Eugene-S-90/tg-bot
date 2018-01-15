const fetch = require('node-fetch')
const bot = require('../config/config');

const getChuckJokes =  async function (msg){
  let fin ="wazzap" ;
  let response = await fetch('http://api.icndb.com/jokes/random/1')
  if (response.status == 200) {
      let data = await response.json(); // (3)
      fin = data.value[0].joke;
      bot.sendMessage(msg.chat.id, fin);
    }
    throw new Error(response.status);
} 
module.exports = getChuckJokes;

