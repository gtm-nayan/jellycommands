import { readdirRecursive, posixify } from 'ghoststools';
import { readJSFile } from '../../util/fs';
import { parse, resolve } from 'path';
import { lstatSync } from 'fs';

export default abstract class BaseManager<ManagerTarget> {
    constructor() {}

    protected abstract add(item: ManagerTarget, path: string): void;

    load(path: string) {
        path = resolve(posixify(path));

        const isDirectory = lstatSync(path).isDirectory();
        return isDirectory ? this.loadDirectory(path) : this.loadFile(path);
    }

    async loadFile(path: string): Promise<ManagerTarget> {
        const { ext } = parse(path);
        if (!['.js', '.mjs', '.cjs'].includes(ext))
            throw new Error(`${path} is not a JS file`);

        const item = await readJSFile(path);

        this.add(item, path);

        return item;
    }

    async loadDirectory(path: string): Promise<ManagerTarget[]> {
        const paths = readdirRecursive(path);
        const items = [];

        for (const path of paths) {
            const item = await this.loadFile(path);
            items.push(item);
        }

        return items;
    }
}
