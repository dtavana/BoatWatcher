import * as ArgumentTypes from './structures/commands/ArgumentTypes';

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
