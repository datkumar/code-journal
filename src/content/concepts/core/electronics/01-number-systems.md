---
title: Number Systems
tags: [electronics]
---

**List of Contents**:

- [Notation](#notation)
- [Conversion between Number Systems](#conversion-between-number-systems)
  - [Convert Decimal to Base $b$](#convert-decimal-to-base-b)
  - [Convert Base $b$ to Decimal](#convert-base-b-to-decimal)
  - [Conversions between Binary, Octal and Hexadecimal](#conversions-between-binary-octal-and-hexadecimal)
- [Complement of a Number](#complement-of-a-number)
  - [Diminished Radix Complement](#diminished-radix-complement)
  - [Radix Complement](#radix-complement)
  - [Properties of complements](#properties-of-complements)
- [Subtraction using Complements](#subtraction-using-complements)
  - [Binary Subtraction via 1's Complement](#binary-subtraction-via-1s-complement)
  - [Binary Subtraction via 2's Complement](#binary-subtraction-via-2s-complement)
- [Signed Binary Numbers](#signed-binary-numbers)
  - [Addition and Subtraction with Signed Binary numbers](#addition-and-subtraction-with-signed-binary-numbers)

## Notation

A number $N$ is denoted in base $b$ as:

$$
(N)_b = (d_{n-1} d_{n-2} \cdots d_3 \space d_2 \space d_1 \space d_0 \space d_{-1} d_{-2} \cdots d_{-m})_b
$$

where:

- $b$ is the **base** or **radix** of the number system
- $d_i$ be the $i^{\text{th}}$ **digit** in notation notation of $(N)_b$
- $n$ and $m$ are the number of digits in integer and fractional parts of the notation respectively

The actual value of the number can be found from the notation by expanding it as:

$$
\begin{aligned}
(N)_b &= (d_{n-1} \cdot b^{n-1}) + (d_{n-2} \cdot b^{n-2}) + \cdots + \\
&\quad (d_3 \cdot b^3) + (d_2 \cdot b^2) + (d_1 \cdot b^1) + (d_0 \cdot b^0) +\\
&\quad (d_{-1} \cdot b^{-1}) + (d_{-2} \cdot b^{-2}) + \cdots + (d_{-m} \cdot b^{-m})
\end{aligned}
$$

Below are the commonly used **Number Systems** and their digits:

<strong>

| $(N)_2$ Binary | $(N)_8$ Octal | $(N)_{10}$ Decimal | $(N)_{16}$ Hexadecimal |
| :------------: | :-----------: | :----------------: | :--------------------: |
|      $0$       |      $0$      |        $0$         |          $0$           |
|      $1$       |      $1$      |        $1$         |          $1$           |
|                |      $2$      |        $2$         |          $2$           |
|                |      $3$      |        $3$         |          $3$           |
|                |      $4$      |        $4$         |          $4$           |
|                |      $5$      |        $5$         |          $5$           |
|                |      $6$      |        $6$         |          $6$           |
|                |      $7$      |        $7$         |          $7$           |
|                |               |        $8$         |          $8$           |
|                |               |        $9$         |          $9$           |
|                |               |                    |      $\mathrm{A}$      |
|                |               |                    |      $\mathrm{B}$      |
|                |               |                    |      $\mathrm{C}$      |
|                |               |                    |      $\mathrm{D}$      |
|                |               |                    |      $\mathrm{E}$      |
|                |               |                    |      $\mathrm{F}$      |

</strong>

For example, a number $425.171875$ would be represented:

- In **decimal** system as: $(425.171875)_{10}$
- In **binary** system as: $(110101001.001011)_2$
- In **octal** system as: $(651.13)_8$
- In **hexadecimal** system as: $\mathrm{(1A9.2C)_{16}}$

Note that the actual value of the number is the same i.e. $425.171875$, just represented differently across the number systems. In other words:

$$
\mathrm{
425.171875 = (425.171875)_{10} = (110101001.001011)_2 = (651.13)_8 = (1A9.2C)_{16}
}
$$

The dot between integer and fractional part, which we call a _decimal point_ in decimal system, is referred to as the **radix point** in a generalized base $b$ system. It separates the positive and negative of the base $b$ within the representation

Some commonly used values are summarized in a table below:

| $n$  | $2n$ | $8n$ | $16n$ | $2^n$   | $8^n$   | $16^n$  | $2^{-n}$  | $5^{n}$ |
| ---- | ---- | ---- | ----- | ------- | ------- | ------- | --------- | ------- |
| $1$  | $2$  | $8$  | $16$  | $2$     | $8$     | $16$    | $0.5$     | $5$     |
| $2$  | $4$  | $16$ | $32$  | $4$     | $64$    | $256$   | $0.25$    | $25$    |
| $3$  | $6$  | $24$ | $48$  | $8$     | $512$   | $4096$  | $0.125$   | $125$   |
| $4$  | $8$  | $32$ | $64$  | $16$    | $4096$  | $65536$ | $0.0625$  | $625$   |
| $5$  | $10$ | $40$ | $80$  | $32$    | $32768$ |         | $0.03125$ | $3125$  |
| $6$  | $12$ | $48$ | $96$  | $64$    |         |         |           |         |
| $7$  | $14$ | $56$ | $112$ | $128$   |         |         |           |         |
| $8$  | $16$ | $64$ | $128$ | $256$   |         |         |           |         |
| $9$  | $18$ | $72$ | $144$ | $512$   |         |         |           |         |
| $10$ | $20$ | $80$ | $160$ | $1024$  |         |         |           |         |
| $11$ |      |      |       | $2048$  |         |         |           |         |
| $12$ |      |      |       | $4096$  |         |         |           |         |
| $13$ |      |      |       | $8192$  |         |         |           |         |
| $14$ |      |      |       | $16384$ |         |         |           |         |
| $15$ |      |      |       | $32768$ |         |         |           |         |
| $16$ |      |      |       | $65536$ |         |         |           |         |

Some observations:

- $8^n = (2^3)^n = (2)^{3n}$
- $16^n = (2^4)^n = (2)^{4n}$
- $2^{-n} = \dfrac{1}{2^n} = \left(\frac{1}{2}\right)^n = (0.5)^n$

---

## Conversion between Number Systems

### Convert Decimal to Base $b$

Consider a number say **53.40625**. In **decimal** system, it would be written as $(53.40625)_{10}$. The procedure to find it's base $2$ i.e. **binary** representation is illustrated in below figure

![Decimal to Binary conversion example](/code-journal/diagrams/decimal-to-binary.svg)

**Steps to follow**:

- Break down the given decimal number into integer and fractional parts. The procedures to follow are different for those two parts

- For the **integer part**:
  - At each iteration, we would be dividing the current dividend by the base $b$ as well as noting the quotient and remainder (see the two columns in left part of above image). Initially, the dividend is the whole integer part of given number
  - Divide the current dividend by the base $b$. Note the quotient and remainder. This quotient becomes the dividend for the next step
  - Keep iterating such base $b$ divisions till the dividend becomes zero
  - Now note the remainders starting from bottom to top. This forms the base $b$ representation of the integer part

- For the **fractional part**:
  - At each iteration, we would be multiplying the fractional part by base $b$ and note the digit obtained on left side of the radix point (see the two columns in right part of above image). Initially, the fractional part we'll be starting with is the fractional part of given number
  - The fractional part obtained on right side of the radix would become the input for next iteration
  - Keep iterating such base $b$ multiplications until the fractional part becomes zero or till you reach a sufficient digits of precision
  - Now note the digits on left of radix points from top to bottom. This forms the base $b$ representation of the fractional part

- Finally, combine the base $b$ representations of integer and fractional parts of the given number to get the resulting base $b$ representation of given number

Take another example as the number $297.514$ . To find it's **octal** i.e. base $8$ representation with precision upto 6 digits, follow similar procedure as we did for binary but replace base $2$ with $8$

![Decimal to Octal conversion example](/code-journal/diagrams/decimal-to-octal.svg)

### Convert Base $b$ to Decimal

Since we refer to the decimal value representation of number the "actual" value, we can obtain the decimal representation from the given base $b$ representation of number by simply **adding the terms in the expansion** of multiplying the digits by the respective powers of $b$ associated with those positions.

For example, the decimal representation of **binary** i.e. base $2$ number $(1011001.1011)_2$ would be given as shown in below picture. Since binary has just the digits $0$ and $1$ (also called as **bits**), we only consider the places where the bit is set i.e. $1$ and add the respective powers of $2$ where bits are set

![Binary to Decimal conversion example](/code-journal/diagrams/binary-to-decimal.svg)

Consider another example of **hexadecimal** i.e. base $16$ number $(\mathrm{3E109.7C4})_{16}$. It's decimal value can be calculated as shown in below figure

![Hex to Decimal conversion example](/code-journal/diagrams/hex-to-decimal.svg)

### Conversions between Binary, Octal and Hexadecimal

Note that we start grouping **outwards from the radix point**. Extra zeros can be padded on the left and right if needed.

- **Binary** system representation is the simplest form of representation having just 2 types of digits called bits $0$ and $1$. We usually require a large number of bits to represent a number. To fit larger numbers with shorter number of digits, higher-power representations such as octal and hexadecimal are used
- Since **Octal** means digits are in powers of $8$ i.e. $2^3$, we can make **groups of 3 successive bits** from binary representation to form one digit of octal representation
- Similarly, for **Hexadecimal** representation, digits are in powers of $16$ i.e. $2^4$, so we make **groups of 4 successive bits** from binary representation to form one digit of hexadecimal representation

> Due to the convenience of such grouping and the simpler base $2$ division, we usually first convert any decimal/octal/hex representation into it's binary equivalent and then group it's bits to get the required format's representation

Below figure shows the grouping from the binary representation for a number:

$36433.689208984375 = (1000111001010001.101100000111)_2 = (107121.5407)_8 = (8E51.B07)_{16}$

![Binary to Octal and Hexadecimal example](/code-journal/diagrams/binary-octal-hex.svg)

---

## Complement of a Number

Complements of numbers are used to simplify the subtraction operation and logical manipulation. There are two types of complements used for each of the base systems. There are two types of complements namely:

### Diminished Radix Complement

- It's also referred to as $(b-1)\text{'s}$ complement. For binary (base $2$) systems , it would become $\text{1's}$ complement; for octal (base $8$) systems $\text{7's}$ complement and so on

- Given a number $N$ in base $b$ having $n$ digits, it's $(b-1)\text{'s}$ complement is defined as:

  $$
  \boxed{
  (b^n - 1) - N
  }
  $$

- For example, consider a number $(047602)_8$ in octal (base $8$) system with $6$ digits. Here, $b=8$, $n=6$ and $N=(47602)_8$. Thereby, $\text{7's}$ complement of the number would be $(730175)_8$ as illustrated in below image

### Radix Complement

- It's also referred to as $(b)\text{'s}$ complement. For binary (base $2$) systems , it would become $\text{2's}$ complement; for octal (base $8$) systems $\text{8's}$ complement and so on

- Given a number $N$ in base $b$ having $n$ digits, it's $(b)\text{'s}$ complement is defined as:

  $$
  \boxed{
  (b^n) - N
  }
  $$

  which can also be written as:

  $$
  [(b^n - 1) - N] + 1 \implies  \boxed{ (\text{Diminished Radix Complement}) + 1 }
  $$

- For the above octal number $(047602)_8$ it's $\text{8's}$ complement would be $(730176)_8$ as illustrated in below image

![Complement of Octal Number example](/code-journal/diagrams/complement-of-number.svg)

> The **range** of the number system of $n$ digits would be from the minimum being zero, where all digits are zeros, to the maximum being $(b^n - 1)$, where all digits are $(b-1)$

| Number System | Base | Diminished Radix Complement              | Radix Complement                            |
| ------------- | :--: | ---------------------------------------- | ------------------------------------------- |
| Binary        | $2$  | $1\text{'s compl.}  = (2^n - 1) - N$     | $2\text{'s compl.}  = (2^n - 1) - N + 1$    |
| Octal         | $8$  | $7\text{'s compl.}   =  (8^n - 1) - N$   | $8\text{'s compl.}   = (8^n - 1) - N + 1$   |
| Decimal       | $10$ | $9\text{'s compl.}   =  (10^n - 1) - N$  | $10\text{'s compl.}   = (10^n - 1) - N + 1$ |
| Hexadecimal   | $16$ | $15\text{'s compl.}   =  (16^n - 1) - N$ | $16\text{'s compl.} = (16^n - 1) - N + 1 $  |

A **shortcut** for calculating $\text{2's}$ complement:

- Start copying bits from right onwards upto the first occurence of $1$
- Flip all the bits presenet on the left of that $1$

### Properties of complements

- In binary systems, $\text{1's}$ complement is obtained by simply **flipping the bits**
- In the case of **Radix Complements**, the complement of the complement of a number restores the result back to the original value. However, this restoration behavior is not consistent for Diminished radix complements

## Subtraction using Complements

The basic idea is:

$$
\boxed{A - B \implies A + (\text{Complement of } B)
}
$$

### Binary Subtraction via 1's Complement

We are essentially doing:

$$
A - B \implies A + [\text{(b-1)'s complement of B} ] = A + [(b^n- 1) - B]
$$

Steps for calculating $A - B$ via $\text{1's}$ complement are:

- Calculate $\text{1's}$ complement of $B$ and add it to $A$
- Now, based on whether there's an extra carry bit on the left:
  - If the carry bit is $\mathbf{1}$, the answer is **positive**. Add that carry bit to get the final answer
  - If there is no carry bit i.e. it's value is $\mathbf{0}$, the answer is **negative**. Flip the bits i.e. do $\text{1's}$ complement to get final answer

Below images illustrate $(23 - 14)$ and $(14 - 23)$ subtractions in binary via $\text{1's}$ complement, showing the two cases for the carry bit:

![Subtraction via One's Complement with positive answer](/code-journal/diagrams/subtraction-one-complement.svg)

![Subtraction via One's Complement with negative answer](/code-journal/diagrams/subtraction-one-complement-negative.svg)

### Binary Subtraction via 2's Complement

We are essentially doing:

$$
A - B \implies A + (\text{b's complement of B} ) = A + (b^n - B)
$$

Steps for calculating $A - B$ via $\text{2's}$ complement are:

- Calculate $\text{2's}$ complement of $B$ and add it to $A$
- Now, based on whether there's an extra carry bit on the left:
  - If the carry bit is $\mathbf{1}$, the answer is **positive**. No need of adding the carry bit, **discard** it to get the final answer
  - If there is no carry bit i.e. it's value is $\mathbf{0}$, the answer is **negative**. Do $\text{2's}$ complement of to get the final answer

Below images illustrate $(23 - 14)$ and $(14 - 23)$ subtractions in binary via $\text{2's}$ complement, showing the two cases for the carry bit:

![Subtraction via Two's Complement with positive answer](/code-journal/diagrams/subtraction-two-complement.svg)

![Subtraction via Two's Complement with negative answer](/code-journal/diagrams/subtraction-two-complement-negative.svg)

---

## Signed Binary Numbers

We typically reserve one bit to denote sign, which is generally $0$ denoting positive and $1$ denoting negative numbers. There are two conventions of representing signed binary numbers:

1. **Signed-Magnitude**: This notation is simply just one bit denoting the sign and the rest of the bits denoting the magnitude. This is mostly used by us in our manual calculations, not that much in digital systems

2. **Signed-Complement**: In this notation, the positive numbers stay same as in sign-magnitude form, but the negative numbers are denoted in their complement form. This complement form can be either of $\text{1's}$ complement or $\text{2's}$ complement form. The $\text{2's}$ complement form is more commonly used in digital system as it handles binary arithmetic quite well

Below table shows how the various signed binary notations vary in what they're able to represent across the size of **4 bits**. Note that the left-most bit indicates sign ($0$ for positive, $1$ for negative) and the remaining $3$ bits are for magnitude:

| Decimal | Signed Magnitude | Signed $\text{1's}$ Compl. | Signed $\text{2's}$ Compl. |
| :-----: | :--------------: | :------------------------: | :------------------------: |
|   $7$   | $\mathtt{0111}$  |      $\mathtt{0111}$       |      $\mathtt{0111}$       |
|   $6$   | $\mathtt{0110}$  |      $\mathtt{0110}$       |      $\mathtt{0110}$       |
|   $5$   | $\mathtt{0101}$  |      $\mathtt{0101}$       |      $\mathtt{0101}$       |
|   $4$   | $\mathtt{0100}$  |      $\mathtt{0100}$       |      $\mathtt{0100}$       |
|   $3$   | $\mathtt{0011}$  |      $\mathtt{0011}$       |      $\mathtt{0011}$       |
|   $2$   | $\mathtt{0010}$  |      $\mathtt{0010}$       |      $\mathtt{0010}$       |
|   $1$   | $\mathtt{0001}$  |      $\mathtt{0001}$       |      $\mathtt{0001}$       |
|   $0$   | $\mathtt{0000}$  |      $\mathtt{0000}$       |      $\mathtt{0000}$       |
| Decimal | Signed Magnitude | Signed $\text{1's}$ Compl. | Signed $\text{2's}$ Compl. |
|  $-0$   | $\mathtt{1111}$  |      $\mathtt{1111}$       |            $-$             |
|  $-1$   | $\mathtt{1110}$  |      $\mathtt{1110}$       |      $\mathtt{0000}$       |
|  $-2$   | $\mathtt{1101}$  |      $\mathtt{1101}$       |      $\mathtt{0000}$       |
|  $-3$   | $\mathtt{1100}$  |      $\mathtt{1100}$       |      $\mathtt{0000}$       |
|  $-4$   | $\mathtt{1011}$  |      $\mathtt{1011}$       |            $-$             |
|  $-5$   | $\mathtt{1010}$  |      $\mathtt{1010}$       |      $\mathtt{0000}$       |
|  $-6$   | $\mathtt{1001}$  |      $\mathtt{1001}$       |      $\mathtt{0000}$       |
|  $-7$   | $\mathtt{1000}$  |      $\mathtt{1000}$       |      $\mathtt{0000}$       |
|  $-8$   |       $-$        |            $-$             |      $\mathtt{0000}$       |

**Some observations**:

- The positive number representations are the same for all the three notations
- Other than $\text{2's}$ complement notation, both signed-magnitude and signed-1-complement notations waste one slot on the $-0$ value notation which doesn't exist in reality. This slot is instead used to accommodate $-8$ which the other two notations don't
- This makes $\text{2's}$ complement notation that most optimal. For a size of $n$ total bits, the range for such notation is defined as follows. Note that first bit is used for denoting sign, so now we have $(n-1)$ bits for magnitude:
  - On positive side: &ensp; $\boxed{ 0 \text{ \, to \, } (2^{n-1} \, - 1) }$
  - On negative side: &ensp; $\boxed{-1 \text{ \, to \, } -(2^{n-1}) }$

### Addition and Subtraction with Signed Binary numbers

The procedure is the same as we were doing for unsigned numbers. Just remember to:

- Keep the negative numbers in their $\text{2's}$ complement form
- Include the left-most sign bit in the calculations as well
- Discard the carry bit if it arises out at the left-most end

![Addition of Signed Binary Numbers example](/code-journal/diagrams/signed-arithmetic-addition.svg)

For subtractions, the same method as earlier is used just with $\text{2's}$ complement:

$$
A - B = A + (-B) = A + (\text{2's complement of } B)
$$

In other words, $-B$ is kept as $(\text{2's complement of } B)$, with the left-most sign bit included.

The complement of complement returning same number property holds true within signed numbers too i.e.

$$
-(-B) = B
$$
