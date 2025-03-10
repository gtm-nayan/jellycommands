import type { JellyCommands } from '../JellyCommands';
import { readJSFile, readFiles } from '../../util/fs';
import type { Event } from './Event';

export class EventManager {
    static async loadEvents(client: JellyCommands, paths: string | string[]) {
        for (const file of readFiles(paths)) {
            const event = await readJSFile<InstanceType<typeof Event>>(file);
            if (event.options.disabled) continue;

            const cb = (...ctx: any[]) => event.run({ client }, ...ctx);

            if (event.options.once) client.once(event.name, cb);
            else client.on(event.name, cb);
        }
    }
}
