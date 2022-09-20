import { config } from  'dotenv';

config();

export default {
    port: process.env.PORT || 4001,
    front_url: process.env.FRONT_END_URL,
    host: process.env.HOST,
    user: process.env.USER,
    db_port: process.env.DB_PORT,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}