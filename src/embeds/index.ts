import {sendCustom} from './sendCustom';
import {sendError} from './sendError';
import {sendMessage} from './sendMessage';
import {sendSuccess} from './sendSuccess';

export const ALL_EMBEDS = {
    error: sendError,
    success: sendSuccess,
    custom: sendCustom,
};

export { sendMessage };
