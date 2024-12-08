---
title: "Tour-3: Functions"
tags: [go]
---

## Functions

- Note that the **data type comes AFTER the variable name**. Refer [Go's declaration syntax](https://go.dev/blog/declaration-syntax) to know why

  ```go
  func add(x int, y int) int {
      return x + y
  }

  func main() {
      fmt.Println("Sum:", add(8, 15)) // Sum: 23
  }
  ```

- When two or more consecutive named parameters share the **same type**, you can **omit** the type from **all but the last** parameter

  ```go
  func greet(first, last string, age int) {
      fmt.Println("Hello", first, last)
      fmt.Println("You are", age, "years old")
  }

  func main() {
      greet("John", "Doe", 25)
      // Hello John Doe
      // You are 25 years old
  }
  ```

- A function can **return multiple values** also. You have to wrap them within `()`

  ```go
  func swap(x, y string) (string, string) {
      return y, x
  }

  func main() {
      a, b := swap("Hello", "World")
      fmt.Println(a, b)
      // World Hello
  }
  ```

- Function **return values may be named**. If so, they are **treated as variables** defined at the top of the function (hoisting??). These names should be used to **document the meaning** of the return values

  ```go
  func split(num int) (x, y int) {
      x = num * 4 / 9
      y = num - x
      return
  }

  func main() {
      fmt.Println(split(17))
      // 7 10
  }
  ```

  A return statement without arguments returns the named return values. This is known as a **naked return**. They should be used only in short functions, as for longer functions, it can harm readability.

## Defer

- It **pauses** the execution of the function until the **surrounding function returns**. For more info, refer their blogpost on [Defer, Panic, and Recover](https://go.dev/blog/defer-panic-and-recover)

  ```go
  func F1() {
      fmt.Println("inside F1")
  }

  func main() {
      fmt.Println("Begin")
      defer F1()
      fmt.Println("End")
      // Begin
      // End
      // inside F1
  }
  ```

- The `defer` calls of the function are pushed onto a **Stack**. When a function returns, its deferred calls are executed in **LIFO** order

  ```go
  func main() {
      fmt.Println("Start counting")
      for i := 0; i < 3; i++ {
          defer fmt.Println(i)
      }
      fmt.Println("Done counting")
      // Start counting
      // Done counting
      // 2
      // 1
      // 0
  }
  ```

## More on Functions

### Functions as values

Functions are **values** too. That means:

- functions can be passed around as **arguments** to other functions
- You can have a function a **return value** from another function

  ```go
  // Takes "operation" function having signature (int,int)->int as an argument
  func applyOperation(a, b int, operation func(int, int) int) int {
      return operation(a, b) // Call that passed function on the two numbers
  }

  func main() {
      num1, num2 := 7, 5

      add := func(x, y int) int { return x + y }
      multiply := func(x, y int) int { return x * y }

      fmt.Println("Sum:", applyOperation(num1, num2, add))          // Sum: 12
      fmt.Println("Product:", applyOperation(num1, num2, multiply)) // Product: 35

      // Anonymous function passed as argument
      fmt.Println("Difference:", applyOperation(num1, num2, func(x, y int) int {
          return x - y
      }))
      // Difference: 2
  }
  ```

### Closures

- Go functions may be closures. A closure is a function value that references variables from outside its body. The function may access and assign to the referenced variables; in this sense the function is "bound" to the variables

  ```go
  // A closure that keeps track of account balance
  func bankAccount(initialBalance int) func(int) int {
      balance := initialBalance
      return func(amount int) int {
          // Add the deposit OR subtract the withdrawal
          balance += amount
          return balance
      }
  }

  func main() {
      // Create two independent accounts
      savings, checking := bankAccount(100), bankAccount(200)
      // Simulate transactions:
      fmt.Println("SAVINGS ACCOUNT:")                      // SAVINGS ACCOUNT:
      fmt.Println("After depositing $50:", savings(+50))   // After depositing $50: 150
      fmt.Println("After withdrawing $20:", savings(-20))  // After withdrawing $20: 130
      fmt.Println("CHECKING ACCOUNT:")                     // CHECKING ACCOUNT:
      fmt.Println("After withdrawing $30:", checking(-30)) // After withdrawing $30: 170
  }
  ```

- Here's an example of generating **Fibonacci numbers** with function **closures**:

  ```go
  func fibonacci() func() int {
      plusOne, plusTwo := 0, 1
      return func() int {
          curr := plusOne
          plusOne = plusTwo
          plusTwo = curr + plusOne
          return curr
      }
  }

  func main() {
      getNextFibNum := fibonacci()
      for i := 0; i < 6; i++ {
          fmt.Printf("Fib(%d) = %d \n", i, getNextFibNum())
      }
      // Fib(0) = 0
      // Fib(1) = 1
      // Fib(2) = 1
      // Fib(3) = 2
      // Fib(4) = 3
      // Fib(5) = 5
  }
  ```
