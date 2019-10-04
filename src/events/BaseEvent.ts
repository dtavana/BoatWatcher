import { BoatWatcherClient } from '../structures';

class BaseEvent {
    private _name: string;
    private _client: BoatWatcherClient;
    private _func: (args: any[]) => any;
    constructor(client: BoatWatcherClient, name: string, func: (...args: any[]) => any) {
        this._name = name;
        client.loggers.sendLog(`Setting up ${this._name} event`, 'console');
        this._client = client;
        this._func = func;
        this._client.on(this._name, this._func);
        client.loggers.sendLog(`Done setting up ${this._name} event`, 'console');
    }
}

export { BaseEvent };
