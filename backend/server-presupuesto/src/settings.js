import { config } from  'dotenv';

config();

export default {
    port: process.env.PORT || 4001,
    front_url: process.env.FRONT_END_URL,
    host: process.env.HOST,
    user_db: process.env.USER_DB,
    db_port: process.env.DB_PORT,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    email_api_key: process.env.EMAIL_API_KEY,
    secret_key_jwt: process.env.SECRET_KEY_JWT,
}