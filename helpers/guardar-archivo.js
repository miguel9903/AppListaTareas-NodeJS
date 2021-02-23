const fs = require('fs');
const archivo = './db/data.json';

const guardarDB= (data) => {
    fs.writeFileSync(archivo, JSON.stringify(data));
}

const leerDB = () => {
    if(fs.existsSync(archivo)) {
        const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
        if(info) {
            return JSON.parse(info);
        } else {
            return null;
        }
    } else {
        return null;
    }   
}

module.exports = {
    guardarDB,
    leerDB
};