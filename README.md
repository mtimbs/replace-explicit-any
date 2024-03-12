# No explicit any

This is a test repo that defines some of the common usage patterns of the explicit use of `any` in TypeScript.

It includes a script for removing all explicit uses of `any` in your project. It **does not** swap out `any` for the `unknown` type, and instead opts to turn your _explicit_ `any` into an _implicit_ `any`. Removing the _explicit_ usages of `any` will convert the types to an _implicit_ any via inference. This will throw a TS error in strict mode, but be far less noisy than an `unknown` type which will error everywhere.

Converting _explicit_ usages to _implicit_ has the benefit of allowing a more staged migration to strict typing by still allowing the _implicit_ use of `any` to be a black hole for types, but flagging usages under a strict config. There is currently no way for the typescript compiler to flag _explicit_ usages of `any`.

It would be advisable to introduce the no-explicit-any eslint rule after removing the explicit cases of any from yoru code to ensure that they dont slip in again https://typescript-eslint.io/rules/no-explicit-any/

If you really want to replace `any` with `unknown` then you may edit the sed commands in `search_and_replace.sh`

## Tests

There are some native assertions in `index.ts` that will let you know that your code still runs as expected after your search and replace has been run.  
```bash
bash check_correctness.sh
```
Running this script will let you know if you have broken your code in any way during the search and replace process.

## Running the example
This repo has a Dockerfile that uses an Alpine linux environment to run `find` and `sed` to recursively check for `.ts` and `.tsx` files in the root directory and replace all the patterns defined in `search_and_replace.sh`.

```bash
bash run_replacement.sh
```

## Running search and replace directly
You can copy the main command from `search_and_replace.sh` and run it directly in your terminal but you should be aware of slight differences in `sed` between OS (e,g, Mac)

To run the command directly on MacOS you need to add `""` just after the `-i` flag in the `sed` command.

You will also likely want to run the find command inside specific directories and not your root directory to avoid touching `node_modules`. You can do this by changing `find .` to reference the directories you want to traverse.

for example `find dir1 dir2` or `find src` or `find backend frontend` etc etc. 

## Notes

- Prettier has been run on your code before running this script to remove the explosion of target patterns based on changes to whitespace
- running Prettier after running this script will help highlight broken code syntax (the prettier output will include error messages)
- You can fork this repo and add your own patterns if there are usages in your code that are not present here

