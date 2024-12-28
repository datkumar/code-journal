---
title: Patterns problems (loops)
tags: [cpp, loops]
---

## Patterns with only `*`

<table>
<!--  -->
<tr>
    <th>Pattern</th>
    <th>Code</th>
    <th>Output (n = 4)</th>
</tr>
<!--  -->
<tr>
<td>All cells</td>
<td>

```cpp
for (int y = 0; y < n; y++) {
    for (int x = 0; x < n; x++) {
        cout << "* ";
    }
    cout << endl;
}
```

</td>
<td>

```txt
* * * *
* * * *
* * * *
* * * *
```

</td>
</tr>
<!--  -->
<tr>
<td>Lower-left<br>Triangle</td>
<td>

```cpp
for (int y = 0; y < n; y++) {
    for (int x = 0; x <= y; x++) {
        cout << "* ";
    }
    cout << endl;
}
```

</td>
<td>

```txt
*
* *
* * *
* * * *
```

</td>
</tr>
<!--  -->
<tr>
<td>Upper-left<br>Triangle</td>
<td>

```cpp
for (int y = 0; y < n; y++) {
    for (int x = n; x > y; x--) {
        cout << "*" << " ";
    }
    cout << endl;
}
```

</td>
<td>

```txt
* * * *
* * *
* *
*
```

</td>
</tr>

</table>

---

## Triangle with numbers

<table>
<!--  -->
<tr>
    <th>Pattern</th>
    <th>Code</th>
    <th>Output (n = 4)</th>
</tr>
<!--  -->
<tr>
<td>Lower-left<br>Triangle</td>
<td>

```cpp
for (int x = 1; x <= n; x++) {
    for (int y = 1; y <= x; y++) {
        cout << y << " ";
    }
    cout << endl;
}
```

</td>
<td>

```txt
1
1 2
1 2 3
1 2 3 4
```

</td>
</tr>
<!--  -->
<tr>
<td>Upper-left<br>Triangle</td>
<td>

```cpp
for (int y = 1; y <= n; y++) {
    for (int x = 1; x <= n - y; x++) {
        cout << x << " ";
    }
    cout << endl;
}
```

</td>
<td>

```txt
1 2 3 4
1 2 3
1 2
1
```

</td>
</tr>

<!--  -->
<tr>
<td>Upper-left<br>with numbers<br>x</td>
<td>

```cpp
for (int x = 1; x <= n; x++) {
    for (int y = 1; y <= x; y++) {
        cout << x << " ";
    }
    cout << endl;
}
```

</td>
<td>

```txt
1
2 2
3 3 3
4 4 4 4
```

</td>
</tr>
</table>

---

## New pattern

<table>
<!--  -->
<tr>
    <th>Pattern</th>
    <th>Code</th>
    <th>Output (n = 4)</th>
</tr>
<!--  -->
<tr>
<td>X'mas Tree</td>
<td>

```cpp
for (int y = 1; y <= n; y++) {
    for (int x = 1; x <= n - y; x++) {
        cout << " ";
    }
    for (int x = 1; x <= (2 * y) - 1; x++) {
        cout << "*";
    }
    cout << endl;
}
```

</td>
<td>

```txt
   *
  ***
 *****
*******
```

</td>
</tr>
<!--  -->

</table>
