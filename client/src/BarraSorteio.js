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
        const devolveErro = this.props.erro; // para facilitar

        const url = this.state.input;
        const validacao = this.validaEntrada(url);
        if(validacao.valido) {
            this.props.status(); // diz ao app que agora está sorteando
            request.post('/api/sortear')
                .send({url})
                .accept('application/json')
                .then(getJson).then(data => {
                    if(data){
                        this.props.callback(data);
                    } else {
                        devolveErro('Não conseguimos encontrar ninguém... verifique se a URL está correta')
                    }
                })
                .catch(erro => { devolveErro(erro)})
        } else {
            devolveErro(validacao.motivo);
        }

    }

    // TODO: passar a validação para o backend!
    validaEntrada(entrada) {
        // exemplo: https://www.meetup.com/pt-BR/preview/Javascript-SP/events/243086802/attendees
        if(entrada.length > 0) {
            // const pedacos = entrada.split('/');
            // const tamanho = pedacos.length;
            if(entrada.includes('events') && entrada.includes('attendees')) {
               return {valido: true} 
            } 

            return {valido: false, motivo: 'Essa URL não parece correta...'}
        } else {
            return {valido: false, motivo: 'Insira a URL do Meetup para o sorteio!'}
        }

    }
    
    render() {
        return (
            <div>
                <div>
                    <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Insira a URL do Meetup" />
                    <p className="tip"><strong>Exemplo:</strong> https://www.meetup.com/pt-BR/preview/Javascript-SP/events/243086802/attendees</p>
                </div>
                <div><button className="button" type="button" onClick={this.sortear}>Sortear!</button></div>
            </div>
        )
    }

}

export default BarraSorteio;