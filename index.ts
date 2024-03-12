import assert from "node:assert/strict";

// Assert helpers
const assertArray = (result: unknown[], expected: unknown[], msg: string) =>
  assert(result.toString() === expected.toString(), msg);
const assertObject = (
  result: Record<PropertyKey, unknown>,
  expected: Record<PropertyKey, unknown>,
  msg: string,
) => assert(JSON.stringify(result) === JSON.stringify(expected), msg);

// Standard usages of any
const basicArrow = (foo: any): any => foo;
const bracketArrow = (foo: any): any => {
  return foo;
};
function basicStandard(foo: any): any {
  return foo;
}
const optionalAny = (foo?: any): any => foo;
const multiArgAny = (foo: any, bar: any): string => {
  return "worked";
};
const multiArgOptionalAny = (foo?: any, bar?: any): string => {
  return "worked";
};
const optionalAnyArray = (foo?: any[]): any[] => foo || [];
const basicArrowArray = (foo: any[]): any[] => foo;
function basicStandardArray(foo: any[]): any[] {
  return foo;
}
const nestedArrays = (foo: any[][]): any[][] => foo;
const functionalTypeDef: {
  foo: () => any;
  fooPromise: () => Promise<any>;
} = {
  foo: () => "foo",
  fooPromise: (): Promise<any> => new Promise((resolve) => resolve("foo")),
};
assert(basicArrow(1) === 1, "basicArrow unexpected return");
assert(bracketArrow(1) === 1, "bracketArrow unexpected return");
assert(basicStandard(1) === 1, "basicStandard unexpected return");
assert(optionalAny() === undefined, "optionalAny unexpected return");
assert(
  optionalAny(1) === 1,
  "optionalAny unexpected return for undefined case",
);
assert(multiArgAny(1, 2) === "worked", "multiArgAny unexpected return");
assert(
  multiArgOptionalAny() === "worked",
  "multiArgOptionalAny unexpected return",
);
assertArray(optionalAnyArray([1]), [1], "optionalAnyArray unexpected return");
assertArray(
  optionalAnyArray(),
  [],
  "optionalAnyArray unexpected return undefined case",
);
assertArray(basicArrowArray([1]), [1], "basicArrowArray unexpected return");
assertArray(
  basicStandardArray([1]),
  [1],
  "basicStandardArray unexpected return",
);
assertArray(
  nestedArrays([[1], [2]]),
  [[1], [2]],
  "nestedArrays unexpected return",
);
assert(
  functionalTypeDef.foo() === "foo",
  "functionalTypeDef.foo unexpected return",
);
functionalTypeDef
  .fooPromise()
  .then((result) =>
    assert(result === "foo", "functionalTypeDef.fooPromise unexpected return"),
  );

// Unions of any
const anyOr = (foo: any | undefined): any | undefined => foo;

const checkLetDeclarationsAnyOr = () => {
  let a: any | undefined;
  let b: any | null;
  let c: any | string;
  a = 1;
  b = 2;
  c = "who would do this";
  return { a, b, c };
};
assert(anyOr(1) === 1, "anyOr unexpected return");
assert(
  anyOr(undefined) === undefined,
  "anyOr unexpected return for undefined case",
);
assertObject(
  checkLetDeclarationsAnyOr(),
  { a: 1, b: 2, c: "who would do this" },
  "something may have been corrupted with let declarations",
);

// Generics
const promiseChecker = (x: any): Promise<any> => {
  return new Promise((resolve) => {
    resolve(x);
  });
};
const promiseOrVoid = (x?: any): Promise<any> | void => {};
const promiseCheckerArray = (xs: any[]): Promise<any[]> => {
  return new Promise((resolve) => {
    resolve(xs);
  });
};
const arrayGeneric = (): Array<any> => [1, 2];
const genericUnion = <T>(foo: T): T => foo;
const checkGenericUnion = genericUnion<any | undefined>("wot");
const checkGenericUnion2 = genericUnion<any[]>(["wot"]);
const twopleUnion = <T1, T2>(foo: T1, bar: T2): [T1, T2] => [foo, bar];
const checkTwopleUnion = (a: any, b: any) => twopleUnion<any, any>(a, b);
const checkTwopleUnion2 = (a: any, b: string) => twopleUnion<any, string>(a, b);
const checkTwopleUnion3 = (a: string, b: any) => twopleUnion<string, any>(a, b);
const threepleUnion = <T1, T2, T3>(foo: T1, bar: T2, baz: T3): [T1, T2, T3] => [
  foo,
  bar,
  baz,
];
const checkThreepleUnion = (a: number, b: any, c: number) =>
  threepleUnion<number, any, number>(a, b, c);
promiseChecker(1).then((r) =>
  assert(r === 1, "promiseChecker returned unexpected result"),
);
const promiseArray = (): Promise<any>[] => [
  new Promise((resolve) => {
    resolve(1);
  }),
  new Promise((resolve) => {
    resolve(2);
  }),
];

promiseCheckerArray([1, 2, 3]).then((r) =>
  // @ts-ignore (this throws an error for unknown type after removing any)
  assertArray(r, [1, 2, 3], "promiseCheckerArray returned unexpected result"),
);
assert(promiseOrVoid() === undefined, "promiseOrVoid returned unexpect result");
assertArray(arrayGeneric(), [1, 2], "arrayGeneric returned unexpected result");
assert(promiseArray().length === 2, "lazy check that promise array works");
assert(checkGenericUnion === "wot", "checkGenericUnion unexpected return");
assertArray(
  checkGenericUnion2,
  ["wot"],
  "checkGenericUnion2 unexpected return",
);
assertArray(
  checkTwopleUnion(1, 2),
  [1, 2],
  "checkTwopleUnion unexpected return",
);
assertArray(
  checkTwopleUnion2(1, "foobar"),
  [1, "foobar"],
  "checkTwopleUnion2 unexpected return",
);
assertArray(
  checkTwopleUnion3("foobar", 1),
  ["foobar", 1],
  "checkTwopleUnion3 unexpected return",
);
assertArray(
  checkThreepleUnion(1, "any", 1),
  [1, "any", 1],
  "checkThreepleUnion unexpected return",
);

// Aliases
type NotAny = any;
const notAnyIfMany = (x: NotAny) => x;
const genericAlias =
  () =>
  <T = any>(x: T): T =>
    x;
const soManyAsAny = (x: number) => x as any;
const soManyAsAny2 = (x: any) => ({ x }) as any as { x: any };
const soManyAsAnyArray = (xs: number[]) => xs as any[];

assert(genericAlias()(1) === 1, "genericAlis returned an unexpected value");
assert(notAnyIfMany(1) === 1, "notAnyIfMany returned unexpected result");
assert(soManyAsAny(1) === 1, "soManyAsAny returned an unexpected value");
assertObject(
  soManyAsAny2(2),
  { x: 2 },
  "soManyAsAny2 returned an unexpected value",
);
assertArray(
  soManyAsAnyArray([1, 2, 1]),
  [1, 2, 1],
  "soManyAsAnyArray returned an unexpected value",
);

// Other things
const anyany = () => "any";
assert(anyany.name === "a" + "nya" + "ny", "function name anyany changed"); // Make sure that function name isn't changed
assert(
  anyany() === "a" + "ny",
  "anyany function failed to return the literal string 'any'",
);

console.log("✅ Successfully checked correctness");
