const inquirer = require('inquirer');
const colors = require('colors');
const Tarea = require('../models/tarea');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${ '1.'.green } Crear tarea`
            },
            {
                value: '2',
                name: `${ '2.'.green } Listar tareas`
            },
            {
                value: '3',
                name: `${ '3.'.green } Listar tareas completadas`
            },
            {
                value: '4',
                name: `${ '4.'.green } Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${ '5.'.green } Completar tareas(s)`
            },
            {
                value: '6',
                name: `${ '6.'.green } Eliminar tareas`
            },
            {
                value: '0',
                name: `${ '0.'.green } Salir`
            }
        ]
    }
];

const pausa = async () => {

    const pregunta = {
        type: 'input',
        name: 'enter',
        message: `Presione ${ 'ENTER'.green } para continuar`
    };

    console.log('\n');
    await inquirer.prompt(pregunta);
}

const inquirerMenu = async () => {

    console.clear();

    console.log('============================='.green);
    console.log('    Seleccione una opción    '.green);
    console.log('=============================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}

const leerInput = async (mensaje) => {

    const pregunta = {
        type: 'input',
        name: 'desc',
        message: mensaje,
        validate(value){
            if(value.length == 0) {
                throw 'Por favor ingrese un valor';
            }
            return true;
        }
    };

    const { desc } = await inquirer.prompt(pregunta);
    return desc;

}

const listadoTareasBorrar = async (tareas = []) => {

    const opciones = tareas.map((tarea, index) => {
        const idx = `${ index + 1 }.`.green;
        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.descripcion }`
        }
    }); 
    
    const pregunta = {
        type: 'list',
        name: 'idTarea',
        message: 'Borrar:',
        choices: opciones
    };

    const { idTarea } = await inquirer.prompt(pregunta);
    return idTarea;
}

const mostrarListadoChecklist = async (tareas = []) => {

    const opciones = tareas.map((tarea, index) => {
        const idx = `${ index + 1 }.`.green;
        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.descripcion }`,
            checked: tarea.completadoEn ? true : false 
        }
    }); 
    
    const pregunta = {
        type: 'checkbox',
        name: 'idsTareas',
        message: 'Selecciones:',
        choices: opciones
    };

    const { idsTareas } = await inquirer.prompt(pregunta);
    return idsTareas;
}

const confirmar = async (mensaje) => {

    const pregunta = {
        type: 'confirm',
        name: 'resp',
        message: mensaje
    };

    const { resp } = await inquirer.prompt(pregunta);
    return resp;
}

module.exports = {
    inquirerMenu,
    leerInput,
    pausa,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist 
};