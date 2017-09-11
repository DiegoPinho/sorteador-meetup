import React, {Component} from 'react';
import Promise from 'es6-promise';

const request = require('superagent-promise')(require('superagent'), Promise);

class BarraSorteio extends Component {

    sortear() {
        const url = 'https://www.meetup.com/pt-BR/preview/Javascript-SP/events/243086802/attendees'; // TODO
        request.post('/api/sortear')
        .send({url})
        .accept('application/json')
        .then(data => { console.log(data)})
        .catch(erro => { console.log(erro)})
    }
    
    render() {
        return (
            <div>
                <input type="text" name="url" />
                <button type="button" onClick={this.sortear}>sortear</button>
            </div>
        )
    }

}

export default BarraSorteio;