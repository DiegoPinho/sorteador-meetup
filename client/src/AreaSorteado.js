import React, {Component} from 'react';

class AreaSorteado extends Component {
    
    constructor(props) {
        super(props);

        this.showSorteado = this.showSorteado.bind(this);
    }
    
    showSorteado() {
        if(this.props.sorteado) {
            const {nome,avatar} = this.props.sorteado;
            console.log(nome,avatar);
            return (
                <div>
                    <img src={avatar} alt="sorteado" />
                    <h3>Nome: {nome}</h3>
                </div>
            )
        } else {
            return (
                <div>Realize o sorteio!</div>
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