import {Message} from 'eris';
import {BaseEvent} from '.';
import {BoatWatcherClient} from '../structures';

class MessageEvent extends BaseEvent {
    constructor(client: BoatWatcherClient) {
        super(client, 'messageCreate', (message: Message) => {
            if (message.author.bot) {
                client.loggers.sendLog('Ignoring message, sent message was by a bot', 'console');
                return;
            } else {
                client.loggers.sendLog(`Saw message: ${message.content}`, 'console');
                client.loggers.sendLog('Emitting command handler event', 'console');
                client.emit('handle-command', message);
            }
        });
    }
}

export { MessageEvent };
