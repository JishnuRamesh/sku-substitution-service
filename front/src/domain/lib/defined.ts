export type Defined<T> = Exclude<T, null | undefined>;

export const isDefined = <T>(value: T | undefined | null): value is T => {
    return value !== undefined && value !== null;
};
