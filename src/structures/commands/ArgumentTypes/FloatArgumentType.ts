import { Message } from 'eris';
import { CommandArgumentType } from '.';
import { ICommandArgument } from '../ICommandArgument';

class FloatArgumentType extends CommandArgumentType {
    constructor(client) {
        super(client, 'float');
    }

    public async validate(val, msg: Message, arg: ICommandArgument) {
        const float = Number.parseFloat(val);
        if (Number.isNaN(float)) {
            return false;
        }
        if (arg.min !== null && typeof arg.min !== 'undefined' && float < arg.min) {
            return `Please enter a number above or exactly ${arg.min}.`;
        }
        if (arg.max !== null && typeof arg.max !== 'undefined' && float > arg.max) {
            return `Please enter a number below or exactly ${arg.max}.`;
        }
        return true;
    }

    public async parse(val) {
        return Number.parseFloat(val);
    }
}

export { FloatArgumentType };
