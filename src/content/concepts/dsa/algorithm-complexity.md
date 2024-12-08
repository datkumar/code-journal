---
title: Algorithm Complexity
tags: [dsa]
---

The actual running time (or space) of an algorithm is not a good measure for evaluating algorithms as it varies on the underlying hardware present. A better measure is the number of steps or instructions to be executed as a function of the **input size (n)**. We typically want to know the growth rate of the algorithm for large enough (asymptotic) inputs, denoted by [Asymptotic Notations](#asymptotic-notations)

## Complexity Chart

<img  alt="Big-O Complexity Chart" src="/code-journal/images/big-o-chart.png" >

> **Increasing Order of Complexity:** <br> $$O(1) < O(logn) < O(\sqrt n) < O(n) < O(n \cdot logn) < O(n^2) < O(n^3) < O(2^n) < O(n!) < O(n^n)$$

---

## Tricky examples

1. **Limited opposite direction loops** [[MCQ]](https://www.interviewbit.com/problems/nestedcmpl2/)

   ```cpp
   int ans = 0;
   for (int i = 0; i < N; i++) {      // i: 0 to N
      for (int j = N; j > i; j--) {   // j: N to i
         ans += i + j;
      }
   }
   ```

   $= N + (N-1) + (N-2) + ... + 1$

   $= N(N+1) / 2 \implies O(N^2)$

2. **Amortized Complexity** [[MCQ]](https://www.interviewbit.com/problems/amortized1/)

   ```cpp
   int j = 0, count = 0;
   for(int i = 0; i < N; ++i) {           // i: 0 to N
       while(j < N && arr[i] < arr[j]) {  // j increments ONLY when next element is smaller
           j++;
           count++;
       }
   }
   ```

   Note that `j` variable is **NOT re-initialized** each time and `j++` would be run **at most** `N` times (when descending sorted array), over **ALL** values of `i`. So, max time complexity would be `O(2 * N) = O(N)`

3. **Division with nesting**

   ```cpp
   int count = 0;
   for (int i = N; i > 0; i /= 2) {    // i: N, N/2, N/4, ...
       for (int j = 0; j < i; j++) {   // j: 0 to i
           count++;
       }
   }
   ```

   $= N + (N/2) + (N/4) + (N/8) + \dots$

   $= N \cdot (1 + \frac{1}{2} + \frac{1}{4} + \frac{1}{8} + ...)$

   $\approx N \cdot 2 \implies O(N)$

4. **Result-limited loop**

   ```cpp
   int ans = 0;
   for(int i = 1; ans < N; i++) {
       ans += i;
   }
   ```

   Here we can see `ans` is like sum of natural numbers. Let `i` in loop go on till `k`. Loop exits when `ans >= N`

   $\therefore ans = k(k+1)/2 = N$

   $\therefore k^2 + k = 2N$

   $\therefore k \approx \sqrt{2N} \space \text{ ... ignoring smaller terms}$

   $\implies k = O(\sqrt{N})$

---

## Asymptotic Notations

Refer [Abdul Bari video](https://youtu.be/A03oI0znAoc?si=YoBhnMxYnzoE71sb)

| Name          |    Symbol     | Meaning         |
| ------------- | :-----------: | --------------- |
| **Big-O**     |   $O(...)$    | _Upper-bound_   |
| **Theta**     | $\Theta(...)$ | _Average-bound_ |
| **Big-Omega** | $\Omega(...)$ | _Lower-bound_   |

- **ANY** of the above notations can be used to denote Best / Worst / Average case complexity
- We **prefer** the bound that is **closest** to the actual function's curve

### Properties of Asymptotic notations

1. **Multiplication by constant 'k'** (ALL)

   $$f(n) \in O(g(n)) \implies k \cdot f(n) \in O(g(n))$$

2. **Reflexive** (ALL)

   $$f(n) \in O(f(n))$$

3. **Symmetric** (ONLY Average-bound)

   $$f(n) \in \Theta(g(n)) \implies g(n) \in \Theta(f(n))$$

4. **Transitive** (ALL)

   $$f(n) \in O(g(n)) \space,\space g(n) \in O(h(n)) \implies f(n) \in O(h(n))$$

5. **Transpose Symmetric**: (ONLY Upper and Lower bounds)

   $$f(n) \in O(g(n)) \implies g(n) \in \Omega(f(n))$$

<details>
<summary><strong>More properties</strong></summary>

- $f(n) \in \Omega(g(n)) \space,\space f(n) \in O(g(n)) \implies f(n) \in \Theta(g(n)$

- $f_1(n) \in O(g_1(n)) \space,\space f_2(n) \in O(g_2(n)) \implies (f_1(n) + f_2(2)) \in O(\space max( g_1(n),g_2(n) ) \space)$

- $f_1(n) \in O(g_1(n)) \space,\space f_2(n) \in O(g_2(n)) \implies (f_1(n) \ast f_2(2)) \in O( g_1(n) \ast g_2(n))$

- $\forall \space b > 1, \space log_b(n) \in O(log(n))$

- $a_m n^m + a\_{m-1} n^{m-1} + ... \in O(n^m) \space \text{ i.e. upper bound of polynomial is the highest power term}$

- $\text{For any constant $k$, } k \in O(1)$

</details>

---

## Amortized Complexity

The motivation for amortized analysis is that looking at the **worst-case run time can be too pessimistic**. Instead, amortized analysis averages the running times of operations in a sequence over that sequence.

For a given operation of an algorithm, certain situations may imply a significant cost in resources, whereas other situations may not be as costly. The amortized analysis **considers both the costly and less costly operations together over the whole sequence of operations**. This may include accounting for different types of input, length of the input, and other factors that affect its performance.

Refer: [Wikipedia section](https://en.wikipedia.org/wiki/Amortized_analysis), [StackOverflow post](https://stackoverflow.com/questions/15079327/amortized-complexity-in-laymans-terms)

---

> $\text{How } n! \text{ is } O(n^n)$

$n! = [n \cdot (n-1) \cdot (n-2) \cdot ... \cdot 1] \space\space\text{ with 'n' terms }$

$n^n = [n \cdot n \cdot n \cdot ... \cdot n] \space\space\text{ with 'n' terms }$

$\therefore n^n > n! \implies n! = O(n)$

> $\text{How } log(n!) \text{ is } O(n \cdot logn)$

$\text{Note that } n \cdot logn = log(n^n)$

$\because n^n > n! \implies log(n^n) > log(n!) \implies log(n!) = O(n \cdot logn)$
