export function ok(res) {
    return { ok: true, res: res };
}
export function err(err) {
    return { ok: false, err: err };
}
export async function fromPromise(promise) {
    try {
        const data = await promise;
        return ok(data);
    }
    catch (error) {
        return err(error);
    }
}
export function fromThrowable(fn) {
    try {
        return ok(fn());
    }
    catch (error) {
        return err(error);
    }
}
