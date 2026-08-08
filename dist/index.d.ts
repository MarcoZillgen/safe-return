export type Success<T> = {
    res: T;
    ok: true;
};
export type Failure<E> = {
    err: E;
    ok: false;
};
export type Result<T = void, E = void> = Success<T> | Failure<E>;
export declare function ok(): Result<void, never>;
export declare function ok<T>(res: T): Result<T, never>;
export declare function err(): Result<never, void>;
export declare function err<E>(err: E): Result<never, E>;
export declare function fromPromise<T, E = Error>(promise: Promise<T>): Promise<Result<T, E>>;
export declare function fromThrowable<T, E = Error>(fn: () => T): Result<T, E>;
