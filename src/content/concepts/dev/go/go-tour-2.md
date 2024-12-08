---
title: "Tour-2: Pointers, Structs, Arrays, Slices, Maps"
tags: [go]
---

## Pointers

A pointer holds the memory address of a value

- The zero value for a pointer is `nil`
- `*T` denotes a pointer to a `T` value
- The `&` operator is used to denote **address-of** some variable and the `*` operator to dereference the pointer, just like in C/C++

  ```go
  a, b := 56, 99

  var p1 *int // Declaration
  p1 = &a     // Assignment
  fmt.Println("p1:", p1, "Value at p1:", *p1)

  p2 := &b // Declaration + Assignment
  fmt.Println("p2:", p2, "Value at p2:", *p2)

  p2 = p1
  fmt.Println("p2:", p2, "Value at p2:", *p2)

  *p2 = 17 // Changing value at pointed location
  fmt.Println("*p1:", *p1, ", *p2:", *p2, ", a:", a)
  // *p1: 17 , *p2: 17 , a: 17
  ```

---

## Structs

- A `struct` is a collection of fields
- Fields of struct are accessed via `.` operator as in `object.field`
- Even when accessing object fields via the pointer pointing to it, we use the same `.` operator. So if `ptr` is a pointer pointing to `object`, we can access the `object` fields via `ptr.field`. It automatically does the explicit expansion as `(*ptr).field` behind the scenes

  ```go
  type Point struct {
      x, y int
      name string
  }

  func main() {
      obj := Point{4, 5, "Sunset"}

      fmt.Println("Coordinates:", obj.x, ",", obj.y)
      // Coordinates: 4 , 5

      ptr := &obj
      fmt.Println("Point", ptr.name)
      // Point Sunset
  }
  ```

  In C/C++ we would do it as `ptr->field` via the arrow operator but Go does it via the `.` dot operator

- The **initialization** format is like [List-inititalization](https://en.cppreference.com/w/cpp/language/list_initialization) syntax in C++. In Go, you can also pass **named parameters** in the initializer list. The missing parameters get initialized to their zero values

  ```go
  a := Vertex{3, 4}     // Default order initialization
  fmt.Println(a.x, a.y) // 3 4

  b := Vertex{y: 7}     // Named initialization
  fmt.Println(b.x, b.y) // 0 7
  // The missing parameter in 'b' got initialized to '0'

  a.x = 9
  ptr := &a
  ptr.y = 5
  fmt.Println(ptr.x, ptr.y) // 9 5
  fmt.Println(a.x, a.y)     // 9 5
  ```

---

## Arrays

- An array of `n` elements of type `T` is denoted as `[n]T`
- An array's length is part of its type, so **arrays cannot be resized**

  ```go
  // Declaration:
  var arr [2]string
  // Assign values at index
  arr[0], arr[1] = "Hello", "World"
  fmt.Println(arr)
  // [Hello World]
  ```

- Declaration and initialization in arrays:

  ```go
  // Defined size. Default values initialized
  arr := [5]int{}
  arr[2], arr[4] = 6, 8
  fmt.Println(arr)
  // [0 0 6 0 8]

  // Inferred size based on initialization
  brr := []int{1, 2, 3}
  fmt.Println(brr)
  // [1 2 3]
  ```

## Slices

- It is a **dynamically-sized**, flexible **view** into the elements of an array
- `[]T` denotes a slice with elements of type `T`
- A slice is formed by specifying the first and last index as `arr[low:high]` where it includes all indices within range `[low,high)`. The default `low` is `0` and the default high is length of the array

  ```go
  primes := [10]int{2, 3, 5, 7, 11, 13, 17, 19, 233, 29}

  // Slice containing elements from index 2 to 6 from "primes"
  somePrimes := primes[2:7]

  fmt.Println(somePrimes) // [5 7 11 13 17]
  ```

- Slices are just **references** to elements of the array, not a new copy. So making changes in any slice would reflect into the original array as well as other slices referencing those elements

  ```go
  arr := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}

  s1 := arr[2:7]
  s1[3] *= 2

  s2 := arr[1:9]
  s2[1] += 10

  fmt.Println(arr) // [1 2 13 4 5 12 7 8 9 10]
  fmt.Println(s1)  // [13 4 5 12 7]
  fmt.Println(s2)  // [2 13 4 5 12 7 8 9][2 13 4 5 12 7 8 9]
  ```

- Use `len()` to know length of slice and `cap()` to know it's capacity. The capacity how much the slice size can extend to i.e. the length of original array it was sliced from

- An empty slice is `nil` and has length, capacity as `0`

- You can create a slice from another slice or the slice-up the current slice itself

- There is a built-in `make` function to create slice. It is how you **create dynamically-sized arrays**. In `make` function, The second argument is length and third argument is capacity of the slice to create

  ```go
  s1 := make([]int, 5)
  fmt.Println(s1) // [0 0 0 0 0]
  fmt.Println("length:", len(s1), ", capacity:", cap(s1))
  // length: 5 , capacity: 5

  s2 := make([]int, 0, 4)
  fmt.Println(s2) // []
  fmt.Println("length:", len(s2), ", capacity:", cap(s2))
  // length: 0 , capacity: 3

  s3 := s1[:3]
  fmt.Println(s3) // [0 0 0]
  ```

- **Appending**: Use the `append()` function that takes first argument as the slice and rest as values to append to that slice. If the array capacity is smaller for fitting the new elements, a new array gets allocated and the returned slice will point to this new array. Refer [Slices: usage and internals](https://go.dev/blog/slices-intro)

  ```go
  func printSlice(s []int) {
      fmt.Printf("len:%d cap:%d slice:%v \n", len(s), cap(s), s)
  }

  func main() {
      var s []int   // nil slice
      printSlice(s) // len:0 cap:0 slice:[]

      s = append(s, 1) // Can append to nil slices
      printSlice(s)    // len:0 cap:0 slice:[]

      // Can append multiple elements at a time. The slice grows as needed
      s = append(s, 2, 3, 4, 5)
      printSlice(s) // len:5 cap:6 slice:[1 2 3 4 5]
  }
  ```

---

## Maps

- Maps are used for **key-value** pair mappings
- The zero value of a map is `nil`. It has no keys, nor can they be added
- The `make` function returns a map of given type, initialized and ready to use

  ```go
  type Vertex struct {
      lat, long float64
  }

  // Create map variable, initially "nil"
  var locations map[string]Vertex

  func main() {
      // nil map
      fmt.Println(locations) // map[]

      // Initialize map
      locations = make(map[string]Vertex)

      // Insert keys into map
      locations["Pune"] = Vertex{18.52, 73.86}
      locations["Mumbai"] = Vertex{lat: 19.02, long: 72.51}

      fmt.Println(locations["Pune"]) // {18.52 73.86}
      fmt.Println(locations)         // map[Mumbai:{19.02 72.51} Pune:{18.52 73.86}]

      // Check if key exists, and get value stored at that key
      value, keyExists := locations["Pune"]
      fmt.Println(keyExists) // true
      fmt.Println(value)     // {18.52 73.86}

      // Change value stored at a key
      locations["Pune"] = Vertex{36, 35}

      // Delete a key
      delete(locations, "Mumbai")
      fmt.Println(locations) // map[Pune:{18.52 73.86}]

      // Reassignment, List-initialization
      locations = map[string]Vertex{
          "Bell Labs": {40.68433, -74.39967},
          "Google":    {37.42202, -122.08408},
      }
      fmt.Println(locations)
      // map[Bell Labs:{40.68433 -74.39967} Google:{37.42202 -122.08408}]
  }
  ```
