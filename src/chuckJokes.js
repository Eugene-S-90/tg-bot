const fetch = require('node-fetch')

const getChuckJokes = () => {
  let result = "test";
  fetch('http://api.icndb.com/jokes/random/1')
  .then(response => {
    response.json()
    .then( data => {
      console.log(data.value[0].joke)
      result =  data.value[0].joke; 
    })
    return result;
  })
 return result;
};
module.exports = getChuckJokes;

