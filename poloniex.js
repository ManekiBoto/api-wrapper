import axios from 'axios';
// import crypto from 'crypto';

require('dotenv').config();

// const { POLONIEX_KEY, POLONIEX_SECRET } = process.env;

const PUBLIC_API_URL = 'https://poloniex.com/public';
// const PRIVATE_API_URL = 'https://poloniex.com/tradingApi';

/**
* This is a helper function to encrypt headers sent out in the request.
*
* @param {Object} parameters - All the parameters needed for a request.
* @returns {Object} - The private headers.
*/
// const getPrivateHeaders = parameters => {
//   if (!POLONIEX_KEY | !POLONIEX_SECRET) {
//     throw new Error('API key and secret are undefined.');
//   }
//   const paramString = Object.keys(parameters)
//     .map(
//       parameter =>
//         `${encodeURIComponent(parameter)}=${encodeURIComponent(
//           parameters[parameter]
//         )}`
//     )
//     .join('&');
//   const signature = crypto
//     .creatHmac('sha512', POLONIEX_SECRET)
//     .update(paramString)
//     .digest('hex');
//
//   return {
//     Key: POLONIEX_KEY,
//     Sign: signature
//   };
// };

/**
* This retrieves open book data from Poloniex.
*
* @param {string} currencyPair - The currency pair that you want to look at (e.g., BTC_ETH). Alternatively, put all to see   the open book for all currencies.
* @returns {Promise} - A Promise which contains the contents of the reponse.
*/
const getOpenBook = currencyPair => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: PUBLIC_API_URL,
      params: {
        command: 'returnOrderBook',
        currencyPair: currencyPair
      }
    }).then(({ data : {asks, bids}, error }) => {
      if (error) {
        reject(error);
      }
      resolve({
        asks,
        bids
      });
    });
  });
};

export default {
  getOpenBook
};
