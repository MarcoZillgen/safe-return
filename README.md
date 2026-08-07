# Safe-Return

A lightweight, zero-dependency `Result` implementation for TypeScript designed to enforce compile-time error handling and eliminate messy `try/catch` nesting.

## Installation

Install directly via Bun:

```bash
bun add github:marcozillgen/safe-return
```

## Examples

```ts
import { ok, err, type Result } from "safe-return";

function max(a: number, b: number): Result<number, string> {
  if (a === b) return err(`both values are ${a}`)
  const res = a > b ? a : b
  return ok(res)
}

const result = max(10, 2);

if (!result.ok) {
  console.error(result.err); // Type: string
  return;
}

console.log(result.res); // Type: number (10 / 2 = 5)
```

```ts
import { fromPromise, ok, err, type Result } from "safe-return";

async function fetchUser(id: string): Promise<Result<User, string>> {
  const result = await fromPromise(db.user.findUnique({ where: { id } }));

  if (!result.ok) {
    // result.err contains the caught error
    return err(`Database query failed: ${result.err.message}`);
  }

  // TypeScript knows result.res is safe to use here
  return ok(result.res);
}
```
