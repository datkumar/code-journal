---
title: Measuring running time of code in C++
tags: [cpp]
---

Below are the two common approaches to benchmark the time taken by a code block in C++

## 1. Using `clock()` from `<ctime>` library

This is a simple approach, but it has limitations:

```cpp
#include <ctime>
#include <iostream>
using namespace std;

int main() {
    clock_t start = clock(); // Start the clock

    // Your code block to be benchmarked
    for (int i = 0; i < 1e9; ++i) {
        // Do some work here
    }

    clock_t end = clock(); // Stop the clock
    double seconds_elapsed = double(end - start) / CLOCKS_PER_SEC;

    cout << "Time taken: " << seconds_elapsed << " sec" << endl;

    return 0;
}
```

**Explanation**:

- `clock()` returns the processor time used by the program since it started (not wall clock time).
- `CLOCKS_PER_SEC` is a constant that represents the number of clock ticks per second on your system.
- Divide the difference between end and start by `CLOCKS_PER_SEC` to get the elapsed time in seconds.

**Limitations**:

- `clock()` measures CPU time, not wall clock time. This means it **won't capture time spent waiting for I/O operations or other external factors**.
- The resolution of `clock()` might be coarse and **may not be suitable for very short code** blocks.

## 2. Using `<chrono>` Library (recommended)

The `<chrono>` library provides a more accurate and versatile way to measure time

```cpp
#include <chrono>
#include <iostream>
using namespace std;

int main() {
    auto start = chrono::steady_clock::now(); // Start time

    // Your code block to be benchmarked
    for (int i = 0; i < 1e9; ++i) {
        // Do some work here
    }

    auto end = chrono::steady_clock::now(); // End time

    auto seconds_elapsed = chrono::duration_cast<chrono::duration<double>>(end - start).count();

    cout << "Time taken: " << seconds_elapsed << " sec" << endl;

    return 0;
}
```

**Explanation**:

- `std::chrono::steady_clock` provides a high-resolution clock that measures wall clock time independent of system clock adjustments.
- `now()` gets the current time from the clock.
- `duration_cast` converts the difference between `end` and `start` to a `duration<double>` type, representing the elapsed time in seconds.
- `.count()` extracts the actual number of seconds from the duration object

**Advantages**:

- More accurate measurement of wall clock time.
- Higher resolution compared to `clock()`.
- More control over the time unit (seconds, milliseconds, etc.)

---

### Additional considerations

- For very short code blocks, consider repeating the code multiple times within the loop and measuring the total time to improve accuracy.
- Run the benchmark multiple times and take the average to account for system fluctuations.
- Consider using libraries or microbenchmarking frameworks for more advanced benchmarking needs.
