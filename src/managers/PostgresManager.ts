import pgPromise from 'pg-promise';
import { BoatWatcherClient, IBoatWatcherClientConfig } from '../structures';

class PostgresManager {
    public db: any;
    private _client: BoatWatcherClient;
    private _config: IBoatWatcherClientConfig;
    constructor(client: BoatWatcherClient) {
        this._client = client;
        this._config = this._client.config;
        const pgp = pgPromise();
        this.db = pgp(this._config.PG_CONNECTION);
        this._client.loggers.sendLog('Postgres DB Connected', 'console', 'database');
        this.init().then();
    }
    public async init(): Promise<void> {
        // Initalize tables here
        await this.db.none('CREATE TABLE IF NOT EXISTS declinelogs (botid varchar, moderator varchar, reason varchar, recorded TIMESTAMP DEFAULT NOW());')
        this._client.loggers.sendLog('Postgres Tables initialized', 'console', 'database');
    }

}

export { PostgresManager };
