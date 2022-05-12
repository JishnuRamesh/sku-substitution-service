export interface Log {
    debug(tag: string, ...args: any[]): void;
    error(tag: string, ...args: any[]): void;
    info(tag: string, ...args: any[]): void;
    trace(tag: string, ...args: any[]): void;
    warn(tag: string, ...args: any[]): void;
    raw(tag: string, ...args: any[]): void;
}
