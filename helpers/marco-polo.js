'use strict';
let str = '';
let limit = 1000000;
var MarcoPoloHelper = {
  generateSeries: () => {
    let series = [];
    for (let i = 1; i < limit + 1; i++) {
      let d4 = false;
      let d7 = false;
      if (i % 7 == 0)
        d7 = true;
      if (i % 4 == 0)
        d4 = true;
      if (d7 & d4)
        series[i] = 'marcopolo';
      else if (d7)
        series[i] = 'polo';
      else if (d4)
        series[i] = 'marco';
      else
        series[i] = i;
      str = str + series[i] + ',';
      if (i > 1 && i % 1000 == 1)
        str = str + '\n';
    }
    // console.log('Series generated', str);
  },

  getSeries: () => {
    return str;
  }
};

module.exports = MarcoPoloHelper;
