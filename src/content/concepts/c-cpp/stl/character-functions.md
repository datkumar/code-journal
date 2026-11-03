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
vector<char> getAllPunctuations () {
    vector<char> ans;
    char ch = numeric_limits<char>::min();
    while (true) {
        // Add current character to answer if it is a punctuation
        if (ispunct(ch)) ans.emplace_back(ch);
        // Keep incrementing ahead
        ch++;
        // Stop loop when it overflows back to starting value
        if (ch == numeric_limits<char>::min()) break;
    }
    return ans;
}

int main () {
    const vector<char> allPuncts = getAllPunctuations();
    for (const char &ch : allPuncts) {
        cout << (int)ch << " " << ch << "\n";
    }
}
```

<details>
<summary>Output</summary>

```txt title="Punctuation Characters"
33 !
34 "
35 #
36 $
37 %
38 &
39 '
40 (
41 )
42 *
43 +
44 ,
45 -
46 .
47 /
58 :
59 ;
60 <
61 =
62 >
63 ?
64 @
91 [
92 \
93 ]
94 ^
95 _
96 `
123 {
124 |
125 }
126 ~
```

</details>
