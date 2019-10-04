import { BaseHandler } from './BaseHandler';
import { CommandHandler } from './CommandHandler';
import { ModLogHandler } from './ModLogHandler';

export const ALL_HANDLERS = [
    CommandHandler,
    ModLogHandler,
];

export { BaseHandler };
export { CommandHandler };
export { ModLogHandler }
