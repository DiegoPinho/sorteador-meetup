import React, {Component} from 'react';
import Promise from 'es6-promise';

const request = require('superagent-promise')(require('superagent'), Promise);

const getJson = (res) => {
    return res.body;
};

class BarraSorteio extends Component {

    constructor(props){
        super(props);
        this.state = {
            input: ''
        }

        this.sortear = this.sortear.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
        this.setState({
            input: event.target.value
        })
    }
    
    sortear() {
        this.props.status(); // diz ao app que agora está sorteando
        
        const url = this.state.input;
        request.post('/api/sortear')
            .send({url})
            .accept('application/json')
            .then(getJson).then(data => this.props.callback(data))
            .catch(erro => { console.log(erro)})
    }
    
    render() {
        return (
            <div>
                <div><input type="text" value={this.state.value} onChange={this.handleChange} /></div>
                <div><button className="button" type="button" onClick={this.sortear}>Sortear!</button></div>
            </div>
        )
    }

}

export default BarraSorteio;