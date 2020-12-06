import dotenv from 'dotenv';

dotenv.config();

export default {
    SECURITY: {
        whitelist: process.env.WHITE_LIST,
        ddosConfig: {
            limit: process.env.DDOS_CONFIG_LIMIT,
            burst: process.env.DDOS_CONFIG_BURST,
        },
    },
    SERVER: {
        env: process.env.NODE_ENV,
        port: process.env.PORT,
        baseUrl: `${process.env.BASE_URL}:${process.env.PORT}`,
        website: process.env.WEBSITE || 'http://localhost:5000',
        logsConfig: {
            date: true,
            url: true,
            method: true,
            headers: true,
            pathParam: true,
            bodyParam: true,
            queryParam: true,
        },
    },
    DB: {
        DB_USER: process.env.DB_USER || 'postgres',
        DB_USER_SECRET: process.env.DB_USER_SECRET || 'Pass2020!',
        DB_NAME: process.env.DB_NAME || 'color-picker',
        DB_PORT: process.env.DB_PORT || 5432,
        DB_HOST: process.env.DB_HOST || 'localhost',
    },
    GOOGLE: {
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
    },
    SESSION: {
        COOKIE_KEY: process.env.COOKIE_KEY || 'djqsldjqsl8785765@##__',
        COOKIE_DOMAIN: process.env.COOKIE_DOMAIN || '.localhost:5000',
    },
};
