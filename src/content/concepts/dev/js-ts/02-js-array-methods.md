---
title: JS Array methods
tags: [js]
---

## Arrays in JS

In JavaScript, arrays aren't primitive data types but are [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) objects. Some notable characteristics are:

- Arrays can contain a mix of **different data-types**
- Array copy operations create **shallow copies**

All standard built-in copy operations with _any_ JavaScript objects create [shallow copies](https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy) instead of [deep copies](https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy)

Arrays can contain "empty slots", which are not the same as slots filled with the value `undefined`. Such arrays are called [Sparse arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections#sparse_arrays). Older methods like `forEach` treat empty slots differently than newer methods, refer [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#array_methods_and_empty_slots)

---

## The `.map()` method

It creates a new array populated with the results of calling the provided function on **EVERY element** in that array. Also refer [`Array.prototype.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) on MDN

```js
const nums = [4, 7, 1, 5, 2];
const cubes = nums.map((val) => val * val * val);
console.log(cubes);
// [ 64, 343, 1, 125, 8 ]
```

```ts
let student = {
  id: 101,
  name: "John Doe",
  marksheet: [
    { subject: "English", score: 95, grade: "N/A" },
    { subject: "Maths", score: 45, grade: "N/A" },
    { subject: "Science", score: 57, grade: "N/A" },
    { subject: "History", score: 80, grade: "N/A" },
  ],
};

function getGrade(score: number): string {
  if (score > 85) return "A";
  if (score > 70) return "B";
  if (score > 55) return "C";
  if (score > 40) return "D";
  return "F";
}

student.marksheet.map((subjectEntry) => {
  subjectEntry.grade = getGrade(subjectEntry.score);
});
console.table(student.marksheet);
// ┌─────────┬───────────┬───────┬───────┐
// │ (index) │ subject   │ score │ grade │
// ├─────────┼───────────┼───────┼───────┤
// │ 0       │ 'English' │ 95    │ 'A'   │
// │ 1       │ 'Maths'   │ 45    │ 'D'   │
// │ 2       │ 'Science' │ 57    │ 'C'   │
// │ 3       │ 'History' │ 80    │ 'B'   │
// └─────────┴───────────┴───────┴───────┘
```

## The `.filter()` method

It creates a shallow copy of a portion of a given array, containing references to only those elements from original array that **PASS** the conditions of the provided function. Also refer [`Array.prototype.filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) on MDN

```ts
const nums = [10, 15, 6, 93, 62, 48, 55, 27, 46];

const biggerOdds = nums.filter((val) => {
  return val > 50 && val & 1;
});

console.log(biggerOdds); // [ 93, 55 ]
```

## The `.reduce()` method

It executes the given "reducer" callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the array is a single value.

First time the callback function is run, there is no "return value of the previous calculation". If supplied, an initial value may be used in its place. Otherwise the first array element is used as the initial value and iteration starts from the second element

Refer [`Array.prototype.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) on MDN

```ts
const nums = [10, 15, 6, 93, 62, 48, 53, 27, 46];

const startValue = 0;
const sumOfNums = nums.reduce(
  (accumulator, currValue) => accumulator + currValue,
  startValue
);

console.log(sumOfNums); // 360
```

---

## More Array methods

Most of these are instance methods i.e. `Array.prototype.method()`

- [`.forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

  Calls the given function for each element in the given array. Note that `forEach()` does not return anything while `map()` returns the newly created array. Refer [here](https://stackoverflow.com/questions/34426458/javascript-difference-between-foreach-and-map) for more

- [`.flat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)

  Returns new array with all sub-array elements concatenated into it recursively upto specified depth.

- [`.flatMap()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)

  Returns new array formed by applying given function to each element of given array, and then flattening the result by 1 level.

- [`.slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

  Returns a shallow copy of a portion of given array from `[start, end)` into a new array

- [`.splice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

  Changes the contents of an array by removing/replacing existing elements and/or adding new elements in-place. To modify a copy of the array, refer `toSpliced()`

- [`.every()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

  Returns `true` if ALL elements in given array satisfy the provided test function

- [`.some()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

  Returns `true` if at LEAST ONE element in given array satisfies the provided test function

- [`.join()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

  Returns a new string formed by concatenating all the elements of array, separated by commas (or a specified separator string)

- [`.sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

  Sorts elements of given array in-place and returns reference to the same array. The comparator function `compare(a,b)` when passed, decides the ordering (`a` before `b` if positive, or after if negative, or same order as original if zero). Use [`toSorted()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted) to sort a copy of the array

- **Initialization**: Use constructor [`Array()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Array) or static methods like [`Array.from()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from), [`Array.fromAsync()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fromAsync), [`Array.of()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of). There's also the [`.fill()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill) instance method

- **Access**: Along with the square bracket indexing i.e. `[idx]`, you can also use `.at()` as it accepts negative (reverse) indexes

- **Insertion**: Use [`.push()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) to insert at end and [`.unshift()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) to insert at start

- **Deletion**: Use [`.pop()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop) to remove last and [`.shift()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) to remove first element

- **Search**: refer [`.find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find), [`.findIndex()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex), [`.findLast()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast), [`.findLastIndex()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex), [`.includes()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes), [`.indexOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf), [`.lastIndexOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)

- **Reverse** operations: [`.reverse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse), [`.toReversed()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed), [`.reduceRight()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight)
