---
title: Loops vs Recursion
tags: [dsa]
---

[**Reference video**](https://youtu.be/sGjAe6y299g?si=5wmAdFYiqgNijWT7) by _Dreams of Code_

Loops are used to do an action, such as `doWork()` a certain number of times

## The `while` loop

```txt
init trackerVariable;
while(condition check on trackerVariable)
{
    doWork();

    update trackerVariable;
}
```

In most cases, the tracker variable is a counter. To fulfill this, a new type of loop was introduced with nicer syntax:

## The `for` Loop

```txt
for(
    init trackerVariable;
    condition check on trackerVariable;
    update trackerVariable
){
    doWork();
}
```

A common use-case of this loop is iterating over a structure. To fulfill this, a new type of loop was introduced with nicer syntax:

## Range-based loops

```txt
for(item in structure)
{
    doWork(item);
}
```

---

## Recursion

Now, what if we don't have a mutable state such as `trackerVariable` but still want to do an action a number if times

This is seen in functional languages where there is no state to track anything. Just inputs to functions. The same input always gives the same output

**Consider calculating sum of integers 1 to N**:

Via **Loop**:

```cpp
int solveUsingLoop(int N)
{
    int curr = 1, ans = 0;      // Init tracker and state

    while(curr <= N){           // Exit condition
        ans += curr;            // Do work. It updates state
        curr++;                 // Update tracker
    }

    return ans;                 // Return final state
}
```

Via **Recursion**:

```cpp
int addToSum(int curr, int N, int &ans)
{
    if(curr > N){                       // Exit condition
        return ans;
    }

    ans += curr;                        // Do work. It updates state

    return addToSum(curr + 1, N, ans);  // Schedule work with updated tracker
                                        // and the recently updated state
}

int solveUsingRecursion(int N)
{
    int curr = 1, ans = 0;              // Init tracker and state

    return addToSum(curr, N, ans);      // Start work
}
```

Both these methods can achieve the same final answer

So, technically, you can use recursion to achieve the same work as loops. But that doesn't mean you always should

Note that **Recursion uses a call stack**

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

- Each time a function is called, it gets added onto the call stack
- Each function call entry consists of the data associated with it's call such as:
  - Function **parameters**
  - Function **pointer**
  - **Local variables** created in function body
- After the call executes (i.e. that function returns), the call's entry is popped off the stack and then the stack frame points to the previous (parent caller) function

Thus, deep recusion can require significant **memory usage**. The stack overflow can lead to SegFaults and crash our code

## Tail-Call Optimization

We can optimize the recursive calls' memory usage by this technique. Some compilers even do this iternally under the hood.

There are 2 requirements to be met for tail-call optimization:

1. **ONLY ONE Recursive call** inside the function body
2. That recursive **call should be at the bottom end** inside the function body i.e. it must be the **last operation** inside the function

```cpp
#include <bits/stdc++.h>
using namespace std;

const int COUNT = 2 * 1e9;
const int STEP = 1e4;

void func(int curr){
    if(curr % STEP == 0){
        int temp = COUNT - curr;
        printf("count: %d \n", temp);
        // cout<< "count: " << temp << endl;
    }
    if(curr == 0){
        return;
    }
    func(curr - 1);
}


int main()
{
    func(COUNT);

    return 0;
}
```
