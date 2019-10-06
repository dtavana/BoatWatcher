import {Message} from 'eris';
import {BaseEvent} from '.';
import {BoatWatcherClient} from '../structures';

class MessageEvent extends BaseEvent {
    constructor(client: BoatWatcherClient) {
        super(client, 'messageCreate', async (message: Message) => {
            client.emit('handle-message', message);
        });
    }
}

export { MessageEvent };
