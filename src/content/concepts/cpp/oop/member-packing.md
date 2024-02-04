---
title: Packing members in a struct
tags: [cpp, oop]
---

```cpp
struct S1 {
    char a;    // 1 byte
    double c;  // 8 bytes
    int b;     // 4 bytes
};
// Size of S1 struct: 24 bytes

struct S2 {
    double c;  // 8 bytes
    int b;     // 4 bytes
    char a;    // 1 byte
};
// Size of S2 struct: 16 bytes
```

Ordering members in a struct can affect memory usage and performance.

Here's how to optimize it:

- **Largest to smallest alignment**: Arrange members with the largest alignment requirements first, followed by those with smaller requirements. Aligning members properly ensures efficient memory access and can improve performance.
- **Cache locality**: Consider how frequently used members are accessed together. Placing them next to each other allows them to reside in the same cache line, improving access speed.
- **Packing**: If you need maximum space efficiency, consider packing the struct. This eliminates padding between members, but can make the code less readable and less portable.

For more info, refer [The Lost Art of Structure Packing](http://www.catb.org/esr/structure-packing/)

Remember that these techniques might affect the readability of your code, and optimizing for space should be done with caution. The best practice is to profile your application to see if the space optimization is necessary and to consult the compiler documentation.
