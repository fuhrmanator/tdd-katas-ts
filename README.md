# TDD katas in TypeScript with Jasmine

This repo provides a starting point for doing TDD in TypeScript with Jasmine.

Here's a short tutorial for getting started. I use VisualStudio Code, but it's not necessary.

## Preliminaries

1. Clone this repo
2. In a terminal (e.g., from VSCode) run `npm install`
3. Then run `gulp watch` to start the automatic running of TypeScript compiler and `jasmine` whenever your source or spec files change.

## TDD for Imaginary class X

In this example, we won't do a real kata. The goal here is to get you started with the syntax of TypeScript and Jasmine, as well as mechanics of the `gulp watch` process.

In the Jasmine setup here (see `spec/support/jasmine.json`) the project is configured with tests in the `spec` directory, and source files in the `src` directory.

### Create a test

In an editor, create your first test at `spec/X.spec.ts`:

```TypeScript
import { X } from "../src/X";

describe("X", () => {

    it("A test returns 1", () => {
        let x: X;
        x = new X();
        expect(x.someCall(1)).toBe(1);
    });

});
```

When you save the file, the running gulp window will show the following:

```
[17:49:37] Starting 'test'...
[17:49:37] Starting 'ts'...
spec\X.spec.ts(1,19): error TS2307: Cannot find module '../src/X'.
TypeScript: 1 semantic error
TypeScript: emit succeeded (with errors)
[17:49:41] 'ts' errored after 3.58 s
[17:49:41] Error: TypeScript: Compilation failed
    at Output.mightFinish (C:\Users\me\Documents\git_repos\tdd-katas-ts\node_modules\gulp-typescript\release\output.js:130:43)
    at applySourceMap.then.appliedSourceMap (C:\Users\me\Documents\git_repos\tdd-katas-ts\node_modules\gulp-typescript\release\output.js:43:22)
    at <anonymous>
    at process._tickDomainCallback (internal/process/next_tick.js:228:7)
[17:49:41] 'test' errored after 3.58 s
```

Since no `src/X.ts` file has been created, the test cannot compile. Let's create `src/X.ts`:

```TypeScript
export class X {};
```

There's still no method `someCall()`, but I'm leaving it off to see if my IDE will help. When I save the file, I see in the gulp window:

```
[17:56:56] Starting 'test'...
[17:56:56] Starting 'ts'...
spec\X.spec.ts(8,18): error TS2339: Property 'someCall' does not exist on type 'X'.
TypeScript: 1 semantic error
TypeScript: emit succeeded (with errors)
[17:57:00] 'ts' errored after 4.47 s
[17:57:00] Error: TypeScript: Compilation failed
    at Output.mightFinish (C:\Users\me\Documents\git_repos\tdd-katas-ts\node_modules\gulp-typescript\release\output.js:130:43)
    at applySourceMap.then.appliedSourceMap (C:\Users\me\Documents\git_repos\tdd-katas-ts\node_modules\gulp-typescript\release\output.js:43:22)
    at <anonymous>
    at process._tickDomainCallback (internal/process/next_tick.js:228:7)
[17:57:00] 'test' errored after 4.48 s
```

In the IDE (VSCode), when I hover over the `someCall` method in `X.spec.ts`, I see the error `Property 'someCall' does not exist on type 'X'.ts(2339)` and if I click the **Quickfix...** I am offered three choices:

- Declare method 'someCall'
- Declare property 'someCall'
- Add index signature for property 'someCall'

So, I go with the first option, since we're dealing with a method. My IDE produces the following code for `X.ts`:

```TypeScript
export class X {
    someCall(arg0: number): any {
        throw new Error("Method not implemented.");
    }
};
```

Upon saving that file, the gulp watch automatically tries again:

```
[18:23:53] Starting 'test'...
[18:23:53] Starting 'ts'...
[18:23:59] Finished 'ts' after 5.94 s
[18:23:59] Starting '<anonymous>'...
F
Failures:
1) X A test returns 1
1.1) Error: Method not implemented.

1 spec, 1 failure
Finished in 0 seconds
[18:23:59] '<anonymous>' errored after 77 ms
[18:23:59] Error in plugin "gulp-jasmine"
Message:
    Tests failed
Details:
    domainEmitter: [object Object]
    domain: [object Object]
    domainThrown: false

[18:23:59] 'test' errored after 6.02 s
```

Since I know it should be returning a number (1) and I want to pass the test, I change the method signature from `any` to `number` and return a 1:

```TypeScript
    someCall(arg0: number): number {
        return 1
    }
```

The gulp watch window gives us the following encouraging messages:

```
[18:26:34] Starting 'test'...
[18:26:34] Starting 'ts'...
[18:26:38] Finished 'ts' after 4.55 s
[18:26:38] Starting '<anonymous>'...
.
1 spec, 0 failures
Finished in 0 seconds
[18:26:38] Finished '<anonymous>' after 15 ms
[18:26:38] Finished 'test' after 4.57 s
```
