import React, {Component} from 'react';

class AreaAvisos extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      fechado: false
    }

    this.mostraAviso = this.mostraAviso.bind(this);
    this.fechaAviso = this.fechaAviso.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // sempre abre o componente quando há novos avisos
    if(nextProps.aviso !== '') {
      this.setState({
        fechado: false
      })
    }
  }

  fechaAviso() {
    this.setState({
      fechado: true
    })
  }

  mostraAviso() {
    const aviso = this.props.aviso;
    if(aviso && !this.state.fechado) {
      return (
        <div>
          <div className="alert">
          <span className="closebtn" onClick={this.fechaAviso}>&times;</span> 
            {aviso}
          </div>
        </div>
      )
    } else {
      return(<div></div>)
    }
  }

  render() {
    const aviso = this.mostraAviso();
    return(
      <div className="aviso">{aviso}</div>
    )
  }
}

export default AreaAvisos;