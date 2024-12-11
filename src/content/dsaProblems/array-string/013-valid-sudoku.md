---
title: Valid Sudoku
ds: [array]
techniques: [hashing]
level: 2
links: [https://leetcode.com/problems/valid-sudoku/]
---

## Problem Statement

Determine if a `9 x 9` Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

- Each **row** must contain the digits 1-9 without repetition.
- Each **column** must contain the digits 1-9 without repetition.
- Each of the nine 3 x 3 **sub-boxes** of the grid must contain the digits 1-9 without repetition.

**Note**: A Sudoku board (partially filled) could be valid but is not necessarily solvable. Only the filled cells need to be validated according to the mentioned rules.

**Example**:

```txt
Input: board =
[
 ["5","3",".",".","7",".",".",".","."],
 ["6",".",".","1","9","5",".",".","."],
 [".","9","8",".",".",".",".","6","."],
 ["8",".",".",".","6",".",".",".","3"],
 ["4",".",".","8",".","3",".",".","1"],
 ["7",".",".",".","2",".",".",".","6"],
 [".","6",".",".",".",".","2","8","."],
 [".",".",".","4","1","9",".",".","5"],
 [".",".",".",".","8",".",".","7","9"]
]

Output: true
```

## Solution: Hashing

- To ensure the elements in each **row, column, square** are unique, maintain a **set** for each
- To track the elements in squares, maintain a `3x3` grid where each cell contains the digits in a square. The square grid cell that an element at `[x][y]` index position in input board will go to will be given by calculating `[x/3][y/3]`

```cpp title="C++"
bool isValidSudoku (vector<vector<char>> &board) {
    // Type alias for set of uniqie digits
    using uniqueDigits = unordered_set<int>;

    // To track digits in each row, column, square respectively
    vector<uniqueDigits> rowVals(9);
    vector<uniqueDigits> colVals(9);
    vector<vector<uniqueDigits>> squareVals(3, vector<uniqueDigits>(3));

    // Traverse each cell of board
    for (int r = 0; r < 9; r++) {
        for (int c = 0; c < 9; c++) {
            // Ignore cell if it's not a number
            if (board[r][c] == '.') continue;

            // '1'-'9' charcter digit converted to 0-8 index
            int curr = board[r][c] - '0' - 1;
            // Calcuate the position in 3*3 square grid
            int squareX = r / 3, squareY = c / 3;

            // If current digit already present in either of it's
            // row or column or square, the sudoku is INVALID
            if (
                rowVals[r].count(curr) || colVals[c].count(curr)
                || squareVals[squareX][squareY].count(curr)
            ) {
                return false;
            }

            // Add current cell to tracked entries
            rowVals[r].insert(curr);
            colVals[c].insert(curr);
            squareVals[squareX][squareY].insert(curr);
        }
    }

    // No conficts. So valid sudoku
    return true;
}
```

**Time taken**:

Traversing each cell of board takes \\( O(N^2) \\) time and each access or insert operation into the hash-set takes \\( O(1) \\) time on average. Thus, overall time complexity is \\( O(N^2) \\)

**Space used**:

- The row and column sets would have at-most \\( N \\) elements filled at each of the \\( N \\) total rows and columns i.e. \\( O(N^2) \\) space over all elements
- The grid for each square would have dimensions \\( \sqrt{N} \ast \sqrt{N} \\) and will contain at-most \\( N \\) elements at each cell of grid i.e. \\( O(N^2) \\) space over all elements

| Metric | Complexity      |
| ------ | --------------- |
| Time   | \\( O(N^2 ) \\) |
| Space  | \\( O(N^2) \\)  |
