---
title: Big-O Complexity
tags: [dsa]
---

## Complexity Chart

<img  alt="Big-O Complexity Chart" src="/code-journal/images/big-o-chart.png" >

## Decreasing Order of Complexity

\\( O(n!) > O( 2^n ) >> O(n^2) > O(n \cdot log(n)) > O(n) > O(log(n)) > O(1) \\)

## Examples

```txt
ans = 0;
for (i = 0; i < N; i++) {       i:0-->N
    for (j = N; j > i; j--) {   j:N-->i
        ans += i + j;
    }
}
```

\\( = (N) + (N-1) + (N-2) + \dots (1) \\)

\\( = N (N+1) / 2 \\)

\\( = O(N^2) \\)
