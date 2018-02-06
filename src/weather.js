const fetch = require('node-fetch')
const bot = require('../config/config');
const constants = require('../config/const');


const weatherKey = constants.weatherKey;

const getWeather =  async function (msg){
  let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=Dnipro,ua&units=metric&APPID=${weatherKey}`);
  if (response.status == 200) {
      let data = await response.json();
      let iconId = data.weather[0].icon;
      let icon = await fetch(`http://openweathermap.org/img/w/${iconId}.png`);
      let main = data.weather[0].main;
      temp = data.main.temp;
      bot.sendPhoto(msg.chat.id, `${icon.url}`);
      bot.sendMessage(msg.chat.id, `Сегодня в Днепре ${main} и температура за бортом ${temp}`);
    }
} 
module.exports = getWeather;

