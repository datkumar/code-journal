---
title: Binary Codes
tags: [electronics]
---

- An $n\text{-bit}$ binary code is a group of $n$ bits that assume upto $(2^n)$ distinct comnbinations of $\text{0's}$ and $\text{1's}$ with each element representing one element of the set that is being coded
- Each element must be assigned a unique binary bit combination, and no two elements can have the same value; otherwise the code assignment will be ambiguous
- Although the **minimum** number of bits required to code $2^n$ combinations is $n$, there **no limit** on the **maximum** number of bits that may be used for a binary code

## BCD

The $10$ digits of the decimal system are each coded as in their binary form, which is why this format is known as **Binary-Coded Decimal (BCD)**. Below table shows BCD notation for each of the decimal digits:

| Decimal Symbol |    BCD Digit    |
| :------------: | :-------------: |
|   $\text{0}$   | $\mathtt{0000}$ |
|   $\text{1}$   | $\mathtt{0001}$ |
|   $\text{2}$   | $\mathtt{0010}$ |
|   $\text{3}$   | $\mathtt{0011}$ |
|   $\text{4}$   | $\mathtt{0100}$ |
|   $\text{5}$   | $\mathtt{0101}$ |
|   $\text{6}$   | $\mathtt{0110}$ |
|   $\text{7}$   | $\mathtt{0111}$ |
|   $\text{8}$   | $\mathtt{1000}$ |
|   $\text{9}$   | $\mathtt{1001}$ |

- We are using $4$ bits to code each one of the decimal digits, where we are using up only $10$ of the total $16$ combinations. The combinations $\mathtt{1010}$ to $\mathtt{1111}$ are unused and have no meaning in BCD
- A number with $k$ decimal digits will need $4k$ bits in BCD. Thus, number representation in BCD needs more bits than for representing it's equivalent in binary
- You must not forget that BCD numbers are decimal number and not binary numbers, even though they use bits in their representation

### BCD Addition

The maximum possible sum of two decimal digits in BCD, with a possible carry from previous digits would be $9 + 9 + 1 = 19$. Thereby, if we were to add the BCD digits as if they were binary, the result would be in the range from $0$ to $19$ i.e. $(0000)_2$ to $(10011)_2$ in binary.

However for BCD, if the sum of digits exceeds $(9)_2$ i.e. more than $(1001)_2$, it is not a valid BCD digit. To get the correct sum value of binary digits as well as a carry on the higher bit position, we add a correction factor of $(0110)_2$ i.e. $6$ whenever the binary sum of BCD digit is equal to or greater than $10$ i.e. $(1010)_2$

![BCD Addition example](/code-journal/diagrams/bcd-addition.svg)

<!-- TODO: Other codes: Gray, BCD, ASCII etc -->

<!--
## Other Decimal Codes
## Gray Code
## ASCII
## Error-Detecting Code
-->
