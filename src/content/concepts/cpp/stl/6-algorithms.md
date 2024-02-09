---
title: STL - Algorithms
tags: [cpp, stl, algorithms]
---

## References

- [**`<algorithm>` library**](https://en.cppreference.com/w/cpp/algorithm/sort)
- [**GFG article**](https://www.geeksforgeeks.org/algorithms-library-c-stl/)

## Sorting

|      Function       | Use                                           |
| :-----------------: | --------------------------------------------- |
|       `sort`        | Sort elements                                 |
|    `stable_sort`    | Sort elements preserving order of equivalents |
|   `partial_sort`    | Partially sort elements in range              |
| `partial_sort_copy` | Copy and partially sort range                 |
|     `is_sorted`     | Check whether range is sorted                 |
|  `is_sorted_until`  | Find first unsorted element in range          |
|    `nth_element`    | Sort element in range                         |

## Binary search (on partitioned/sorted ranges)

|    Function     | Use                                     |
| :-------------: | --------------------------------------- |
|  `lower_bound`  | Return iterator to lower bound          |
|  `upper_bound`  | Return iterator to upper bound          |
|  `equal_range`  | Get subrange of equal elements          |
| `binary_search` | Test if value exists in sorted sequence |

## Merge (on sorted ranges)

|          Function          | Use                                                         |
| :------------------------: | ----------------------------------------------------------- |
|          `merge`           | Merge sorted ranges                                         |
|      `inplace_merge`       | Merge consecutive sorted ranges                             |
|         `includes`         | Test whether the sorted range includes another sorted range |
|        `set_union`         | Union of two sorted ranges                                  |
|     `set_intersection`     | Intersection of two sorted ranges                           |
|      `set_difference`      | Difference of two sorted ranges                             |
| `set_symmetric_difference` | Symmetric difference of two sorted ranges                   |

## Partition Operations

|      Function      | Use                                      |
| :----------------: | ---------------------------------------- |
|  `is_partitioned`  | Test whether range is partitioned        |
|    `partition`     | Partition range in two                   |
| `stable_partition` | Partition range in two – stable ordering |
|  `partition_copy`  | Partition range into two                 |
| `partition_point`  | Get partition point                      |

## Heap Operations

|     Function     | Use                                           |
| :--------------: | --------------------------------------------- |
|   `push_heap`    | Push element into heap range                  |
|    `pop_heap`    | Pop element from heap range                   |
|   `make_heap`    | Make heap from range                          |
|   `sort_heap`    | Sort elements of heap                         |
|    `is_heap`     | Test if range is heap                         |
| `is_heap_until`  | Find first element not in heap order          |
|      `max`       | Return the largest                            |
|     `minmax`     | Return smallest and largest elements          |
|  `min_element`   | Return smallest element in range              |
|  `max_element`   | Return largest element in range               |
| `minmax_element` | Return smallest and largest elements in range |

## Other Operations

|         Function          | Use                                     |
| :-----------------------: | --------------------------------------- |
| `lexicographical_compare` | Lexicographical less-than comparison    |
|    `next_permutation`     | Transform range to next permutation     |
|    `prev_permutation`     | Transform range to previous permutation |

## Non-modifying sequence operations

|     Function     | Use                                                     |
| :--------------: | ------------------------------------------------------- |
|     `all_of`     | Test condition on all elements in range                 |
|     `any_of`     | Test if any element in range fulfills condition         |
|    `none_of`     | Test if no elements fulfill condition                   |
|    `for_each`    | Apply function to range                                 |
|      `find`      | Find value in range                                     |
|    `find_if`     | Find element in range                                   |
|  `find_if_not`   | Find element in range (negative condition)              |
|    `find_end`    | Find last subsequence in range                          |
| `find_first_of`  | Find element from set in range                          |
| `adjacent_find`  | Find equal adjacent elements in range                   |
|     `count`      | Count appearances of value in range                     |
|    `count_if`    | Return number of elements in range satisfying condition |
|    `mismatch`    | Return first position where two ranges differ           |
|     `equal`      | Test whether the elements in two ranges are equal       |
| `is_permutation` | Test whether range is permutation of another            |
|     `search`     | Search range for subsequence                            |
|    `search_n`    | Search range for element                                |

## Modifying sequence operations

|     Function      | Use                                                    |
| :---------------: | ------------------------------------------------------ |
|      `copy`       | Copy range of elements                                 |
|     `copy_n`      | Copy elements                                          |
|     `copy_if`     | Copy certain elements of range                         |
|  `copy_backward`  | Copy range of elements backward                        |
|      `move`       | Move range of elements                                 |
|  `move_backward`  | Move range of elements backward                        |
|      `swap`       | Exchange values of two objects                         |
|   `swap_ranges`   | Exchange values of two ranges                          |
|    `iter_swap`    | Exchange values of objects pointed to by two iterators |
|    `transform`    | Transform range                                        |
|     `replace`     | Replace value in range                                 |
|   `replace_if`    | Replace values in range                                |
|  `replace_copy`   | Copy range replacing value                             |
| `replace_copy_if` | Copy range replacing value                             |
|      `fill`       | Fill range with value                                  |
|     `fill_n`      | Fill sequence with value                               |
|    `generate`     | Generate values for range with function                |
|   `generate_n`    | Generate values for sequence with function             |
|     `remove`      | Remove value from range                                |
|    `remove_if`    | Remove elements from range                             |
|   `remove_copy`   | Copy range removing value                              |
| `remove_copy_if`  | Copy range removing values                             |
|     `unique`      | Remove consecutive duplicates in range                 |
|   `unique_copy`   | Copy range removing duplicates                         |
|     `reverse`     | Reverse range                                          |
|  `reverse_copy`   | Copy range reversed                                    |
|     `rotate`      | Rotate left the elements in range                      |
|   `rotate_copy`   | Copy range rotated left                                |
| `random_shuffle`  | Randomly rearrange elements in range                   |
|     `shuffle`     | Randomly rearrange elements in range using generator   |
