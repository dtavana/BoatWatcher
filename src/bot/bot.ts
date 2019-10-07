import {readFileSync} from 'fs';
import {safeLoad} from 'js-yaml';
import {BoatWatcherClient, IBoatWatcherClientConfig} from './structures';

export default () => {
    const config: IBoatWatcherClientConfig = safeLoad(readFileSync('bot.yml', 'utf8'));
    return new BoatWatcherClient(config);
};
