const max = 10000
const FreeCoin = {
  getCoin: () => {
    const number = Math.floor(Math.random() * max)
    let coin = 0
    if(number < 9885) {
      coin = 17
    } else if (number > 9885 && number < 9985) {
      coin = 172
    } else if (number > 9985 && number < 9993) {
      coin = 1716
    } else if (number > 9993 && number < 9997) {
      coin = 17162
    } else if (number > 9997 && number < 9999) {
      coin = 171618
    } else if (number === 10000) {
      coin = 1716175
    }
    console.log('number, coin', {number, coin});
    return {
      number, coin
    }
  },
};

module.exports = FreeCoin;
