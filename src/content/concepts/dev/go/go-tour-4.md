---
title: "Tour-4: Methods, Interfaces, Errors"
tags: [go]
---

## Methods

- Go does **NOT** have **classes**. But you can define **methods** on a `type`
- A method is a function with a special **receiver** argument. It appears in its own argument list between `func` and the method name

  ```go
  type Student struct {
      id    int
      name  string
      marks []int
      gpa   float64
  }

  func (obj Student) CalculateGpa() float64 {
      totalMarks := 0
      for _, marks := range obj.marks {
          totalMarks += marks
      }
      avgMarks := float64(totalMarks) / float64(len(obj.marks))
      gpa := avgMarks / 10
      return math.Round(gpa*100) / 100
  }

  func main() {
      s1 := Student{
          name:  "John Doe",
          id:    105,
          marks: []int{76, 85, 90, 68, 94},
      }
      s1.gpa = s1.CalculateGpa()
      fmt.Println(s1.name, "has GPA of", s1.gpa)
      // John Doe has GPA of 8.26
      fmt.Println(s1) // {105 John Doe [76 85 90 68 94] 8.26}
  }
  ```

- Remember, a method is just a function with a receiver argument. You can write the `CalculateGpa` as a normal function too. The changed code would be:

  ```go
  // ...

  func CalculateGpa(obj Student) float64 {
      totalMarks := 0
      for _, marks := range obj.marks {
          totalMarks += marks
      }
      avgMarks := float64(totalMarks) / float64(len(obj.marks))
      gpa := avgMarks / 10
      return ma
  }

  func main() {
      // ...
      s1.gpa = CalculateGpa(s1)
      // ...
  }
  ```

- Methods can be defined on any `type`, doesn't necessarily have to be a composite `struct` type. Note that the receiver `type` for which the method is being defined must both be in the **same package**

- The receiver argument of a method can also be a **pointer** to an object of the `type`. The above previous methods were taking a copy of the original object as argument to the method while the below method takes address of the actual object

  ```go
  func (obj *Student) CalculateGpa() float64 {
      totalMarks := 0
      for _, marks := range obj.marks {
          totalMarks += marks
      }
      avgMarks := float64(totalMarks) / float64(len(obj.marks))
      gpa := avgMarks / 10
      return math.Round(gpa*100) / 100
  }

  func main() {
      // ...
      s1.gpa = s1.CalculateGpa()
      fmt.Println(s1.name, "has GPA of", s1.gpa)
      // John Doe has GPA of 8.26
  }
  ```

  Now, if the method was written as a normal function taking the pointer argument, it would become:

  ```go
  func CalculateGpa(obj *Student) float64 {
      totalMarks := 0
      for _, marks := range obj.marks {
          totalMarks += marks
      }
      avgMarks := float64(totalMarks) / float64(len(obj.marks))
      gpa := avgMarks / 10
      return math.Round(gpa*100) / 100
  }

  func main() {
      // ...
      s1.gpa = CalculateGpa(&s1)
      fmt.Println(s1.name, "has GPA of", s1.gpa)
      // John Doe has GPA of 8.26
  }
  ```

> In general, all methods on a `type` should ALL be either value or pointer receivers, but **NOT a mixture** of both

---

## Interfaces

