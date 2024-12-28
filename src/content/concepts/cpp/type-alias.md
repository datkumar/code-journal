---
title: Type Aliases in C++
tags: [cpp]
---

## Via `typedef` keyword

```cpp
// Type Aliases:
typedef long long ll;
typedef vector<int> vi;
typedef vector<vi> vvi;
typedef pair<int, int> pi;

void printVector (vector<int> &arr) {
    cout << "[ ";
    for (const int &x : arr) cout << x << ", ";
    cout << "]" << endl;
}

int main () {
    ll bigNumber = 2e11;
    cout << bigNumber << endl;  // 200000000000

    pi entry = {9, 11};
    cout << entry.first << ", " << entry.second << endl;  // 9, 11

    vi nums(5, 2);
    printVector(nums);  // [ 2, 2, 2, 2, 2, ]

    vvi mat1(3, vi(4, 1));
    cout << "[ " << endl;
    for (auto &row : mat1) {
        cout << "  ";
        printVector(row);
    }
    cout << "] ";
    // [
    //   [ 1, 1, 1, 1, ]
    //   [ 1, 1, 1, 1, ]
    //   [ 1, 1, 1, 1, ]
    // ]
    return 0;
}
```

## Via `using` keyword

```cpp
// Type Aliases:
using ll = long long;
using vi = vector<int>;
using vvi = vector<vi>;
using pi = pair<int, int>;

// ... The remaining code and output would be same as previous example ...
```

## Which one's better?

Both `typedef` and `using` allow you to create type aliases, but `using` is considered more versatile and modern, especially when working with templates

- **Improved syntax**: `using` has a more natural, declarative syntax compared to `typedef`. Consider a A pointer-to-function type alias named `Callback`:

  ```cpp
  typedef void (*Callback)(int, int);
  // vs
  using Callback = void (*)(int, int);
  ```

- **Support for Templates**: `typedef` does not work well with templates, while using handles templates cleanly. Consider template alias for a `vector` of any type

  ```cpp
  using vi = vector<int>;

  // Template alias:
  template <typename T>
  using Mat = vector<vector<T>>;

  void printVector (vector<int> &arr) {
      cout << "[ ";
      for (const int &x : arr) cout << x << ", ";
      cout << "]" << endl;
  }

  int main () {
      Mat<int> mat1(2, vi(3, 1));
      cout << "[ " << endl;
      for (auto &row : mat1) {
          cout << "  ";
          printVector(row);
      }
      cout << "] ";
      // [
      //   [ 1, 1, 1, ]
      //   [ 1, 1, 1, ]
      // ]
      return 0;
  }
  ```
