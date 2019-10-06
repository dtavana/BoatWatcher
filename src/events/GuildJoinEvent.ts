import {Channel, Guild, Member, TextChannel} from 'eris';
import {BaseEvent} from '.';
import {BoatWatcherClient} from '../structures';
import {Context} from '../structures/commands';
import {IDeclineLogResult} from '../structures/interfaces';

class GuildJoinEvent extends BaseEvent {
    constructor(client: BoatWatcherClient) {
        super(client, 'guildMemberAdd', async (guild: Guild, member: Member) => {
            if (guild.id !== client.config.DBL_VC_GUILD_ID || !member.bot) { return; }
            const logs: IDeclineLogResult[] = await client.pg.db.any('SELECT * FROM declinelogs WHERE botid = $1 ORDER BY recorded;', member.id);
            if (logs.length === 0) {
                return;
            }
            const recent: IDeclineLogResult = logs[0];
            const logChannel: Channel | undefined = guild.channels.get(client.config.DBL_VC_LOG_ID);
            if (!logChannel) {
                return;
            }
            const embed = {
                title: `This bot has been declined ${logs.length} times`,
                description: `Most recent decline information:`,
                fields: [
                    {
                        name: 'Moderator',
                        value: recent.moderator,
                    },
                    {
                        name: 'Reason',
                        value: recent.reason,
                    },
                    {
                        name: 'Recorded Decline Date',
                        value: recent.recorded,
                    },
                ],
                author: {
                    icon_url: member.avatarURL,
                    name: member.username,
                },
            };
            await (logChannel as TextChannel).createMessage(member.mention);
            await client.sendMessage('log', client, logChannel, embed);
        });
    }
}
export { GuildJoinEvent };
