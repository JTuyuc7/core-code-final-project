const { Client } = require('pg');
const config = require('../settings');

const { host, user_db, db_port, password, database } = config;

const dbSettings = {
    host: host,
    user: user_db,
    port: db_port,
    password: password,
    database: database
}
const connectDB = async () => {
    try {
        const client = new Client(dbSettings);
        //console.log(client, 'cliente')
        await client.connect()
        return client;
    } catch (error) {
        console.log(error, 'Unable to connect to DB')
    }
}

module.exports = connectDB;