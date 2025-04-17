---
title: "Tour-5: Generics, Goroutines, Channels"
tags: [go]
---

## Generics

**Generic functions**: Functions can be written to work on multiple types using type parameters. The type parameters of a function appear between brackets `[T]`, before the function's arguments

`comparable` is a useful constraint that makes it possible to use the `==` and `!=` operators on values of the type. In below example, we use it to compare a value to all slice elements until a match is found. The `findIndex` function works for any type that supports comparison

```go
func findIndex[T comparable](arr []T, key T) int {
    for idx, val := range arr {
        if val == key {
            return idx
        }
    }
    return -1
}

func main() {
    nums := []int{10, 20, 15, -10}
    strings := []string{"foo", "bar", "baz"}

    fmt.Println(findIndex(nums, 15))         // 2
    fmt.Println(findIndex(strings, "hello")) // -1
}
```

**Generic types**: In addition to generic functions, Go also supports generic types. A type can be parameterized with a type parameter, which could be useful for implementing generic data structures. Below example demonstrates a simple type declaration for a singly-linked list holding any type of value.

```go
// Represents a singly-linked list that holds values of any type
type Node[T any] struct {
    next *Node[T]
    val  T
}

// Appends a new node to the end of the list
func (list *Node[T]) Add(newEntry T) {
    currNode := list
    for currNode.next != nil {
        currNode = currNode.next
    }
    currNode.next = &Node[T]{val: newEntry}
}
```

---

## Goroutines

