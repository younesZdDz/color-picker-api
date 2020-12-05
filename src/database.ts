import { Sequelize } from 'sequelize';
import config from './config';

const dialect = 'postgres';
const connect: () => Sequelize = () => {
    const sequelize = new Sequelize(config.DB.DB_NAME, config.DB.DB_USER, config.DB.DB_USER_SECRET, {
        host: config.DB.DB_HOST,
        dialect,
    });
    sequelize
        .authenticate()
        .then(() => {
            console.info(`Successfully conncted to ${dialect}`);
        })
        .catch((err) => {
            console.error(`${dialect} connection error: ${err}`);
            process.exit(-1);
        });

    return sequelize;
};

const sequelize = connect();
sequelize.sync();
export { sequelize };
