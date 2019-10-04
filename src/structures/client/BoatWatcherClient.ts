import {Client} from 'eris';
import {IBoatWatcherClientConfig} from '..';

import {TestCommand} from '../../commands/test';
import {EvalCommand} from '../../commands/utility/eval';
import {ARGUMENT_TYPES} from '../../constants';
import {sendMessage} from '../../embeds';
import {MessageEvent, ReadyEvent} from '../../events';
import {PostgresManager} from '../../managers';
import {LoggerCollection} from '../collections';
import {Command} from '../commands';
import {ALL_HANDLERS, BaseHandler} from '../handlers';
import {ALL_LOGGERS} from '../logging';

class BoatWatcherClient extends Client {
    public config: IBoatWatcherClientConfig;
    public defaultPrefix: string;
    public types: object;
    // private _redis: RedisManager;
    public loggers: LoggerCollection;
    public handlers: BaseHandler[];
    public sendMessage: (func: any, ...data: any[]) => Promise<void>;
    public commands: Map<string, Command>;
    //private pg: PostgresManager;
    constructor(config: IBoatWatcherClientConfig) {
        super(
            config.BOT_TOKEN,
            {
                disableEvents: {
                    /*
                    "CHANNEL_CREATE": true,
                    "CHANNEL_DELETE": true,
                    "CHANNEL_UPDATE": true,
                    "GUILD_BAN_ADD": true,
                    "GUILD_BAN_REMOVE": true,
                    "GUILD_MEMBER_REMOVE": true,
                    "GUILD_MEMBER_UPDATE": true,
                    "GUILD_ROLE_CREATE": true,
                    "GUILD_UPDATE": true,
                    "MESSAGE_CREATE": true,
                    "MESSAGE_DELETE": true,
                    "MESSAGE_DELETE_BULK": true
                    "PRESCENCE_UPDATE": true,
                    */
                    TYPING_START: true,
                    /*
                    "USER_UPDATE": true,
                    "VOICE_STATUS_UPDATE": true,
                    */
                },
                maxShards: 'auto',

            },
        );
        this.config = config;
        this.loggers = ALL_LOGGERS;
        this.commands = new Map();
        // TESTING
        const test = new TestCommand(this);
        const evalc = new EvalCommand(this);
        this.commands.set(test.name, test);
        this.commands.set(evalc.name, evalc);
        this.defaultPrefix = config.DEFAULT_PREFIX;
        this.sendMessage = sendMessage;
        this.types = {};
        for (const type of Object.entries(ARGUMENT_TYPES)) {
            const typeName = type[0];
            const typeHandler = type[1];
            this.loggers.sendLog(`Argument ${typeName} is now trying to register`, 'console');
            this.types[typeName] = new typeHandler(this);
            this.loggers.sendLog(`Argument ${typeName} is now registered`, 'console');
        }
        this.handlers = [];
        for (const handle of ALL_HANDLERS) {
            const handler = new handle(this);
            this.loggers.sendLog(`Handler ${handle.name} is now registered`, 'console');
            this.handlers.push(handler);
        }

        this.addListener('handle-message', async (...data) => {
            this.loggers.sendLog('Received message handle event', 'console');
            for (const handle of this.handlers) {
                this.loggers.sendLog(`Running ${handle.handlerName} handler`, 'console');
                await handle.run(...data);
                this.loggers.sendLog(`Ran ${handle.handlerName} handler`, 'console');
            }
        });

        // this.pg = new PostgresManager(this);

        this.connect().then(); // Connect to discord
        // Initialize events
        // tslint:disable-next-line:max-line-length
        // FIXME: Make this an array to easily traverse. Add to constants file. Add all other similar things to the constant file as well
        new ReadyEvent(this);
        new MessageEvent(this);
    }
}

export { BoatWatcherClient };
