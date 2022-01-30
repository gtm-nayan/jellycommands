import type { MessageOptions, ClientOptions } from 'discord.js';
import { snowflakeArray } from '../util/joi';
import { MessagePayload } from 'discord.js';
import Joi from 'joi';
import {
    arrayOfCommandsOrPaths,
    arrayOfEventsOrPaths,
    UserProvidedEvent,
} from '../util/loaders.js';
import { BaseCommand } from './commands/base/BaseCommand.js';

export const schema = Joi.object({
    commands: arrayOfCommandsOrPaths(),
    events: arrayOfEventsOrPaths(),

    clientOptions: Joi.object().required(),

    props: Joi.object().default({}),

    messages: Joi.object({
        unknownCommand: Joi.alternatives()
            .try(
                Joi.string(),
                Joi.object().instance(MessagePayload),
                Joi.object(),
            )
            .default({
                embeds: [{ description: 'Unknown Command' }],
            }),
    }).default(),

    dev: Joi.object({
        global: Joi.bool().default(false),
        guilds: snowflakeArray(),
    }).default(),

    cache: Joi.bool().default(true),

    debug: Joi.bool().default(false),
});

export interface JellyCommandsOptions {
    /**
     * Either an array of commands, or path(s) to commands
     */
    commands?: string | Array<string | BaseCommand>;

    /**
     * Either an array of events, or path(s) to events
     */
    events?: string | Array<string | UserProvidedEvent>;

    /**
     * Base discord.js client options
     */
    clientOptions: ClientOptions;

    /**
     * Inital props to pass to props api
     */
    props?: Record<string, any>;

    /**
     * Customisable responses
     */
    messages?: {
        /**
         * This is sent when a unknown command is given
         */
        unknownCommand?: string | MessagePayload | MessageOptions;
    };

    /**
     * Developer mode options
     */
    dev?: {
        /**
         * Should dev mode be enabled globally?
         */
        global?: boolean;

        /**
         * The guilds to run dev mode commands in
         */
        guilds?: string[];
    };

    /**
     * Should jelly cache commands - highly recommended
     * @default true
     */
    cache?: boolean;

    /**
     * Whether jelly should emit debug messages
     */
    debug?: boolean;
}
