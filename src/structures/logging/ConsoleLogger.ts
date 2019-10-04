import { transports } from 'winston';
import { BaseLogger } from '.';

class ConsoleLogger extends BaseLogger {
    constructor() {
        super('console', 'info', new transports.Console());
    }

}

export { ConsoleLogger };
