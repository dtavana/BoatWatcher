import { Message } from 'eris';
import { TGBLCommandArgument } from '..';
import { BoatWatcherClient } from '../../client';

class CommandArgumentType {
    public client: BoatWatcherClient;
    public name: string;
    constructor(client: BoatWatcherClient, name: string) {
        this.name = name;
        this.client = client;
    }
    public async validate(val: string, message: Message, arg: TGBLCommandArgument): Promise<any> {
        throw new Error(`${this.name} does not have a validate function implemented`);
    }
    public async parse(val: string, message: Message, arg: TGBLCommandArgument): Promise<any> {
        throw new Error(`${this.name} does not have a parse function implemented`);
    }
    public async isEmpty(val: string, message: Message, arg: TGBLCommandArgument): Promise<any> {
        throw new Error(`${this.name} does not have a isEmpty function implemented`);
    }
}

export { CommandArgumentType };
