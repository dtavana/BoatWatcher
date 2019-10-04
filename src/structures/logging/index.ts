
import { LoggerCollection } from '../collections';
import { BaseLogger } from './BaseLogger';
import { ConsoleLogger } from './ConsoleLogger';

const ALL_LOGGERS: LoggerCollection = new LoggerCollection();
ALL_LOGGERS.set('console', new ConsoleLogger());

export { ALL_LOGGERS };
export { BaseLogger };
export { ConsoleLogger };
export { LoggerCollection };
