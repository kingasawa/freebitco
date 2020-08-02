const max = 10000
const FreeCoin = {
  getCoin: () => {
    const number = Math.floor(Math.random() * max)
    let coin = 0
    if(number < 9885) {
      coin = 0.00000021
    } else if (number > 9885 && number < 9985) {
      coin = 0.00000215
    } else if (number > 9985 && number < 9993) {
      coin = 0.00002155
    } else if (number > 9993 && number < 9997) {
      coin = 0.00021550
    } else if (number > 9997 && number < 9999) {
      coin = 0.00215499
    } else if (number === 10000) {
      coin = 0.02154987
    }
    console.log('number, coin', {number, coin});
    return {
      number, coin
    }
  },
};

module.exports = FreeCoin;
