import {Message, EmbedOptions} from 'eris';
import {BoatWatcherClient} from '../client';
import {BaseHandler} from './BaseHandler';
import { Context } from '../commands';

class ModLogHandler extends BaseHandler {
    constructor(client: BoatWatcherClient) {
        super(client, 'handle-mod-log');
    }

    public async run(message: Message): Promise<void> {
        const ctx = new Context(this.client, message, null);
        if(ctx.guild.id !== this.client.config.DBL_GUILD_ID || message.channel.id !== this.client.config.DBL_MOD_LOG_ID) return;

        // const embed: EmbedOptions = message.embeds[0];
        const embed: EmbedOptions = {
            title: 'Bot declined',
            fields: [
                {
                    name: 'Bot',
                    value: 'The Standard#1912 (<@624360006472695841>)'
                },
                {
                    name: 'Moderator',
                    value: 'Timo Halofan#7092'
                },
                {
                    name: 'Reason',
                    value: 'Your bot was offline when we tried to review it. For that reason, we are unable to test it. Please get your bot online and re-apply.'
                },

            ]
        };
        //TODO: Make more modular
        if(!embed || !(embed.title === 'Bot declined')) return;
        let res: any = {};
        if (!embed.fields) return;
        for (const field of embed.fields) {
            const { name, value } = field;
            if (!value || !name) continue;
            let trueVal: string = '';
            if (name === 'Bot') {
                const matches = value.match(/(?:<@!?)+([0-9]+)>?/);
                if (!matches) continue;
                trueVal = matches[1];
            } else {
                trueVal = value;
            }
            res[name] = trueVal;
        }
        await this.client.pg.none("INSERT INTO decline-logs (botid, moderator, reason) VALUES ($1, $2, $3);", [res.Bot, res.Moderator, res.Reason]);
    }

}

export { ModLogHandler };
