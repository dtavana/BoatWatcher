import {ALL_EMBEDS} from '.';

export const sendMessage = async (func: string, ...data: any[]) => {
    const funcToSend = ALL_EMBEDS[func];
    if (funcToSend) {
        await funcToSend(...data);
    }
};
