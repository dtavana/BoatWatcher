import { ICommandArgument } from '.';

interface ICommandOptions {
    name: string;
    group?: string;
    sendError?: boolean;
    aliases?: string[];
    args?: ICommandArgument[];
    ownerOnly?: boolean;
    permissions?: string[];
}

export { ICommandOptions };
