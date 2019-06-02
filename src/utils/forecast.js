const request = require('request');

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/b7233c4c9d9d864e75a5e2246e110099/${lat},${long}`;

  request({url, json: true}, (error, { body }) => {
    if(error) {
      callback('Unable to connect to WX service', undefined);
    } else if (body.error) {
      callback('Unable to get location', undefined);
    } else {
      callback(undefined, `
    It is currently ${body.currently.temperature}F,
    wind speed: ${body.currently.windSpeed}kts
    with gusts of ${body.currently.windGust}kts`);
    }
    
  });
};

module.exports = forecast;