- A goroutine is a lightweight thread managed by the Go runtime
- The statement `go myFunction(x,y,z)` starts a new goroutine running `myFunction(z,y,z)`
- The **evaluation** of `myFunction`, `x`, `y`, and `z` happens in the **current** goroutine and the **execution** of `myFunction` happens in the **new** goroutine
- Goroutines run in the **same address space**, so access to shared memory must be **synchronized**. The [`sync`](https://pkg.go.dev/sync) package provides useful primitives, although you won't need them much in Go as there are other primitives

  ```go
  func display(str string) {
      for i := 0; i < 5; i++ {
          time.Sleep(500 * time.Millisecond)
          fmt.Println(str)
      }
  }

  func main() {
      go display("world")
      display("hello")
  }
  // world
  // hello
  // hello
  // world
  // world
  // hello
  // hello
  // world
  // world
  // hello
  ```

---

## Channels

- Channels are a typed pipeline through which you can send and receive values, by use of the channel operator `<-` (the data flows in direction of the arrow). Like maps and slices, channels must be created before use

  ```go
  ch <- val    // Send "val" to channel "ch"
  val := <-ch  // Receive from "ch", and assign it to "val"
  ```

- By default, sends and receives **block until the other side is ready**. This allows goroutines to **synchronize** without explicit locks or condition variables

- The example below sums the numbers in a slice, **distributing the work** between two goroutines. Once both goroutines have completed their computation, it calculates the final result:

  ```go
  func sum(arr []int, ch chan int) {
      sum := 0
      for _, val := range arr {
          sum += val
      }
      ch <- sum // SEND sum to ch
  }

  func main() {
      ch := make(chan int) // Create channel of integers

      nums := []int{7, 2, 8, 3, 4, 9, 5}
      n := len(nums)
      var leftSum, rightSum int

      go sum(nums[:n/2], ch)
      go sum(nums[n/2:], ch)

      // RECEIVE from ch
      leftSum = <-ch
      rightSum = <-ch

      fmt.Printf("leftSum=%d rightSum=%d \n", leftSum, rightSum) // leftSum=21 rightSum=17
      fmt.Printf("Total= %d \n", leftSum+rightSum)               // Total= 38
  }
  ```

- **Buffered Channels**: Channels can also be buffered. Specify the buffer length as the second argument to `make` to initialize a buffered channel:

  ```go
  ch := make(chan int, 100)
  ```

  Sends to a buffered channel block only when the buffer is full. Receives block when the buffer is empty.

- **Looping**: The range loop receives values from the channel repeatedly until it is closed

  ```go
  for i := range ch {
      // ...
  }
  ```

### Closing

- A sender can `close(ch)` a channel to indicate that no more values will be sent. Receivers can test whether a channel has been closed by assigning a second parameter to the receive expression:

  ```go
  val, isClosed := <-ch
  // isClosed is false if there are no more values
  // to receive and the channel is closed
  ```

- Only the sender should close a channel, never the receiver. Sending on a closed channel will cause a _panic_

- Channels aren't like files; you don't usually need to close them. Closing is only necessary when the receiver must be told there are no more values coming, such as to terminate a `range` loop.

- Here's an example of generating first 10 Fibonacci numbers via buffered channel and goroutines

  ```go
  func fibonacci(size int, ch chan int) {
      plusOne, plusTwo := 0, 1
      for i := 0; i < size; i++ {
          ch <- plusOne
          plusOne, plusTwo = plusTwo, plusOne+plusTwo
      }
      close(ch)
  }

  func main() {
      const BufferSize = 10
      ch := make(chan int, BufferSize)
      go fibonacci(BufferSize, ch)
      for val := range ch {
          fmt.Println(val)
      }
  }
  // 0
  // 1
  // 1
  // 2
  // 3
  // 5
  // 8
  // 13
  // 21
  // 34
  ```

- Refer an [exercise problem](https://go.dev/tour/concurrency/7) where we are checking if two trees are equivalent i.e. they have the same order of values in their traversals.

  ```go
  func walkRec(currNode *tree.Tree, ch chan int) {
      if currNode == nil {
          return
      }
      walkRec(currNode.Left, ch)
      ch <- currNode.Value // SEND current node value into channel
      walkRec(currNode.Right, ch)
  }

  // Walks the tree sending each value into the channel
  func Walk(root *tree.Tree, ch chan int) {
      walkRec(root, ch)
      close(ch) // no more values
  }

  // Check if the two trees have the same order of values in their traversal
  func Same(t1, t2 *tree.Tree) bool {
      // Create channels
      ch1, ch2 := make(chan int), make(chan int)
      // Traverse both trees
      go Walk(t1, ch1)
      go Walk(t2, ch2)
      // Iteratively start reading values from first channel
      for valInFirst := range ch1 {
          // Read corresponding value from second channel
          valInSecond := <-ch2
          if valInFirst != valInSecond {
              return false
          }
      }
      return true
  }
  ```

### Select

- The `select` statement lets a goroutine wait on multiple communication operations
- A `select`**blocks until one of its cases can run**, then it executes that case. It chooses one at **random if multiple** are ready.
- The `default` case in a select is run if no other case is ready. It's used to try a send/receive without blocking

  ```go
  func main() {
      tick := time.Tick(200 * time.Millisecond)
      boom := time.After(500 * time.Millisecond)
      for {
          select {
          case <-tick:
              fmt.Println("tick.")
          case <-boom:
              fmt.Println("KABOOM!!")
              return
          default:
              fmt.Println("...")
              time.Sleep(50 * time.Millisecond)
          }
      }
  }
  // ...
  // ...
  // ...
  // ...
  // tick.
  // ...
  // ...
  // ...
  // ...
  // tick.
  // ...
  // ...
  // KABOOM!!
  ```

### Mutex

- We've seen how channels are great for communication among goroutines. But what if we don't need communication? What if we just want to make sure only one goroutine can access a variable at a time to avoid conflicts? This concept is called _mutual exclusion_, and the conventional name for the data structure that provides it is **mutex**.
- Go's standard library provides mutual exclusion with [`sync.Mutex`](https://pkg.go.dev/sync#Mutex) and its two methods: [`Lock`](https://pkg.go.dev/sync#Mutex.Lock) and [`Unlock`](https://pkg.go.dev/sync#Mutex.Unlock)
- We can define a block of code to be executed in mutual exclusion by surrounding it with a call to `Lock` and `Unlock` as shown on the `Inc` method
- We can also use `defer` to ensure the mutex will be unlocked as in the `Value` method

  ```go
  // SafeCounter is safe to use concurrently.
  type SafeCounter struct {
      mutx sync.Mutex
      freq map[string]int
  }

  // Inc increments the counter for the given key.
  func (counter *SafeCounter) Inc(key string) {
      counter.mutx.Lock()
      // Lock so only one goroutine at a time can access the map c.v.
      counter.freq[key]++
      counter.mutx.Unlock()
  }

  // Value returns the current value of the counter for the given key.
  func (counter *SafeCounter) Value(key string) int {
      counter.mutx.Lock()
      // Lock so only one goroutine at a time can access the map c.v.
      defer counter.mutx.Unlock()
      return counter.freq[key]
  }

  func main() {
      counter := SafeCounter{
          freq: make(map[string]int),
      }
      for i := 0; i < 1000; i++ {
          go counter.Inc("somekey")
      }
      time.Sleep(time.Second)
      fmt.Println(counter.Value("somekey")) // 1000
  }
  ```
