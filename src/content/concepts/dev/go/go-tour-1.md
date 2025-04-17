---
title: "Tour-1: HelloWorld, Variables, Loops, Conditions"
tags: [go]
---

Following [A Tour of Go](https://go.dev/doc/#go_tour) section in the docs of the Go programming language

## First Go program

The [Standard Library](https://pkg.go.dev/std) contains many packages for your needs such as `fmt` for formatting text

- To create a Go project, use the `go mod init` command

  ```sh title="Create Go project"
  go mod init example/hello
  ```

- Every Go program is made up of packages. Programs start running in package `main`. By convention, the package name is the same as the **last element of the import path**. For instance, the `math/rand` package comprises files that begin with the statement `package rand`

  ```go title="hello.go"
  package main // Define which package the file belongs to

  import "fmt" // Import for formatting text

  // Driver code
  func main() {
      fmt.Println("Hello World")
  }
  ```

- To run your Go program:

  ```sh title="Running a Go program"
  # By specifying file to run
  go run hello.go
  # Looks for the "main" package and runs it
  go run .
  ```

- **Imports**:

  ```go
  // Factored import statement (recommended):
  import (
      "fmt"
      "time"
  )
  // Multi-line import statements
  import "math"
  import "sort"
  ```

- **Exports**: must start with a Capital letter such as `Println` and `Pi` here. When you import them, you'll also refer them in that letter casing

  ```go
  fmt.Println(math.Pi)
  ```

---

## Variables

- The `var` statement declares a list of variables. It can be at package or function level. Similar to function parameters, the type is mentioned at the end:

  ```go
  // At Package level:
  var a, b bool

  func main() {
      // At Function level:
      var c, d string
      var e int
      var f int
      fmt.Println(a, b, c, d, e, f)
      // false false   0 0
  }
  ```

- For variable **initialization**, if the value is provided, the type can be omitted (type-inference). You can also initialize different data types in same line

  ```go
  var w int = 5
  var x, y = 1, 2
  var z = 6
  var p, q, r = "Hello", 420, true

  func main() {
      var a int = 13
      var b, c = 7, 4
      var d = 8
      var e, f, g = "World", 99, true
      fmt.Println(a, b, c, d, e, f, g)
      fmt.Println(w, x, y, z, p, q, r)
      // 13 7 4 8 World 99 true
      // 5 1 2 6 Hello 420 true
  }
  ```

- There is also a short variable declaration syntax via the `:=` syntax. However, this can be used **only inside a function**:

  ```go
  // a := 5  // Not Allowed

  func main() {
      b := 10
      c, d, e := 512, true, "Hello"
      fmt.Println(b, c, d, e)
      // 10 512 true Hello
  }
  ```

- Variable declarations can also be **factored into blocks**, just like the import statements

  ```go
  var (
      a string = "Hello"
      b int16  = 1024
  )

  func main() {
      var (
        c byte    = 'E'
        d float32 = 3.14
      )
      fmt.Println(a, b, c, d)
  }
  ```

- **Zero value**: These are the default values assigned to variables that weren't initialized to a value during their declaration. It is `0` for numeric types, `false` for boolean types and empty string `""` for strings

- **Type-casting**: one type value can be converted into another value via `Type(variable)`:

  ```go
  var a uint = 15
  var b float64 = float64(a)
  c := int64(a)
  ```

### Constants

Use `const` keyword at the start to make a variable value as constant. Note that you **cannot use** `:=` syntax while declaring constants. These can also be factored inside `()`

```go
const a = 10
const Alpha = 4.318
const (
    b = 6.34
    c = "Hello"
)

func main() {
    const d = true
    const Beta = "abc"
    const (
        e = 'A'
        f = 1024
    )
    fmt.Println(a, b, c, d, e, f)
    fmt.Println(Alpha, Beta)
    // 10 6.34 Hello true 65 1024
    // 4.318 abc
}
```

In above example, the `Alpha`, `Beta` values can be accessed outside the package but that isn't so for `a`, `b`

> The visibility of a name outside a package is determined by whether its first character is upper case. All identifiers (variables, constants, functions) whose **name starts with a capital letter** are **exported**

---

## Loops

- Go **ONLY** has the `for` looping construct. It has the usual 3 parts i.e. init-tracker, condition-check the tracker, update-tracker. Note that there are no parentheses required like `for(...)` but the braces `{...}` are **ALWAYS** required

  ```go
  sum := 0
  for i := 1; i <= 10; i++ {
      sum += i
  }
  fmt.Println("Sum:", sum) // 55
  ```

  Variables declared within the loop i.e. `i` in above example are only valid inside the the loop's block scope i.e. inside the braces `{}` of the `for` loop

- The init-tracker and update-tracker steps are optional:

  ```go
  i, sum := 1, 0
  for ; i <= 10; {
      sum += i
      i++
  }
  ```

  At that point, you can drop the semicolons too. The formatter would automatically do it for you:

  ```go
  i, sum := 1, 0
  for i <= 10 {
      sum += i
      i++
  }
  fmt.Println("Sum:", sum)
  ```

  You might say it looks like a `while` loop and it **IS** how you can write while loops in Go via the `for` keyword

- You can even go one step further, **omitting all** the 3 parts in the `for` statement. The result is an **infinite loop** (add a `break` somewhere to terminate it instead of running forever)

  ```go
  for {
      // body
  }
  ```

- The **for-each** loop behavior is achieved by using the `range` function below

### Range function

- The `range` form of the `for` loop iterates over a slice or map. For each iteration, it returns two values: first the **index** and second a **copy of element** at that index

  ```go
  var arr = []int{35, 99, 7, 62}

  func main() {
      for idx, val := range arr {
        fmt.Printf("arr[%d] = %d \n", idx, val)
      }
      // arr[0] = 35
      // arr[1] = 99
      // arr[2] = 7
      // arr[3] = 62
  }
  ```

- If you are not using either one of the index or value at the index coming from `range` function, mark it with `_`. For omitting second value, you can also just not include it

  ```go
  for idx, _ := range arr { ... }
  for _, val := range arr { ... }
  for idx := range arr { ... }
  ```

---

## Conditionals

Go conditional statements are similar to it's `for` loops

- Like `for`, the parentheses `()` aren't compulsory but the braces `{}` are required

  ```go
  func sqrt(x float64) string {
    if x < 0 {
      return sqrt(-x) + "i"
    }
    return fmt.Sprint(math.Sqrt(x))
  }

  func main() {
    fmt.Println(sqrt(16), sqrt(-4))
    // 4 2i
  }
  ```

- Like `for`, you can have a short initialize statement before the condition

  ```go
  func pow(x, n, lim float64) float64 {
    if v := math.Pow(x, n); v < lim {
      return v
    }
    return lim
  }
  ```

- The variable declared in the statement i.e. `v` in above example are only valid inside the block `{}` scope of the `if` and it's respective `else`

  ```go
  func pow(x, n, lim float64) float64 {
    if v := math.Pow(x, n); v < lim {
      return v
    } else {
      fmt.Printf("%g >= %g\n", v, lim)
    }
    // can't use v here, though
    return lim
  }
  func main() {
    fmt.Println(
      pow(3, 2, 10),
      pow(3, 3, 20),
    )
    // 27 >= 20
    // 9 20
  }
  ```

---

## Switch-cases

- Go only runs the matched case, not other cases that follow. So, you don't need to write `break` at the end of each case. Remember that cases are evaluated top to bottom and it stops at the first match found.
- Like `for` and `if`, you can also have an initializer statement at start of `switch` statement
- You can put multiple values, expressions inside a `case` condition statement

  ```go
  func main() {
      switch platform := runtime.GOOS; platform {
      case "linux", "openbsd", "freebsd":
          fmt.Println("Based:", platform)
      case "darwin", "ios":
          fmt.Println("Soy:", platform)
      case "windows":
          fmt.Println("Noob:", platform)
      default:
          fmt.Println("Weird:", platform)
      }
      // To see all platforms: go tool dist list
  }
  ```

- You can also have `switch` without a condition, which is the same as `switch true`. This can be a clean way to write long if-then-else chains:

  ```go
  func main() {
      t := time.Now()
      switch {
      case t.Hour() < 12:
          fmt.Println("Good morning!")
      case t.Hour() < 17:
          fmt.Println("Good afternoon.")
      default:
          fmt.Println("Good evening.")
      }
  }
  ```
