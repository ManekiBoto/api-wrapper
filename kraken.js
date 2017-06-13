import axios from 'axios';

const PUBLIC_API_URL = 'https://api.kraken.com/0/public';

/**
* This retrieves open book data from Kraken.
*
* @param {string} currencyPair - The currency pair that you want to look at.
* @returns {Promise} - A Promise which contains the contents of the response.
*/
const getOpenBook = currencyPair => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `${PUBLIC_API_URL}/Depth`,
      params: {
        pair: currencyPair
      }
    }).then(
      ({ data: { error, result: { [currencyPair]: { asks, bids } } } }) => {
        if (error.length > 0) {
          reject(error);
        } else {
          resolve({
            asks: asks.map(ask => ask.slice(0, 2)),
            bids: bids.map(bid => bid.slice(0, 2))
          });
        }
      }
    );
  });
};

export default {
  getOpenBook
};
