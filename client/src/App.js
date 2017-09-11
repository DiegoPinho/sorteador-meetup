import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import BarraSorteio from './BarraSorteio';

class App extends Component {
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
        
        <BarraSorteio />

      </div>
    );
  }
}

export default App;
