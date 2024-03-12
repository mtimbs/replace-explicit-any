# No explicit any

This is a test repo that defines some of the common usage patterns of the explicit use of `any` in TypeScript.

It includes a script for removing all explicit uses of `any` in your project. You could probably do a straight search and replace with an `unknown` type, but this may be a bit aggressive for many codebases. Removing the _explicit_ usages of `any` will convert the types to an _implicit_ any via inference. This will throw a TS error in strict mode, but be far less noisy than an `unknown` type which will error everywhere.

Converting _explicit_ usages to _implicit_ has the benefit of allowing a more staged migration to strict typing by still allowing the _implicit_ use of `any` to be a blackhole for types, but flagging usages under a strict config. There is currently no way for the typescript compiler to flag _explicit_ usages of `any`.

It would be advisable to introduce the no-explicit-any eslint rule after removing the explicit cases of any from yoru code to ensure that they dont slip in again https://typescript-eslint.io/rules/no-explicit-any/

## Tests

There are some native assertions in `index.ts` that will let you know that your code still runs as expected after your search and replace has been run.  
```bash
bash checkCorrectness.sh
```
Running this script will let you know if you have broken your code in anyway during the search and replace process.

## Notes

- Prettier has been run on this code to remove the explosion of target patterns based on changes to whitespace
- You can fork this repo and add your own patterns if there are usages in your code that are not present here

