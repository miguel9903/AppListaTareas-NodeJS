const Tarea = require('./tarea');
const colors = require('colors');

/**
 * _listado:
 * { 'uuid-17373-17722-2': { id: 12, descripcion: 'desc...', completadoEn: '19191' } }
 */

class Tareas {

    _listado = {};

    constructor() {
        this._listado = {};
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    listadoCompleto() {
        let listado = '';
        this.listadoArr.forEach((tarea, index) => {
            const idx = `${ index + 1 }`.green;
            listado += `${ idx } :: ${ tarea.descripcion } | ${ tarea.completadoEn ? 'Completada'.green : 'Pendiente'.red } \n`;
        });
        console.log(listado);
    }

    listarPendientesCompletadas(compladas = true) {
        let listado = '';
        let arrayTareas = [];
        if(compladas) {
            arrayTareas = this.listadoArr.filter(tarea => tarea.completadoEn !== null);
        } else {
            arrayTareas = this.listadoArr.filter(tarea => tarea.completadoEn === null);
        }
        arrayTareas.forEach((tarea, index) => {
            const idx = `${ index + 1 }`.green;
            listado += `${ (idx + '.').green } ${ tarea.descripcion } :: ${ tarea.completadoEn ? `${ tarea.completadoEn }`.green : 'Pendiente'.red } \n`;
        });
        console.log(listado);
    }

    borrarTarea(id = '') {
        if(this._listado[id]) {
            delete this._listado[id];
        }
    }

    completarTareas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;