import {sendCustom, sendError, sendLog, sendSuccess} from './embeds';
import {GuildJoinEvent, MessageEvent, ReadyEvent} from './events';
import {LoggerCollection} from './structures/collections';
import * as ArgumentTypes from './structures/commands/ArgumentTypes';
import {CommandHandler, LogHandler, ModLogHandler} from './structures/handlers';
import {ConsoleLogger} from './structures/logging';

export const ARGUMENT_TYPES = {
    'boolean': ArgumentTypes.BooleanArgumentType,
    'category-channel': ArgumentTypes.CategoryChannelArgumentType,
    'channel': ArgumentTypes.ChannelArgumentType,
    'float': ArgumentTypes.FloatArgumentType,
    'integer': ArgumentTypes.IntegerArgumentType,
    'member': ArgumentTypes.MemberArgumentType,
    'role': ArgumentTypes.RoleArgumentType,
    'string': ArgumentTypes.StringArgumentType,
    'text-channel': ArgumentTypes.TextChannelArgumentType,
    'user': ArgumentTypes.UserArgumentType,
};

export const ALL_EMBEDS = {
    error: sendError,
    success: sendSuccess,
    custom: sendCustom,
    log: sendLog,
};

export const ALL_HANDLERS = [
    LogHandler,
    ModLogHandler,
    CommandHandler,
];

export const ALL_EVENTS = [
    GuildJoinEvent,
    MessageEvent,
    ReadyEvent,
];

const ALL_LOGGERS: LoggerCollection = new LoggerCollection();
ALL_LOGGERS.set('console', new ConsoleLogger());
export { ALL_LOGGERS };
