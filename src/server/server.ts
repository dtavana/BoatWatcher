import bodyParser from 'body-parser';
import express from 'express';
import {readFileSync} from 'fs';
import {safeLoad} from 'js-yaml';
import {BoatWatcherClient} from '../bot/structures/client';
import {IBoatWatcherBackendConfig} from './interfaces';
import routes from './routes';

export default (client: BoatWatcherClient) => {
    const config: IBoatWatcherBackendConfig = safeLoad(readFileSync('server.yml', 'utf8'));
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true,
    }));
    app.use(routes);
    app.locals.client = client;
    app.locals.config = config;
    app.locals.db = client.pg.db;
    app.locals.loggers = client.loggers;
    app.listen(
        config.PORT,
        () => app.locals.loggers.sendLog(`BoatWatcher backend now listening on port ${config.PORT}`, 'console'),
    );
};
