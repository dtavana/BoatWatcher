import {Message} from 'eris';
import {BoatWatcherClient} from '../client';
import { Context } from '../commands';
import {BaseHandler} from './BaseHandler';

class LogHandler extends BaseHandler {
    constructor(client: BoatWatcherClient) {
        super(client, 'handle-log');
    }

    public async run(message: Message): Promise<void> {
        const ctx = new Context(this.client, message, null);
        if (ctx.guild.id !== this.client.config.DBL_GUILD_ID || message.channel.id !== this.client.config.DBL_LOG_ID) { return; }
        const res: any = {};
        const original = message.content;
        if (!original.includes('deleted by')) { return; }
        const deleterString = original.substring(original.lastIndexOf('by ') + 3);
        const deleterMatches = deleterString.match(/(?:<@!?)+([0-9]+)>?/);
        if (!deleterMatches) { return; }
        res.Responsible = deleterMatches[1];
        const member = ctx.guild.members.get(res.Responsible);
        if (member && member.roles.includes(this.client.config.DBL_MOD_ROLE_ID)) { return; } // Handle in mod log handler
        const botString = original.substring(0, original.indexOf(' by'));
        const botMatches = botString.match(/(?:<@!?)+([0-9]+)>?/);
        if (!botMatches) { return; }
        res.Bot = botMatches[1];
        await this.client.pg.db.none('INSERT INTO deletedlogs (botid, responsible) VALUES ($1, $2);', [res.Bot, res.Responsible]);
    }
}

export { LogHandler };
