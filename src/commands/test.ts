import {BoatWatcherClient} from '../structures';
import {Command} from '../structures/commands';

class TestCommand extends Command {
    constructor(client: BoatWatcherClient) {
        super(client, {
            name: 'test',
            sendError: true,
            args: [
                {
                    key: 'evalString',
                    type: 'boolean',
                },
            ],
            ownerOnly: true,
        });
    }

    public async run(ctx, evalString) {
        await ctx.send(evalString);
    }
}

export { TestCommand };
