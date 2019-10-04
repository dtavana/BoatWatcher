import pgPromise from 'pg-promise';
import { BoatWatcherClient, IBoatWatcherClientConfig } from '../structures';

class PostgresManager {
    private _db: any;
    private _client: BoatWatcherClient;
    private _config: IBoatWatcherClientConfig;
    constructor(client: BoatWatcherClient) {
        this._client = client;
        this._config = this._client.config;
        const pgp = pgPromise();
        this._db = pgp(this._config.PG_CONNECTION);
        this._client.loggers.sendLog('Postgres DB Connected', 'console', 'database');
    }
    public async init(): Promise<void> {
        // Initalize tables here
        this._client.loggers.sendLog('Postgres Tables initialized', 'console', 'database');
    }

}

export { PostgresManager };
