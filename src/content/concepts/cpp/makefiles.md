---
title: Makefiles
tags: [cpp]
---

## Writing a makefile

<details>
    <summary>Code files: <code>code.cpp</code> , <code>tests.cpp</code></summary>

```cpp title="code.cpp"
#include <iostream>
using namespace std;

int main()
{
    cout << "Code go brrr 🔥🔥🔥" << endl;

    return 0;
}
```

```cpp title="tests.cpp"
#include <iostream>
using namespace std;

int main()
{
    cout << "Testing ✅✅✅" << endl;

    return 0;
}
```

</details>

**Note**: We have used the `CC` macro as the variable denoting the compiler

```make title="Makefile"
CC=g++

make: run_app run_tests cleanup

run_app: code.cpp
    $(CC) code.cpp -o application
    ./application

run_tests:
    $(CC) tests.cpp -o tests.out
    ./tests.out

cleanup:
    rm application tests.out
```

## Running makefile

```sh
make
```

**Output**:

```txt
g++ code.cpp -o application
./application
Code go brrr 🔥🔥🔥
g++ tests.cpp -o tests.out
./tests.out
Testing ✅✅✅
rm application tests.out
```
