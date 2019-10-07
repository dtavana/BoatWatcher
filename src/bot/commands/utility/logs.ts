import {BoatWatcherClient} from '../../structures';
import {Command} from '../../structures/commands';
import {IDeclineLogResult} from '../../structures/interfaces';

class LogsCommand extends Command {
    constructor(client: BoatWatcherClient) {
        super(client, {
            name: 'logs',
            sendError: true,
            args: [
                {
                    key: 'bot',
                    type: 'string',
                },
            ],
        });
    }

    public async run(ctx, bot) {
        if (ctx.guild.id !== this.client.config.DBL_VC_GUILD_ID) { return; }
        const logs: IDeclineLogResult[] = await this.client.pg.db.any('SELECT * FROM declinelogs WHERE botid = $1 ORDER BY recorded LIMIT 5;', bot);
        if (logs.length === 0) {
            return await this.client.sendMessage('error', this.client, ctx, `No logs recorded for \`${bot}\``);
        }
        for (const log of logs) {
            const embed = {
                color: 16711680,
                fields: [
                    {
                        name: 'Moderator',
                        value: log.moderator,
                    },
                    {
                        name: 'Reason',
                        value: log.reason,
                    },
                    {
                        name: 'Recorded Decline Date',
                        value: log.recorded,
                    },
                ],
                author: {
                    icon_url: ctx.member.avatarURL,
                    name: ctx.member.username,
                },
            };
            await this.client.sendMessage('log', this.client, ctx.channel, embed);
        }
    }
}

export { LogsCommand };
