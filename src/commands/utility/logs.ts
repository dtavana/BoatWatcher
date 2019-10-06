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
                    type: 'user',
                },
            ],
        });
    }

    public async run(ctx, bot) {
        const logs: IDeclineLogResult[] = await this.client.pg.db.any('SELECT * FROM declinelogs WHERE botid = $1 ORDER BY recorded;', bot.id);
        if (logs.length === 0) {
            return await this.client.sendMessage('error', this.client, ctx, `No logs recorded for ${bot.mention}`);
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
