import { Client } from 'pg';
import config from '../settings';

const { host, user, db_port, password, database } = config;

const dbSettings = {
    host: host,
    user: user,
    port: db_port,
    password: password,
    database: database
}
export const connectDB = async () => {
    try {
        const client = new Client(dbSettings);
        //console.log(client, 'cliente')
        await client.connect()
        return client;
    } catch (error) {
        console.log(error, 'Unable to connect to DB')
    }
}