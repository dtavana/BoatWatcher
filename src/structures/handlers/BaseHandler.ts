import {EventEmitter} from 'events';
import {BoatWatcherClient} from '../client';

abstract class BaseHandler extends EventEmitter {
    public client: BoatWatcherClient;
    public handlerName: string;

    protected constructor(client: BoatWatcherClient, handlerName: string) {
        super();
        this.client = client;
        this.handlerName = handlerName;
        this.addListener(handlerName, async (...data) => {
            this.client.loggers.sendLog(`Received ${handlerName} handle event`, 'console');
            this.run(...data).then();
            this.client.loggers.sendLog(`Ran ${handlerName} handler`, 'console');
        });
    }
    public abstract run(...args: any[]): Promise<void>;
}

export { BaseHandler };
