import { defaults, JellyCommandsOptions } from '../options/JellyCommands';
import { CommandManager } from './CommandManager';
import { EventManager } from './EventManager';
import { merge } from '../util/options';
import { Client } from 'discord.js';

export class JellyCommands {
    #client: Client;
    #options: JellyCommandsOptions;

    private commandManager: CommandManager;
    private eventManager: EventManager;

    constructor(client: Client, options: JellyCommandsOptions) {
        if (!client)
            throw new SyntaxError(
                'Expected a instance of Discord.Client, recieved none',
            );

        if (!(client instanceof Client))
            throw new TypeError(
                `Expected a instance of Discord.Client, recieved ${typeof client}`,
            );

        this.#client = client;
        this.#options = merge(defaults, options);

        this.commandManager = new CommandManager();
        this.eventManager = new EventManager(this);
    }

    get client() {
        return this.#client;
    }

    get options() {
        return Object.freeze({ ...this.#options });
    }

    loadCommands(directory: string) {
        this.commandManager.load(directory);
    }

    loadEvents(directory: string) {
        this.eventManager.load(directory);
    }
}
