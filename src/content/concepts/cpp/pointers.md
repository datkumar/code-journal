---
title: Pointers
tags: [cpp]
---

```cpp
int x = 5;
int *p1;
p1 = &x;
cout << p1 << "  " << *p1 << endl;
int y = 3;

int *p2 = new int[25];
```

> `itr->member` is equivalent to `(*itr).member`

```cpp
void func1(int arr[]) {...}
void func2(int *arr)  {...}
```

Both `func` and `func2` are equivalent

`*arr` could point to a single integer OR to the starting element of a dynamic array
