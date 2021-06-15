import { readdirSync, lstatSync } from 'fs';
import { join, resolve, parse } from 'path';
import { requireES } from './requireES';

export const posixify = (path: string) => path.replace(/\\/g, '/');

export const readdirRecursiveSync = (path: string): string[] =>
    readdirSync(path)
        .map((file) => join(path, file))
        .reduce(
            (files: string[], file: string) => [
                ...files,
                ...(lstatSync(file).isDirectory()
                    ? readdirRecursiveSync(file)
                    : [file]),
            ],
            [],
        )
        .map((p) => resolve(p))
        .map((p) => posixify(p));

export const readdirJSFiles = (path: string) =>
    readdirRecursiveSync(path)
        .map((path) => ({ path, data: requireES(path) }))
        .filter(({ path }) => {
            const { ext, name } = parse(path);
            return ['.js', '.mjs'].includes(ext) && !name.startsWith('_');
        });
