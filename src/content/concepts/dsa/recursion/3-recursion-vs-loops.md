---
title: Loops vs Recursion
tags: [dsa, recursion]
---

Inspired from [this video](https://youtu.be/sGjAe6y299g?si=5wmAdFYiqgNijWT7) by "Dreams of Code"

## Loops

Loops are used to do a certain action a multiple times

The code inside the loop braces `{...}` keeps executing as long as the condition check on tracker variable is **true**

### The `while` loop

```txt title="Pseudocode"
init tracker
while (condition check on tracker) {
    do work at current value of tracker
    update tracker
}
```

```cpp title="C++ example"
int sum = 0;
int i = 0;                // Init tracker variable
while (i < arr.size()) {  // Condition check on tracker
    sum += arr[i];        // Do work at current tracker
    i++;                  // Update tracker
}
```

> Some languages also have a `do {...} while(condition);` loop that executes work at first run skipping condition check but checks condition at every iteration after it

In most cases, the tracker variable is a counter. To fulfill this, a new type of loop was introduced with nicer syntax:

### The `for` Loop

```txt title="Pseudocode"
for (
    init tracker;
    condition check on tracker;
    update tracker
) {
    do work at current value of tracker
}
```

```cpp title="C++ example"
for (int i = 0; i < arr.size(); i++) {  // Init; Condition; Update
    sum += arr[i];                      // Do work at current tracker
}
```

Generally `for` loops are used when the number of iterations are known or the condition checks are relatively straight-forward. For complicated cases, where number of iterations isn't known or there are various condition checks involved, `while` loops are preferred

Note that the `update tracker` step is done **AFTER** each iteration. A common use-case of such loop is iterating over a structure. To fulfill this, a new type of loop was introduced with nicer syntax:

### The range-based `for` loop

```txt title="Pseudocode"
for (item in structure) {
    do work on current item
}
```

```cpp title="C++ example"
for (int curr : arr) {  // Iterate over each item in structure
    sum += curr;        // Do work on current item
}
```

---

## Recursion

Now, what if we don't have a mutable **state** such as the tracker variable but still want to do an action a number of times

This is seen in **functional programming** where there is no state to track anything. Just inputs to functions. The same input always gives the same output

- The exit-condition check, also called as **base case**, is important as it prevents the recursive calls from continuing infinitely. Similarly, the condition-check in loops is there to prevent loops from continuing infinitely
- At each step/iteration, we are updating the state/tracker. This makes the next iteration different from previous one, preventing calling the same function with same input (which might go on infinitely)

Consider calculating sum of integers from `1` to `N` :

```cpp title="Using Loop"
int solveUsingLoop(int N) {
    int curr = 1, ans = 0;  // Init tracker and state
    while (curr <= N) {     // Check Exit-condition
        ans += curr;        // Do work. It updates state
        curr++;             // Update tracker
    }
    return ans;             // Return final state
}
```

```cpp title="Using Recursion"
int addToSum(int curr, int N, int &ans) {
    if (curr > N) {                     // Check Exit-condition
        return ans;
    }
    ans += curr;                        // Do work. It updates state
    return addToSum(curr + 1, N, ans);  // Schedule work with updated tracker
}

int solveUsingRecursion(int N) {
    int curr = 1, ans = 0;              // Init tracker and state
    return addToSum(curr, N, ans);      // Start work. Return final state when finished
}
```

> Thus, both loop and recursion can achieve the **same final answer**. So _technically_, you can use recursion to achieve the same work as loops. But that doesn't always mean you _should_

### Recursion uses a call stack

- Each time a function is called, it gets added onto the call stack
- Each function call entry is represented by the data associated with that call, know as it's **stack frame** or **activation record**. It's implementation is machine-dependent but mostly consists of:

  - **Return address** where the program should resume execution after the function returns
  - **Parameters** passed to the function call
  - **Local variables** declared within the function body (scope restricted just to the call)

- After the call executes (i.e. that function `return` occurs), it's stack frame is popped off the stack and then top of stack points to the previous (parent caller) function

```txt
|           |
|-----------|
|  f(0)     | <-- TOP
|-----------|
|   .       |
|   .       |
|   .       |
|-----------|
|  f(n-1)   |
|-----------|
|  f(n)     |
|-----------|
|  solve()  |
|-----------|
|  main()   |
|-----------|
```

Thus, deep recursive calls might end up in significant **memory usage**. This could cause stack overflow and lead to segfaults or crash our code

### Tail-Call Optimization

We can optimize the recursive calls' memory usage by this technique. Some compilers even do this internally under the hood. Note that there are 2 requirements to be met for tail-call optimization:

1. **ONLY ONE Recursive call** inside the function body
2. That recursive **call should be at the bottom end** inside the function body i.e. it must be the **last operation** inside the function

```cpp title="code.cpp"
#include <bits/stdc++.h>
using namespace std;

const int N = 2 * 1e9;
const int STEP = 1e4;

void func (int curr) {
    if (curr % STEP == 0) {
        cout << N - curr << endl;
    }
    if (curr == 0) {  // Base case
        return;
    }
    func(curr - 1);  // Tail-recursive call
}

int main () {
    func(N);  // Start recursion from N
    return 0;
}
```

```sh title="Normal vs Optimized compilation"
# Normal compilation and run:
g++ code.cpp
./a.out

# Optimized compilation and run:
g++ -O2 code.cpp
./a.out
```

The optimized run would go on till `2000000000`. However, the normal compilation would cause stack overflow and crash at `260000` as below:

```txt
...
250000
260000
[1]    99573 segmentation fault (core dumped)  ./a.out
```

The tail-call optimization could done by the compiler via some mechanisms like the `goto` statement, the `jmp` assembly instruction or even by converting the recursive function into a loop

> Note that Tail-call optimization, although handy, isn't always guaranteed to be available
