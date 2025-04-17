---
title: STL - Algorithms
tags: [cpp, stl, algorithms]
---

## References

- [`<algorithm>` library C++ reference](https://en.cppreference.com/w/cpp/algorithm)
- [GFG: Algorithm Library Functions in C++ STL](https://www.geeksforgeeks.org/algorithms-library-c-stl/)

I prefer `C++17`

## Sorting operations

|                                     Function                                     | Use                                                                              |
| :------------------------------------------------------------------------------: | -------------------------------------------------------------------------------- |
|            [`sort`](https://en.cppreference.com/w/cpp/algorithm/sort)            | Sorts a range (ascending order by default)                                       |
|     [`stable_sort`](https://en.cppreference.com/w/cpp/algorithm/stable_sort)     | Sorts a range of elements while preserving order between equal elements          |
|    [`partial_sort`](https://en.cppreference.com/w/cpp/algorithm/partial_sort)    | Sorts the first _N_ elements of a range                                          |
|       [`is_sorted`](https://en.cppreference.com/w/cpp/algorithm/is_sorted)       | Check whether range is sorted                                                    |
| [`is_sorted_until`](https://en.cppreference.com/w/cpp/algorithm/is_sorted_until) | Finds the largest sorted subrange                                                |
|     [`nth_element`](https://en.cppreference.com/w/cpp/algorithm/nth_element)     | Partially sorts the range making sure that it's partitioned by the given element |

### Comparison functions

|                                             Function                                             |                                     Use                                     |
| :----------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------: |
|           [`greater<T>`](https://en.cppreference.com/w/cpp/utility/functional/greater)           |       Checks whether the first argument is _greater_ than the second        |
|              [`less<T>`](https://en.cppreference.com/w/cpp/utility/functional/less)              |        Checks whether the first argument is _lesser_ than the second        |
| [`lexicographical_compare`](https://en.cppreference.com/w/cpp/algorithm/lexicographical_compare) | Check whether the first range is _lexicographically lesser_ than the second |

## Binary search (on partitioned/sorted ranges)

|                                   Function                                   | Use                                                                          |
| :--------------------------------------------------------------------------: | ---------------------------------------------------------------------------- |
|   [`lower_bound`](https://en.cppreference.com/w/cpp/algorithm/lower_bound)   | Returns iterator pointing to the first element not less than the given value |
|   [`upper_bound`](https://en.cppreference.com/w/cpp/algorithm/upper_bound)   | Returns iterator pointing to the first element greater than a certain value  |
|   [`equal_range`](https://en.cppreference.com/w/cpp/algorithm/equal_range)   | Returns range of elements matching a specific key                            |
| [`binary_search`](https://en.cppreference.com/w/cpp/algorithm/binary_search) | Determines if an element exists in a partially-ordered range                 |

## Minimum/Maximum operations

|                                    Function                                    | Use                                             |
| :----------------------------------------------------------------------------: | ----------------------------------------------- |
|            [`max`](https://en.cppreference.com/w/cpp/algorithm/max)            | Returns larger of given values                  |
|            [`min`](https://en.cppreference.com/w/cpp/algorithm/max)            | Return smaller of given values                  |
|    [`min_element`](https://en.cppreference.com/w/cpp/algorithm/min_element)    | Returns smallest element in range               |
|    [`max_element`](https://en.cppreference.com/w/cpp/algorithm/max_element)    | Returns largest element in range                |
|         [`minmax`](https://en.cppreference.com/w/cpp/algorithm/minmax)         | Returns lowest and the greatest of given values |
| [`minmax_element`](https://en.cppreference.com/w/cpp/algorithm/minmax_element) | Returns smallest and largest elements in range  |

## Heap operations

By default, the heap behavior is for **max-heap**

|                                   Function                                   | Use                                                                      |
| :--------------------------------------------------------------------------: | ------------------------------------------------------------------------ |
|     [`push_heap`](https://en.cppreference.com/w/cpp/algorithm/push_heap)     | Insert element into heap                                                 |
|      [`pop_heap`](https://en.cppreference.com/w/cpp/algorithm/pop_heap)      | Pop topmost element from heap                                            |
|     [`make_heap`](https://en.cppreference.com/w/cpp/algorithm/make_heap)     | Make heap from range                                                     |
|     [`sort_heap`](https://en.cppreference.com/w/cpp/algorithm/sort_heap)     | Turns the heap into a range of sorted elements (default ascending order) |
|       [`is_heap`](https://en.cppreference.com/w/cpp/algorithm/is_heap)       | Checks if given range is a max-heap                                      |
| [`is_heap_until`](https://en.cppreference.com/w/cpp/algorithm/is_heap_until) | Finds the largest subrange that is a max-heap                            |

## Permutation operations

|                                      Function                                      | Use                                                                         |
| :--------------------------------------------------------------------------------: | --------------------------------------------------------------------------- |
| [`next_permutation`](https://en.cppreference.com/w/cpp/algorithm/next_permutation) | Generates the next greater lexicographic permutation of a range of elements |
| [`prev_permutation`](https://en.cppreference.com/w/cpp/algorithm/prev_permutation) | Generates the next smaller lexicographic permutation of a range of elements |
|   [`is_permutation`](https://en.cppreference.com/w/cpp/algorithm/is_permutation)   | Checks if a sequence is a permutation of another sequence                   |

## Partitioning Operations

|                                      Function                                      | Use                                                                    |
| :--------------------------------------------------------------------------------: | ---------------------------------------------------------------------- |
|   [`is_partitioned`](https://en.cppreference.com/w/cpp/algorithm/is_partitioned)   | Test whether range is partitioned by the given predicate               |
|        [`partition`](https://en.cppreference.com/w/cpp/algorithm/partition)        | Divides a range of elements into two groups                            |
|   [`partition_copy`](https://en.cppreference.com/w/cpp/algorithm/partition_copy)   | Copies a range dividing the elements into two groups                   |
| [`stable_partition`](https://en.cppreference.com/w/cpp/algorithm/stable_partition) | Divides elements into two groups while preserving their relative order |
|  [`partition_point`](https://en.cppreference.com/w/cpp/algorithm/partition_point)  | Locates the partition point of a partitioned range                     |

## Set, Merge operations (on sorted ranges)

|                                              Function                                              | Use                                                |
| :------------------------------------------------------------------------------------------------: | -------------------------------------------------- |
|                 [`includes`](https://en.cppreference.com/w/cpp/algorithm/includes)                 | Checks if one sequence is a subsequence of another |
|                [`set_union`](https://en.cppreference.com/w/cpp/algorithm/set_union)                | Computes the union of two sets                     |
|         [`set_intersection`](https://en.cppreference.com/w/cpp/algorithm/set_intersection)         | Computes the intersection of two sets              |
|           [`set_difference`](https://en.cppreference.com/w/cpp/algorithm/set_difference)           | Computes the difference between two sets           |
| [`set_symmetric_difference`](https://en.cppreference.com/w/cpp/algorithm/set_symmetric_difference) | Computes the symmetric difference between two sets |
|                    [`merge`](https://en.cppreference.com/w/cpp/algorithm/merge)                    | Merges two sorted ranges                           |
|            [`inplace_merge`](https://en.cppreference.com/w/cpp/algorithm/inplace_merge)            | Merges two ordered ranges in-place                 |

## Non-modifying sequence operations

|                                           Function                                           | Use                                                                                   |
| :------------------------------------------------------------------------------------------: | ------------------------------------------------------------------------------------- |
|              [`for_each`](https://en.cppreference.com/w/cpp/algorithm/for_each)              | Apply function to a range of elements                                                 |
|            [`for_each_n`](https://en.cppreference.com/w/cpp/algorithm/for_each_n)            | Apply function to first _N_ elements of a sequence                                    |
| [`all_of`, `any_of`, `none_of`](https://en.cppreference.com/w/cpp/algorithm/all_any_none_of) | Check if condition is true for all/any/none of the elements in a range                |
|     [`find`, `find_if`, `find_if_not`](https://en.cppreference.com/w/cpp/algorithm/find)     | Find the first element satisfying specific criteria                                   |
|              [`find_end`](https://en.cppreference.com/w/cpp/algorithm/find_end)              | Find last sequence of elements in a certain range                                     |
|         [`find_first_of`](https://en.cppreference.com/w/cpp/algorithm/find_first_of)         | Searches for any one of a set of elements                                             |
|         [`adjacent_find`](https://en.cppreference.com/w/cpp/algorithm/adjacent_find)         | Finds the first two adjacent items that are equal (or satisfy given condition)        |
|           [`count`, `count_if`](https://en.cppreference.com/w/cpp/algorithm/count)           | Returns number of elements satisfying specific criteria                               |
|              [`mismatch`](https://en.cppreference.com/w/cpp/algorithm/mismatch)              | Finds the first position where two ranges differ                                      |
|                 [`equal`](https://en.cppreference.com/w/cpp/algorithm/equal)                 | Checks if two sets of elements are the same                                           |
|                [`search`](https://en.cppreference.com/w/cpp/algorithm/search)                | Searches for first occurrence of a range of elements                                  |
|              [`search_n`](https://en.cppreference.com/w/cpp/algorithm/search_n)              | Searches for first occurrence of a number consecutive copies of an element in a range |

## Modifying sequence operations

|                                           Function                                            | Use                                                                                |
| :-------------------------------------------------------------------------------------------: | ---------------------------------------------------------------------------------- |
|             [`copy`, `copy_if`](https://en.cppreference.com/w/cpp/algorithm/copy)             | Copies a range of elements to a new location                                       |
|                [`copy_n`](https://en.cppreference.com/w/cpp/algorithm/copy_n)                 | Copies a number of elements to a new location                                      |
|         [`copy_backward`](https://en.cppreference.com/w/cpp/algorithm/copy_backward)          | Copy range of elements backward                                                    |
|                  [`move`](https://en.cppreference.com/w/cpp/algorithm/move)                   | Moves a range of elements to a new location                                        |
|         [`move_backward`](https://en.cppreference.com/w/cpp/algorithm/move_backward)          | Moves a range of elements to a new location in backwards order                     |
|                  [`swap`](https://en.cppreference.com/w/cpp/algorithm/swap)                   | Swaps the values of two objects                                                    |
|           [`swap_ranges`](https://en.cppreference.com/w/cpp/algorithm/swap_ranges)            | Swaps two ranges of elements                                                       |
|             [`iter_swap`](https://en.cppreference.com/w/cpp/algorithm/iter_swap)              | Swaps the elements pointed to by two iterators                                     |
|             [`transform`](https://en.cppreference.com/w/cpp/algorithm/transform)              | Applies a function to a range, storing results in a destination range              |
|        [`replace`, `replace_if`](https://en.cppreference.com/w/cpp/algorithm/replace)         | Replaces all values satisfying specific criteria with another value                |
| [`replace_copy`, `replace_copy_if`](https://en.cppreference.com/w/cpp/algorithm/replace_copy) | Copies a range, replacing elements satisfying specific criteria with another value |
|                  [`fill`](https://en.cppreference.com/w/cpp/algorithm/fill)                   | Copy-assigns the given value to every element in a range                           |
|                [`fill_n`](https://en.cppreference.com/w/cpp/algorithm/fill_n)                 | Copy-assigns the given value to _N_ elements in a range                            |
|              [`generate`](https://en.cppreference.com/w/cpp/algorithm/generate)               | Assigns the results of successive function calls to every element in range         |
|            [`generate_n`](https://en.cppreference.com/w/cpp/algorithm/generate_n)             | Assigns the results of successive function calls to _N_ elements in range          |
|          [`remove`, `remove_if`](https://en.cppreference.com/w/cpp/algorithm/remove)          | Removes elements satisfying specific criteria                                      |
|  [`remove_copy`, `remove_copy_if`](https://en.cppreference.com/w/cpp/algorithm/remove_copy)   | Copies a range of elements omitting those that satisfy specific criteria           |
|                [`unique`](https://en.cppreference.com/w/cpp/algorithm/unique)                 | Removes consecutive duplicate elements in range                                    |
|           [`unique_copy`](https://en.cppreference.com/w/cpp/algorithm/unique_copy)            | Creates a copy of some range of elements that contains no consecutive duplicates   |
|               [`reverse`](https://en.cppreference.com/w/cpp/algorithm/reverse)                | Reverses the order of elements in a range                                          |
|          [`reverse_copy`](https://en.cppreference.com/w/cpp/algorithm/reverse_copy)           | Creates a copy of a range that is reversed                                         |
|                [`rotate`](https://en.cppreference.com/w/cpp/algorithm/rotate)                 | Rotates the order of elements in a range                                           |
|           [`rotate_copy`](https://en.cppreference.com/w/cpp/algorithm/rotate_copy)            | Copies and rotate a range of elements                                              |
|            [`shuffle`](https://en.cppreference.com/w/cpp/algorithm/random_shuffle)            | Randomly re-orders elements in a range                                             |
|                [`sample`](https://en.cppreference.com/w/cpp/algorithm/sample)                 | Selects _N_ random elements from a sequence                                        |
