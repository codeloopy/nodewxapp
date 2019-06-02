const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup for handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//serves the homepage overiding the one call below
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'The Weather Page',
    name: 'Odie',
    author: 'Pedro'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    pageTitle: 'Help Page',
    title: 'Need Help?',
    date: 2019,
    author: 'Pedro'
  });
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    pageTitle: 'Help Page Not Found',
    title: 'Help Page Doesn\'t Exist',
    error: 'The page you are looking for cannot be found',
    author: 'Pedro'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    info: 'Some information about myself',
    author: 'Pedro'
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: 'Missing location, please submit a city name'
    });
  }

  geocode(address, (error, {lat, long, city} = {}) => {
    if(error){
      return res.send({ error });
    }

    forecast(lat, long, (error, forecastData) => {
      if(error){
        return res.send({ error });
      }

      res.send({
        city,
        forecast: forecastData
        });
    });
  });
});


app.get('/help/*', (req, res) => {
  res.send('Help article not found');
});

app.get('*', (req, res) => {
  res.render('404', {
    pageTitle: '404 Page',
    title: 'OOPS!',
    error: 'Error',
    message: 'The page you are looking for cannot be found'
  });
});

app.listen(port, () => {
  console.log(`serving on ${port}`);
});