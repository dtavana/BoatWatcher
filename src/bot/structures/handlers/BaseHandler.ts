import {BoatWatcherClient} from '../client';

abstract class BaseHandler {
    public client: BoatWatcherClient;
    public handlerName: string;

    protected constructor(client: BoatWatcherClient, handlerName: string) {
        this.client = client;
        this.handlerName = handlerName;
    }
    public abstract run(...args: any[]): Promise<void>;
}

export { BaseHandler };
