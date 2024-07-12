---
title: C++ Character functions
tags: [cpp, stl]
---

Following functions are a part of the `<cctype>` header file

## Checking character class

Note: `true` is `1` and `false` is `0` in these functions

- `isalpha(char c)` : Returns true if `c` is **a-z** or **A-Z**
- `isupper(char c)` : Returns true if `c` is **A-Z** i.e. UPPERCASE
- `islower(char c)` : Returns true if `c` is **A-Z** i.e. lowercase
- `isdigit(char c)` : Returns true if `c` is **0-9**
- `isxdigit(char c)` : Returns true if `c` is hexadecimal digit (**0-9** or **a-f**)
- `isalnum(char c)` : Returns true if `c` is alphanumeric (**a-z** or **A-Z** or **0-9**)
- `isblank(char c)` : Returns true if `c` is a **space or tab**
- `ispunct(char c)` : Returns true if `c` is a punctuation mark
- `isprint(char c)` : Returns true if `c` is printable on console

## Changing case

- `tolower(char c)` - returns lowercase equivalent of input character.
- `toupper(char c)` - returns UPPERCASE equivalent of input character.

---

Code to print **ALL punctuation** characters:

```cpp
char c = numeric_limits<char>::min();
while (true)
{
    if (ispunct(c)) {
        cout << c << " ";
    }
    c++;
    // Stop when it overflows back to starting value
    if (c == numeric_limits<char>::min()) {
        break;
    }
}
cout << endl;
```

Output:

```txt
! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \ ] ^ _ ` { | } ~
```
