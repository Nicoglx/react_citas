import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario'
import Cita from './components/Cita'


function App() {

    //Citas en local storage

    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if(!citasIniciales){
      citasIniciales = [];
    }

    //Arreglo de todas las citas

    const [citas, guardarCitas] = useState(citasIniciales);

    //Funcion que toma cita actual y agrega la nueva

    useEffect( () => {
      if(citasIniciales){
        localStorage.setItem('citas', JSON.stringify(citas))
      } else {
        localStorage.setItem('citas', JSON.stringify([]));
      }
    }, [citas, citasIniciales])

    const crearCita = cita => {
      guardarCitas([
        ...citas,
        cita
      ]);
    }

    //Eliminar cita por id

    const eliminarCita = id => {
      const nuevasCitas = citas.filter(cita => cita.id !== id);
      guardarCitas(nuevasCitas)
    }

    const titulo = citas.length === 0? 'No tienes citas' : 'Administra tus citas'

  return (
   <Fragment>
      <h1>Administrador de pacientes</h1>
    <div className="container">
    <div className="row">
      <div className="one-half column">
      <Formulario
        crearCita = {crearCita}
      /> 
      </div>
      <div className="one-half column">
      <h2>{titulo}</h2>
      {citas.map(cita => (
        <Cita
          cita={cita}
          key={cita.id}
          eliminarCita={eliminarCita}
        />
      ))}
      </div>
    </div>
    </div>
   </Fragment>
  );
}

export default App;
