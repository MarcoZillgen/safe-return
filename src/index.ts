export type Success<T> = { res: T; ok: true };
export type Failure<E> = { err: E; ok: false };
export type Result<T = void, E = void> = Success<T> | Failure<E>;

export function ok(): Result<void, never>;
export function ok<T>(res: T): Result<T, never>;
export function ok<T>(res?: T): Result<T, never> {
	return { ok: true, res: res as T };
}

export function err(): Result<never, void>;
export function err<E>(err: E): Result<never, E>;
export function err<E>(err?: E): Result<never, E> {
	return { ok: false, err: err as E };
}

export async function fromPromise<T, E = Error>(
	promise: Promise<T>,
): Promise<Result<T, E>> {
	try {
		const data = await promise;
		return ok(data);
	} catch (error) {
		return err(error as E);
	}
}

export function fromThrowable<T, E = Error>(fn: () => T): Result<T, E> {
	try {
		return ok(fn());
	} catch (error) {
		return err(error as E);
	}
}
