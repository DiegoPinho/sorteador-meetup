import React, {Component} from 'react';
import Rolling from './Rolling.svg';

class AreaSorteado extends Component {
    
    constructor(props) {
        super(props);

        this.showSorteado = this.showSorteado.bind(this);
    }
    
    showSorteado() {
        if(this.props.sorteando) {
            return (
                <div>
                    <h1>Sorteando...</h1>
                    <img src={Rolling} alt="loading" />
                </div>
            )
        }

        if(this.props.sorteado) {
            const {nome,avatar} = this.props.sorteado;
            return (
                <div>
                    <h1>O sorteado foi...</h1>
                    <img src={avatar} alt="sorteado" />
                    <h3>{nome}</h3>
                </div>
            )
        } else {
            return (
                <div>
                    <h3>Realize o sorteio!</h3>
                </div>
            )
        }
    }
    
    render() {
        let sorteado = this.showSorteado();
        return (
            <div>{sorteado}</div>
        )
    }

}

export default AreaSorteado;