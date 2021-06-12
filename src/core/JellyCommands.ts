import { Client } from 'discord.js';
import { defaults, JellyCommandsOptions, validate } from '../options';

export class JellyCommands {
    private client: Client;
    private options: JellyCommandsOptions;

    constructor(client: Client, options: JellyCommandsOptions) {
        const validOptions = validate(options);

        if (!client)
            throw new SyntaxError(
                'Expected a instance of Discord.Client, recieved none',
            );

        if (!(client instanceof Client))
            throw new TypeError(
                `Expected a instance of Discord.Client, recieved ${typeof client}`,
            );

        this.client = client;
        this.options = Object.assign(defaults, options);
    }
}
