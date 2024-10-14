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
    cout << "Application code is being executed 🔥🔥🔥" << endl;

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

```make title="Makefile"
CC=g++

make: build run cleanup

build: *.cpp
    $(CC) -std=c++17 -Wall -O2 code.cpp -o application
    $(CC) tests.cpp -o tests

run: ./application ./tests
    ./tests
    ./application < input.txt > output.txt

cleanup:
    rm application tests

.PHONY: make build run cleanup
```

Note that the file name of the Makefile is case-insensitive

- We can define multiple recipes (such as `make`, `build`, `run` etc. above) of our build system in a Makefile. Then run one, more or all of those
- Right next to the script name, we define the **target** files that have to be watched for that step. Updates are made only if there are changes in the target files. It's a good practice to specify all the linked or related source code files as target
- We can define macros denoting variables such as `CC` here that denotes the compiler. Another example is `CXXFLAGS` to store compilation flags
- The `.PHONY` indicates the names of all the recipes so that they aren't mistaken for file names. This prevents conflicts between them.

## Running makefile

```sh title="bash"
# This will run all steps specified under "make" step
make
```

The output would look like:

```txt
g++ -std=c++17 -Wall -O2 code.cpp -o application
g++ tests.cpp -o tests
./tests
Testing ✅✅✅
./application < input.txt > output.txt
rm application tests
```

If we only want to run one or a few of the available steps we can do it as:

```sh title="bash"
make build
make run cleanup
```

Generally, Makefiles are used in **C/C++** projects, but you can use it to create build system for **any language** project. Here's a similar sample Makefile for **Java** project:

```make title="Java Makefile"
make: compile run cleanup

compile: *.java
    javac *.java

run: Demo.class
    java Demo < input.txt > output.txt

cleanup:
    rm *.class

.PHONY: make compile run cleanup
```

Makefiles are usually explicit and **platform-dependent**. For higher-level build configuration that is platform-independent, you can check out [**`cmake`**](https://cmake.org) that uses `CMakeLists.txt` file
