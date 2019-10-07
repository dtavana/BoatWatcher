import botInit from './bot/bot';
import {BoatWatcherClient} from './bot/structures/client';
import serverInit from './server/server';

const client: BoatWatcherClient = botInit();
const server = serverInit(client);
