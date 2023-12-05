const Mongoose = require("mongoose");
const debug = require('debug')("app:database");

const dbhost = process.env.DBHOST || "localhost";
const dbport = process.env.DBPORT || "27017";
const dbname = process.env.DBNAME || "api-prueba";

const dburi = process.env.DBURI 
|| `mongodb://${dbhost}:${dbport}/${dbname}`

/* metodo de conexion a la base de datos*/

const connect = async () => {
    try {
        await Mongoose.connect(dburi);
        debug ("conexión a la base de datos iniciada")
    } catch (error) {
        console.error
        debug("cannot connect to database");
        process.exit(1);
    }
}

/*desconectar de la base de datos*/
const disconnect = async () => {
    try {
        await Mongoose.disconnect();
        debug ("conexión a la base de datos finalizada")
    } catch (error) {
        process.exit(1);
    }
}

module.exports = {
    connect,
    disconnect
}