const randomLox = (loxArray) => {
    let rand = Math.floor(Math.random() * loxArray.length);
    return loxArray[rand];
};

module.exports = randomLox;

