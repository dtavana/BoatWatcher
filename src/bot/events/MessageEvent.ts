import {Message} from 'eris';
import {BoatWatcherClient} from '../structures';
import {BaseEvent} from './index';

class MessageEvent extends BaseEvent {
    constructor(client: BoatWatcherClient) {
        super(client, 'messageCreate', async (message: Message) => {
            client.emit('handle-message', message);
        });
    }
}

export { MessageEvent };
