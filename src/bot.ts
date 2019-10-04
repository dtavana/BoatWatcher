import { readFileSync } from 'fs';
import { safeLoad } from 'js-yaml';
import { BoatWatcherClient, IBoatWatcherClientConfig } from './structures';

const config: IBoatWatcherClientConfig = safeLoad(readFileSync('application.yml', 'utf8'));

new BoatWatcherClient(config);
