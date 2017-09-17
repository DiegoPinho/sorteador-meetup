const bodyParser = require('body-parser');
const cheerio = require('cheerio');
const express = require('express');
const request = require('request');
const url = require('url');

const app = express();
app.set('port', (process.env.PORT || 3001));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-access-token');

    next();
});

app.post('/api/sortear', (req, res) => {
    const eventoURL = req.body.url;
    request(eventoURL, function(error, response, html) {
        const sorteado = sortear(error, response, html);
        res.json(sorteado);
    });
});

function sortear(error, response, html) {
    if(error) {
        console.log(error);
    }
    
    let participantes = [];
    
    const $ = cheerio.load(html);
    $('ul.attendees-list li.attendee-item').each((i, element) => {
        const cheerioElement = $(element);
        const avatar = cheerioElement.find('.avatar');
        const avatarPathRaw = avatar.attr('style');
        const avatarImage = avatarPathRaw.substring(avatarPathRaw.indexOf('(') + 1, avatarPathRaw.indexOf(')'));
        const avatarName = avatar.text();
        
        participantes.push({'nome': avatarName, 'avatar': avatarImage});
    });

    const numParticipantes = participantes.length;
    const sorteado = getRandomInt(0, numParticipantes);

    return JSON.stringify(participantes[sorteado]);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

app.listen(app.get('port'), () => {
    console.log(`Servidor disponível em: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
