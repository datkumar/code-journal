---
title: Group Anagrams
ds: [array]
techniques: [hashing, sorting]
level: 2
links: [https://leetcode.com/problems/group-anagrams/]
---

## Problem Statement

Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once

```txt title="Examples"
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
Explanation:
    There is no string in strs that can be rearranged to form "bat".
    The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
    The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.

Input: strs = [""]
Output: [[""]]

Input: strs = ["a"]
Output: [["a"]]
```

---

## Brute-force

Compare every string in the array with every other string. For each pair, check if they are anagrams by counting and comparing their character frequencies

```txt
Maintain a grouped[] boolean array of total words size to mark each wor as grouped or not
For each word in list:
    If current word is already marked as grouped, SKIP processing it
    Create a new group with current word as its first element
    For each word AHEAD of current word:
        If that word has the same character frequency count as current word:
            Add that word to the current group and mark that word as grouped
    Add the group to the final result.
```

If input contains $n$ words of average length $m$ characters:

- There are $n(n-1)/2 \implies O(n^2)$ total word pairing comparisons in worst case, when every word encountered is un-grouped. Comparing two strings of average length $m$ by frequency counting takes $O(m)$ time. So, overall time taken would be $O(n^2 \cdot m)$
- We use $O(n)$ extra space to keep track of already grouped strings (excluding the final answer's storage)

| Metric | Complexity       |
| ------ | ---------------- |
| Time   | $O(n^2 \cdot m)$ |
| Space  | $O(n)$           |

> **Note**: We know that all anagrams of a word would have the same **frequency count** of respective characters. We can group list of words having the same frequency counts as values mapped to their key. We now have to figure out **how to generate the key of hashmap** to which the anagram words will be mapped

## Sorted Word as Key

The **sorted** word versions of any two anagrams will always be identical. We can use the sorted word string as **key** in Hash Map, whose mapped value is a list of all original words that match this sorted key

```cpp title="Sorted Word as Key"
vector<vector<string>> groupAnagrams (const vector<string> &strs) {
    // Stores {sortedWord: wordList} mapping entries in HashMap
    unordered_map<string, vector<string>> mappedWords;
    // Iterate through given list of words - O(n)
    for (const string &word : strs) {
        // Create copy of current word and sort it to get key of hashmap - O(mlogm)
        string sortedWord(word);
        sort(sortedWord.begin(), sortedWord.end());
        // Append current word into the values associated with that key
        mappedWords[sortedWord].emplace_back(word); // O(m) insertion into hashMap
    }
    // Return wordList values extracted from key-value pairs of HashMap as groups in answer
    vector<vector<string>> groups;
    for (const auto &[key, wordList] : mappedWords) {
        groups.emplace_back(wordList);
    }
    return groups;
}
```

For $n$ strings of average length $m$ characters,

Sorting each string takes $O(m \log m)$ time. Hash map insertions for string keys would take take $O(m)$ average time per string, not the $O(1)$ amortized time like they do when keys are primitive data-types like integers/pointers.
So total time becomes:

**Time taken** $= O (n * ( m\cdot logm + m)) \implies O(n \cdot m \cdot logm)$

We use $O(n \cdot m)$ extra space in total to store all strings inside the hash map as well as the final output groups

| Metric | Complexity                |
| ------ | ------------------------- |
| Time   | $O(n \cdot m \cdot logm)$ |
| Space  | $O(n \cdot m)$            |

## Encoded Word into Key

Instead of sorting each string, which used to take $O(m \cdot logm)$ time, we can build `int[26]` frequency-map array of the word, and then serialize its contents into an encoded string, which would be used as keys of hashmap for mapping anagram group words to it.

For example, both words `"cooler"` and `"recool"` would have their encoded key string as `"c1#e1#l1#o2#r1"` to be used as hashmap key to group them as values

```cpp title="Encoded Word into Key"
// Function to encode word into key calculated from the frequency-map of word
string getEncodedKey (const string &word) {
    // Build frequency-map array of word
    vector<int> freq(26, 0);
    for (const char &ch : word) {
        freq[ch - 'a']++;
    }
    // Build encoded word key string from frequency-map array
    string encodedKey = "";
    for (int i = 0; i < 26; i++) {
        if (freq[i] > 0) {  // this character occurs once or more in word
            // Append character + count + delimiter to key string like "r3#"
            char letter = 'a' + (char)i;
            int count = freq[i];
            encodedKey += letter + to_string(count) + "#";
        }
    }
    if (!encodedKey.empty()) encodedKey.pop_back();  // Remove last "#" delimiter

    return encodedKey;
}

vector<vector<string>> groupAnagrams (const vector<string> &strs) {
    // Stores {encodedWord: wordList} mapping entries in HashMap
    unordered_map<string, vector<string>> mappedWords;
    for (const string &word : strs) {
        // Get encoded key for this word to be used as key of HashMap
        string key = getEncodedKey(word);
        // Append current word into the values associated with the key
        mappedWords[key].emplace_back(word);
    }
    // Return wordList values extracted from key-value pairs of HashMap as groups in answer
    vector<vector<string>> groups;
    for (const auto &[key, wordList] : mappedWords) {
        groups.emplace_back(wordList);
    }
    return groups;
}
```

For $n$ words of average length $m$ characters each,

For each word from input, building the frequency-map array and converting it into encoded key string takes $O(m)$ time, since the alphabet size `26` is a constant. Further, inserting current word into the wordlist values associated with that encoded key string in the HashMap takes $O(m)$ time. Copying the original word of length $m$ into the hash map's `vector<string>` via `emplace_back(word)` also takes $O(m)$ time

We are doing this work for each of the $n$ words so the total time becomes:

**Time taken** $= O \Bigl(n * \Bigl[ (m + 26) + m + m\Bigr] \Bigr)  \implies O(n \cdot m)$

We use $O(n \cdot m)$ extra space in total to store the encoded key strings and associated grouped wordlist in the HashMap

| Metric | Complexity     |
| ------ | -------------- |
| Time   | $O(n \cdot m)$ |
| Space  | $O(n \cdot m)$ |

## Commutative Product Hash as Key

We assign a distinct prime number to each of the `26` lowercase English letters

The hash of a given word is the **product** of the prime numbers corresponding to its characters (taken modulo a large number to prevent _overflow_). Since **multiplication is commutative**, all anagrams will produce the exact same hash value regardless of which order the characters occur in anagram (the **final product** would be **same for all** of those anagrams)

Such commutative product hash functions are also called **Rolling Hash** functions

```cpp title="Commutative Product Hash as Key"
// Use 26 prime numbers corresponding to 26 characters 'a' to 'z'
const long long PRIMES[26] = {
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41,
    43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101,
};
// Large prime modulus for the products
const long long M = 101103107109113LL;

// Calculates hash value of given word as product of prime numbers associated for each of its characters
long long getCommutativeHash (const string &word) {
    // Stores calculated product to return as hash value answer
    long long product = 1;
    for (const char &ch : word) {
        // Use the associated prime number for this character
        int numForChar = PRIMES[ch - 'a'];
        // Multiply existing product with the number associated for current character
        product = (product * numForChar) % M;
    }
    return product;
}

vector<vector<string>> groupAnagrams (const vector<string> &strs) {
    // Stores {hashProduct: wordList} mapping entries in HashMap
    unordered_map<long long, vector<string>> mappedWords;
    for (const string &word : strs) {
        // Get hash value for this word to be used as key of HashMap
        long long hashVal = getCommutativeHash(word);
        // Append current word into the values associated with the key
        mappedWords[hashVal].emplace_back(word);
    }
    // Return wordList values extracted from key-value pairs of HashMap as groups in answer
    vector<vector<string>> groups;
    for (const auto &[key, wordList] : mappedWords) {
        groups.emplace_back(wordList);
    }
    return groups;
}
```

For $n$ words of average length $m$ characters each,

Computing the hash product takes $O(m)$ time per word since we iterate through each of its character once. However, since the hash product key is `long long` , a primitive data-type, the lookup and insertion operations on the HashMap are truly $O(1)$ amortized rather than $O(m)$ like we had for previous approach. So, appending the word entry into associated values for that hash product in the HashMap takes just $O(1)$ time. Copying the original word of length $m$ into the hash map's `vector<string>` via `emplace_back(word)` also takes $O(m)$ time

We are doing this work for each of the $n$ words so the total time becomes:

**Time taken** $= O \Bigl(n * ( m + 1 + m ) \Bigr)  \implies O(n \cdot m)$

We use $O(n \cdot m)$ extra space in total to store the hash product keys and associated grouped wordlist in the HashMap

| Metric | Complexity     |
| ------ | -------------- |
| Time   | $O(n \cdot m)$ |
| Space  | $O(n \cdot m)$ |

While prime product hashing works well for LeetCode's constraints, using modulo arithmetic as `% M` introduces a slight risk of hash collisions i.e. two non-anagram strings accidentally producing the same hash. In a strict production environment, you might need collision-handling (like verifying strings before grouping)
