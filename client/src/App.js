import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import BarraSorteio from './BarraSorteio';
import AreaSorteado from './AreaSorteado';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      sorteado: null
    }

    this.atualizarSorteado = this.atualizarSorteado.bind(this);
  }

  atualizarSorteado(sorteado) {
    console.log('sorteado', sorteado);
    this.setState({
      sorteado: JSON.parse(sorteado)
    })
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Sorteador para Meetups</h2>
        </div>
        <p className="App-intro">
          Instruções: Para realizar o sorteio, coloque a url do meetup onde estão os participantes.
        </p>
        
        <BarraSorteio callback={this.atualizarSorteado} />
        <AreaSorteado sorteado={this.state.sorteado} />

      </div>
    );
  }
}

export default App;
