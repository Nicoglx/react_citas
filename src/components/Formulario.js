import React, { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


export default function Formulario({crearCita}) {

    //Crear State de Citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    const [ error, actualizarError] = useState(false)

    //Funcion que se ejecuta al escribir en los campos

    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    //Extraer los valores
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    //Al enviar el form

    const submitCita = e => {
        e.preventDefault();

        //Validacion

        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true);
            return;
        }

        //Eliminar el msj de error

        actualizarError(false);

        //Asignar un id

        cita.id = uuidv4();

        //Crear la cita

        crearCita(cita)

        //Reiniciar el form

        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''

        })


    }

    return (
        <Fragment>
            <h2>Crear cita</h2>

            {error ? <p className='alerta-error'>Todos los campos son obligatorios </p> : null}

            <form
                onSubmit={submitCita}
            >
                <label>Nombre de mascota</label>
                <input
                    type='text'
                    name='mascota'
                    className='u-full-width'
                    placeholder='Nombre de la mascota'
                    onChange={actualizarState}
                    value={mascota}
                />

                <label>Nombre del dueno</label>
                <input
                    type='text'
                    name='propietario'
                    className='u-full-width'
                    placeholder='Nombre del dueno de la mascota'
                    onChange={actualizarState}
                    value={propietario}

                />

                <label>Fecha</label>
                <input
                    type='date'
                    name='fecha'
                    className='u-full-width'
                    onChange={actualizarState}
                    value={fecha}

                />

                <label>Hora</label>
                <input
                    type='time'
                    name='hora'
                    className='u-full-width'
                    onChange={actualizarState}
                    value={hora}
                />

                <label>Sintomas</label>
                <textarea
                    className='u-full-width'
                    name='sintomas'
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>

                <button
                    type='submit'
                    className='u-full-width button-primary'
                >Agregar cita</button>
            </form>

        </Fragment>

    )
}
