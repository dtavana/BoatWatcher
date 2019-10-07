import {TextChannel} from 'eris';
import {BoatWatcherClient} from '../structures';
import {Context} from '../structures/commands';
import {sendCustom} from './sendCustom';

const sendLog = async (client: BoatWatcherClient, logChannel: TextChannel, options: object): Promise<void> => {
    const embed = {
        color: 16776960,
        footer: {
            text: client.config.FOOTER_TEXT,
        },
    };
    Object.assign<object, object>(embed, options);
    await logChannel.createMessage({
        embed,
    });
};

export { sendLog };
