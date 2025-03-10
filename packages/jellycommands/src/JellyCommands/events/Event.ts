import { schema, EventOptions } from './options';
import { removeKeys } from 'ghoststools';

import type { JellyCommands } from '../JellyCommands';
import type { Client, ClientEvents } from 'discord.js';

export class Event<T extends keyof ClientEvents> {
    public readonly name: keyof ClientEvents;
    public readonly run: Function;
    public readonly options: Required<EventOptions<T>>;

    constructor(
        name: keyof ClientEvents,
        run: Function,
        options: EventOptions<T>,
    ) {
        this.name = name;

        if (!name || typeof name != 'string')
            throw new TypeError(
                `Expected type string for name, recieved ${typeof name}`,
            );

        this.run = run;

        if (!run || typeof run != 'function')
            throw new TypeError(
                `Expected type function for run, recieved ${typeof run}`,
            );

        const { error, value } = schema.validate(options);

        if (error) throw error.annotate();
        else this.options = value;
    }
}

export const event = <K extends keyof ClientEvents>(
    options: EventOptions<K> & {
        run: (
            instance: { client: JellyCommands },
            ...args: ClientEvents[K]
        ) => void | any;
    },
) => {
    return new Event<K>(
        options.name,
        options.run,
        removeKeys(options, 'run') as EventOptions<K>,
    );
};
