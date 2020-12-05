import config from './config';
import server from './server';

require('./database');

server.listen(config.SERVER.port, () => {
    console.info(`Server started on port ${config.SERVER.port} (${config.SERVER.env})`);
});

export default server;
