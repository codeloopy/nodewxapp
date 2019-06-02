const request = require('request');

const geocode = ((address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiY29kZWxvb3B5IiwiYSI6ImNqdnp6dml6ZzA1eDIzenFrOWJ4Z3RvZ2IifQ.1xPzjdJ4ESZyAWNjHIqwIQ&limit=1`;

  request({url, json: true}, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services', undefined);
    } else if (body.features.length === 0){
      callback('Unable to find location. Try another search',undefined);
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        long: body.features[0].center[0],
        city: body.features[0].place_name
      });
    }
  });
});

module.exports = geocode;