# C++ Notes

- `cout << "\n"` faster than `cout << endl` as `endl` clears the buffer each time
- Single quotes `'_'` for character and double quotes `"..."` for string
- data types: `bool`, `char`, `int`, `long`, `long long`, `float`, `double`, `long double`

  Approx. ranges to remember

  |    Type     | Approx range      |
  | :---------: | ----------------- |
  |    `int`    | -(10^9) to 10^9   |
  |   `long`    | -(10^12) to 10^12 |
  | `long long` | -(10^18) to 10^18 |

- Taking string input:

  ```cpp
  string s1;
  cin>>s1;            // Hello World 123 3.14
  cout<< s1 <<endl;   // Hello
  ```

  ```cpp
  string s2;
  getline(cin, s2);   // Hello World 123 3.14
  cout<< s2 <<endl;   // Hello World 123 3.14
  ```

- Arrays are always passed by reference. But for other data types, we can specify whether to pass by value or by reference
- Use `struct` for complex data instead of `pair` or `tuple` for better readability
