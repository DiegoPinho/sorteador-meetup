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

// http://stackoverflow.com/questions/12693947/jquery-ajax-how-to-send-json-instead-of-querystring
// http://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-access-token');

    next();
});

// ROUTES ======================================================================

app.post('/api/sortear', (req, res) => {
    const eventoURL = req.body.url;
    request(eventoURL, function(error, response, html) {
        sortear(error, response, html);
    });

    res.json({sucesso: 'ok'});
});

function sortear(error, response, html) {
    if(error) {
        console.log(error);
    }
    
    const $ = cheerio.load(html);
    console.log($('ul.attendees-list li').each(element => {
        const div = $(element).find('div.attendee-item');
        const avatar = div.html();
        
        
        console.log(avatar + '\n');
    }));
}

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
