import { TGBLCommandArgument } from '.';

interface ICommandOptions {
    name: string;
    group?: string;
    sendError?: boolean;
    aliases?: string[];
    args?: TGBLCommandArgument[];
    ownerOnly?: boolean;
    permissions?: string[];
}

export { ICommandOptions };
