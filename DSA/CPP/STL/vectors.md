# Vectors in C++

- Present inside the `<vector>` header, vectors are dynamic arrays with the ability to resize itself automatically when an element is inserted or deleted, with their storage being handled automatically by the container
- Data is inserted at the **end**
- Inserting at the end takes differential time (resized sometimes)
- Removing the last element takes constant time (no resizing)
- Inserting and erasing at the beginning / middle is **linear** in time

## Iterators

- Forward: `.begin()` , `.end()`
- Reverse: `.rbegin()` , `.rend()`

## Element access

- `[idx]` - Returns reference to element at index `idx` inside the vector.
- `.front()` – Returns reference to first element in the vector
- `.back()` – Returns reference to last element in the vector

## Size functions

- `.empty()` - Returns whether the vector is empty or not
- `.size()` - Returns number of elements present inside the vector
- `.capacity()` - Returns number of elements worth of memory currently allocated to the vector
- `.resize(n,val)` - Resizes vector to only include first `n` elements. Can also pass extra argument `val` to which the new elements will be initialized

## Modifiers

- `.pop_back()` - Removes last element from the vector
- `.push_back(val)` - Appends one element having value `val` at the end of element
- `.emplace_back(val)` - Constructs the element in-place at the end of the vector

### Doubts

- Is `emplace_back` always better than `push_back`
- Traversible Vector for custom data type