- An `interface` `type` is defined as a collection of **method signatures**. A commonly used example of interfaces is [`Springer`](https://pkg.go.dev/fmt#GoStringer) defined by the `fmt` package
- The value of the interface `type` is any value that **implements** those methods
- **Interfaces are implemented implicitly**: A `type` implements an interface by implementing its methods. There is no explicit declaration of intent, no `implements` keyword. Implicit interfaces decouple the definition of an interface from its implementation, which could then appear in any package without prearrangement.

  ```go
  type Shape interface {
      Area() float64
      Perimeter() float64
  }
  type Rectangle struct {
      Width, Height float64
  }
  type Circle struct {
      Radius float64
  }

  // The "Rectangle" and "Circle" types implement the interface "Shape",
  // but we don't need to explicitly declare it
  func (r Rectangle) Area() float64      { return r.Width * r.Height }
  func (r Rectangle) Perimeter() float64 { return 2 * (r.Width + r.Height) }
  func (c Circle) Area() float64         { return math.Pi * c.Radius * c.Radius }
  func (c Circle) Perimeter() float64    { return 2 * math.Pi * c.Radius }

  func printShapeDetails(s Shape) {
      fmt.Printf("Shape: %T\n", s)
      fmt.Printf("  Area: %.2f\n", s.Area())
      fmt.Printf("  Perimeter: %.2f\n", s.Perimeter())
  }

  func main() {
      rect := Rectangle{Width: 4, Height: 6}
      printShapeDetails(rect)
      //Shape: main.Rectangle
      //  Area: 24.00
      //  Perimeter: 20.00
      circ := Circle{Radius: 5}
      printShapeDetails(circ)
      //Shape: main.Circle
      //  Area: 78.54
      //  Perimeter: 31.42
  }
  ```

- Under the hood, **interface values** can be thought of as a **tuple** of a value and a concrete types such as `(value, type)` . An interface value holds a value of a specific underlying concrete type. Calling a method on an interface value executes the method of the same name on its underlying type

  ```go
  type MyInterface interface {
      MyMethod()
  }
  type MyType struct {
      str string
  }
  type MyFloat float64

  func (f MyFloat) MyMethod() { fmt.Println(f) }
  func (t *MyType) MyMethod() {
      if t == nil {
          fmt.Println("<nil>")
          return
      }
      fmt.Println(t.str)
  }

  func describe(itf MyInterface) {
      fmt.Printf("(%v, %T)\n", itf, itf)
  }

  func main() {
      var itf MyInterface

      itf = &MyType{"Hello"}
      describe(itf)  // (&{Hello}, *main.MyType)
      itf.MyMethod() // Hello

      itf = MyFloat(math.Pi)
      describe(itf)  // (3.141592653589793, main.MyFloat)
      itf.MyMethod() // 3.141592653589793

      var i MyInterface
      var t *MyType
      i = t
      describe(i)  // (<nil>, *main.MyType)
      i.MyMethod() // <nil>
  }
  ```

- If the concrete value inside the interface itself is `nil`, the method will be called with a `nil` receiver. In some languages this would trigger a _null pointer exception_, but in Go it is common to write methods that **gracefully handle being called with a nil receiver** as seen in above example.

  Note that an interface value that holds a nil concrete value is itself non-nil.

  A `nil` interface value holds neither value nor concrete type. Calling a method on a `nil` interface is a _run-time error_ because there is no type inside the interface tuple to indicate which _concrete_ method to call

### Empty Interfaces

An empty interface is an interface type that specifies **zero methods**, written as `interface{}`. An empty interface may hold values of any type (Every type implements at least zero methods). Empty interfaces are used by code that handles **values of unknown type**. For example, `fmt.Print` takes any number of arguments of type `interface{}`

### Type assertion

A type assertion provides access to an interface value's underlying concrete value.

- This statement asserts that interface value `i` holds the concrete type `T` and assigns underlying `T` value to variable `t`. If `i` does not hold a `T`, the statement will trigger a _panic_

  ```go
  t := i.(T)
  ```

- To test whether an interface value holds a specific type, a type assertion can return two values: the underlying value and boolean reporting whether the assertion succeeded

  ```go
  t, exists := i.(T)
  ```

  When not existing, `exists` will be `false` and `t` will be the zero-value of type `T`, and no panic would occur (seems similar to [Map](/code-journal/dev/go/dev/go/go-tour-2/#maps) usage)

  ```go
  type MyInterface interface{}

  func main() {
      var itf MyInterface = "hello"

      str := itf.(string)
      fmt.Println(str) // hello

      str, exists := itf.(string)
      fmt.Println(str, exists) // hello true

      num, exists := itf.(float64)
      fmt.Println(num, exists) // 0 false

      // num = itf.(float64) // Causes PANIC during interface conversion
      fmt.Println(num)
  }
  ```

### Type switches

- A type switch is a construct that permits **several type assertions in series**. It is like a regular `switch` statement, but the cases in a type switch **specify types (not values)**, and those values are compared against the type of the value held by the given interface value
- The declaration in a type switch has the same syntax as a type assertion `i.(T)`, but the specific type `T` is replaced with the keyword `type`

  ```go
  func myTypeHandler(itf interface{}) {
      switch val := itf.(type) {
      case int:
          fmt.Println("Square of number:", val*val)
      case string:
          fmt.Println("String length:", len(val), "bytes")
      default:
          fmt.Println("Neither int nor string, some other type")
      }
  }

  func main() {
      myTypeHandler(16)      // Square of number: 256
      myTypeHandler("Hello") // String length: 5 bytes
      myTypeHandler(true)    // Neither int nor string, some other type
  }
  ```

### Readers

- The `io` package specifies the `io.Reader` interface, which represents the read end of a stream of data. The Go standard library contains many implementations of this interface, including files, network connections, compressors, ciphers, and others.

- The `io.Reader interface` has a `Read` method:

  ```go
  func (T) Read(b []byte) (n int, err error)
  ```

  It populates the given byte slice with data and returns the number of bytes populated and an error value. It returns an io.EOF error when the stream ends.

- The below example creates a `strings.Reader` and consumes its output 8 bytes at a time

  ```go
  func main() {
      myReader := strings.NewReader("Wow! It's a beautiful day, isn't it?")
      myBuffer := make([]byte, 8) // Buffer of size 8 bytes
      for {
          length, err := myReader.Read(myBuffer)
          fmt.Printf("length:%v, err:%v \n", length, err)
          fmt.Printf("  String:%q, Raw-bytes:%v \n", myBuffer[:length], myBuffer)
          if err == io.EOF {
              fmt.Println("Reached end of file. Will stop reading.")
              break
          }
      }
  }
  ```

  ```txt title="Output"
  length:8, err:<nil>
    String:"Wow! It'", Raw-bytes:[87 111 119 33 32 73 116 39]
  length:8, err:<nil>
    String:"s a beau", Raw-bytes:[115 32 97 32 98 101 97 117]
  length:8, err:<nil>
    String:"tiful da", Raw-bytes:[116 105 102 117 108 32 100 97]
  length:8, err:<nil>
    String:"y, isn't", Raw-bytes:[121 44 32 105 115 110 39 116]
  length:4, err:<nil>
    String:" it?", Raw-bytes:[32 105 116 63 115 110 39 116]
  length:0, err:EOF
    String:"", Raw-bytes:[32 105 116 63 115 110 39 116]
  Reached end of file. Will stop reading.
  ```

---

## Errors

- Go programs express error state with `error` values. The `error` `type` is a a built-in empty interface similar to `fmt.Stringer`:

  ```go
  type error interface {
      Error() string
  }
  ```

- Functions often return an `error` value, and calling code should handle errors by testing whether the error equals `nil`. A `nil` error denotes **success** while a non-nil error denotes failure

  ```go
  num, err := strconv.Atoi("42")
  if err != nil {
      fmt.Printf("couldn't convert number: %v\n", err)
      return
  }
  fmt.Println("Converted integer:", num) // Converted integer: 42
  ```

- You can also define your own custom errors:

  ```go
  // Your custom error type
  type MyError struct {
      When time.Time
      What string
  }

  // Your custom error type implementing the Error interface
  func (e *MyError) Error() string {
      return fmt.Sprintf("At %v, %s", e.When.Format(time.RFC822), e.What)
  }

  func someTask() error {
      fmt.Println("Inside function, doing the task")
      // Manually stimulate your custom error occurrence
      return &MyError{time.Now(), "it didn't work"}
  }

  func main() {
      if err := someTask(); err != nil {
          fmt.Println(err)
          // Inside function, doing the task
          // At 08 Dec 24 13:19 IST, it didn't work
      }
  }
  ```
