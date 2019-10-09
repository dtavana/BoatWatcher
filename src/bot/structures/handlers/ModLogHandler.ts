import {EmbedOptions, Message} from 'eris';
import {BoatWatcherClient} from '../client';
import { Context } from '../commands';
import {BaseHandler} from './BaseHandler';

class ModLogHandler extends BaseHandler {
    constructor(client: BoatWatcherClient) {
        super(client, 'handle-mod-log');
    }

    public async run(message: Message): Promise<void> {
        const ctx = new Context(this.client, message, null);
        if (ctx.guild.id !== this.client.config.DBL_GUILD_ID || message.channel.id !== this.client.config.DBL_MOD_LOG_ID || message.embeds.length === 0) { return; }
        const embed: EmbedOptions = message.embeds[0];
        if (!embed || !embed.author) {
            return;
        } else if (embed.author.name === 'Bot declined') {
            await this.handleDecline(embed);
        } else if (embed.author.name === 'Bot deleted') {
            await this.handleDeleted(embed);
        } else {
            return;
        }
    }
    private async parseFields(fields: Array<{ name?: string, value?: string, inline?: boolean }>) {
        const res = {
            Bot: undefined,
            Moderator: undefined,
            Reason: undefined,
        };
        for (const field of fields) {
            const { name, value } = field;
            if (!value || !name) { continue; }
            let trueVal: string = '';
            if (name === 'Bot') {
                const matches = value.match(/(?:<@!?)+([0-9]+)>?/);
                if (!matches) { continue; }
                trueVal = matches[1];
            } else {
                trueVal = value;
            }
            res[name] = trueVal;
        }
        return res;
    }
    private async handleDecline(embed: EmbedOptions) {
        if (!embed.fields) { return; }
        const res = await this.parseFields(embed.fields);
        await this.client.pg.db.none('INSERT INTO declinelogs (botid, moderator, reason) VALUES ($1, $2, $3);', [res.Bot, res.Moderator, res.Reason]);
    }

    private async handleDeleted(embed: EmbedOptions) {
        if (!embed.fields) { return; }
        const res = await this.parseFields(embed.fields);
        await this.client.pg.db.none('INSERT INTO deletedlogs (botid, responsible, reason) VALUES ($1, $2, $3);', [res.Bot, res.Moderator, res.Reason]);

    }
}

export { ModLogHandler };
