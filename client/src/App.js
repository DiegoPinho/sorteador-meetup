import React, { Component } from 'react';
import logo from './logo.png';

import AreaAvisos from './AreaAvisos';
import BarraSorteio from './BarraSorteio';
import AreaSorteado from './AreaSorteado';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      aviso: '',
      sorteando: false,
      sorteado: null
    }

    this.atualizarSorteado = this.atualizarSorteado.bind(this);
    this.toogleStatus = this.toogleStatus.bind(this);
    this.mostrarAviso = this.mostrarAviso.bind(this);
  }

  atualizarSorteado(sorteado) {
    this.setState({
      sorteado: JSON.parse(sorteado),
      sorteando: false 
    })
  }

  toogleStatus() {
    this.setState({
      aviso: '',
      sorteando: true
    })
  }

  mostrarAviso(aviso) {
    this.setState({aviso});
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
        
        <AreaAvisos aviso={this.state.aviso} />
        <BarraSorteio callback={this.atualizarSorteado} status={this.toogleStatus}  erro={this.mostrarAviso} />
        <AreaSorteado sorteado={this.state.sorteado} sorteando={this.state.sorteando} />

      </div>
    );
  }
}

export default App;
