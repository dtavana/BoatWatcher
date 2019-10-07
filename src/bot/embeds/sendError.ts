import {BoatWatcherClient} from '../structures';
import {Context} from '../structures/commands';

const sendError = async (client: BoatWatcherClient, ctx: Context, error: string): Promise<void> => {
    const embed = {
        author: {
            icon_url: ctx.sender.avatarURL,
            name: ctx.sender.username,
        },
        color: 16724480,
        description: error,
        footer: {
            text: client.config.FOOTER_TEXT,
        },
        title: 'Error',
    };
    await ctx.embed(embed);
};

export { sendError };
