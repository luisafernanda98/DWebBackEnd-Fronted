import React from 'react';
import logo from './logo.svg';
import './App.css';
import  axios  from  "axios" ;
import  "bootstrap/dist/css/bootstrap.min.css" ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Component } from 'react';

const url="https://localhost:8089/api/empleados";
const urlp="https://localhost:8089/api/puestos";



class App extends Component{



  state={
    puestos:[],
    data:[],
    modalInsertar: false,
    modalEliminar: false,
    form:{
      id: '',
      codigo: '',
      nombres: '',
      apellidos: '',
      direccion: '',
      telefono: '',
      fn: '',
      puesto: '',
      tipoModal: ''
    }

  }

  peticionPuestos=()=>{
    axios.get(urlp).then(response=>{
      console.log(response.data);
        this.setState({puestos: response.data});
      })
      }

  peticionGet=()=>{
    axios.get(url).then(response=>{
    console.log(response.data);
      this.setState({data: response.data});
    })
    }


  peticionPost=async()=>{
      delete this.state.form.id;
      const empp ={
      "codigo":this.state.form.codigo,
      "nombres":this.state.form.nombres,
      "apellidos":this.state.form.apellidos,
      "direccion":this.state.form.direccion,
      "telefono":this.state.form.telefono,
      "fecha_nacimiento":this.state.form.fn,
      "id_puesto":this.state.form.puesto};
     await axios.post(url,empp).then(response=>{
        this.modalInsertar();
        this.peticionGet();
      }).catch(error=>{
        console.log(error.message);
      })
    }

    peticionPut=()=>{
      delete this.state.form.tipoModal;
      const emp ={"id_empleado":this.state.form.id,
      "codigo":this.state.form.codigo,
      "nombres":this.state.form.nombres,
      "apellidos":this.state.form.apellidos,
      "direccion":this.state.form.direccion,
      "telefono":this.state.form.telefono,
      "fecha_nacimiento":this.state.form.fn,
      "id_puesto":this.state.form.puesto};
      axios.put(url,emp).then(response=>{
        this.modalInsertar();
        this.peticionGet();
      })
    }

    peticionDelete=()=>{
      axios.delete(url+'/'+this.state.form.id).then(response=>{
        this.setState({modalEliminar: false});
        this.peticionGet();
      })
    }

modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar});
}

seleccionarEmpleado=(empleado)=>{

  this.setState({
    tipoModal: 'actualizar',
    form:{
      id: empleado.id_empleado,
      codigo: empleado.codigo,
      nombres: empleado.nombres,
      apellidos: empleado.apellidos,
      direccion: empleado.direccion,
      telefono: empleado.telefono,
      fn: empleado.fecha_nacimiento,
      puesto: empleado.id_puesto 
     
    }
  })
}

handleChange= async e=>{
  e.persist();
  await this.setState({
    form:{
      ...this.state.form,
      [e.target.name]: e.target.value
    }
  });
  console.log(this.state.form);
}

  componentDidMount() {
    this.peticionGet();
    this.peticionPuestos();
  }
  

  render(){
    const {form}=this.state;
  return (
    <div className="App">
    <br/>
    <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Empleado</button>
    <br/><br/>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Codigo</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Direccion</th>
            <th>Telefono</th>
            <th>Fecha Nacimiento</th>
            <th>Puesto</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map(empleado=>{
            var fecha = empleado.fecha_nacimiento.substr(0,10);
            empleado.fecha_nacimiento=fecha;
            return(
              <tr>
                <td key={empleado.id_empleado}>{empleado.id_empleado}</td>
                <td>{empleado.codigo}</td>
                <td>{empleado.nombres}</td>
                <td>{empleado.apellidos}</td>
                <td>{empleado.direccion}</td>
                <td>{empleado.telefono}</td>
                <td>{empleado.fecha_nacimiento}</td>
                  <td>{empleado.id_puesto}</td>
                <td>
                  <button className="btn btn-primary" onClick={()=>{this.seleccionarEmpleado(empleado);this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                  {"   "}
                  <button className="btn btn-danger" onClick={()=>{this.seleccionarEmpleado(empleado); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Modal fade={false} isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <input className="form-control" type="number" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id: ''} />
                    <br />
                    <label htmlFor="nombre">Codigo</label>
                    <input className="form-control" type="text" name="codigo" id="codigo" onChange={this.handleChange} value={form?form.codigo: ''}/>
                    <br />
                    <label htmlFor="nombre">Nombres</label>
                    <input className="form-control" type="text" name="nombres" id="nombres" onChange={this.handleChange} value={form?form.nombres: ''}/>
                    <br />
                    <label htmlFor="nombre">Apellidos</label>
                    <input className="form-control" type="text" name="apellidos" id="apellidos" onChange={this.handleChange} value={form?form.apellidos: ''}/>
                    <br />
                    <label htmlFor="nombre">Direccion</label>
                    <input className="form-control" type="text" name="direccion" id="direccion" onChange={this.handleChange} value={form?form.direccion: ''}/>
                    <br />
                    <label htmlFor="nombre">Telefono</label>
                    <input className="form-control" type="number" name="telefono" id="telefono" onChange={this.handleChange} value={form?form.telefono: ''}/>
                    <br />
                    <label htmlFor="nombre">Fecha</label>
                    <input className="form-control" type="date" name="fn" id="fn" onChange={this.handleChange} value={form?form.fn: ''}/>
                    <br />
                    <label htmlFor="nombre">Puesto</label>
                    <select class="form-control" name="puesto" id="puesto" onChange={this.handleChange} value={form?form.puesto: ''}>
                    <option value="0">---- Puesto ----</option>
                    {this.state.puestos.map(puestos=>{
                      return(
                        <option value={puestos.id_puesto}>{puestos.puesto}</option>
                      )
                    })}
                    </select>
                  </div>
                </ModalBody>

                <ModalFooter>
                {this.state.tipoModal=='insertar'?
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                    Insertar
                  </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                    Actualizar
                  </button>
                  }                
                  <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
          </Modal>


          <Modal fade={false} isOpen={this.state.modalEliminar}>
            <ModalBody>
               Estás seguro que deseas eliminar al Empleado: {form && form.nombres}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>

    </div>
  );
}
}

export default App;