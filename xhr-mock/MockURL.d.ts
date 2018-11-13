export interface MockURL {
    protocol?: string;
    username?: string;
    password?: string;
    host?: string;
    port?: number;
    path?: string;
    query?: {
        [name: string]: string;
    };
    hash?: string;
    toString(): string;
}
export declare function parseURL(url: string): MockURL;
export declare function formatURL(url: MockURL): string;
