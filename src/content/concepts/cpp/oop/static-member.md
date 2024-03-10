---
title: Static Members in C++ classes
tags: [cpp, oop]
---

If we want to keep a data member or member function commonly accessible to all objects of the class (without being compiled separately for each object), we can make them `static`

Consider below example for computing the **Nth Padovan number** in [this GFG question](https://www.geeksforgeeks.org/problems/padovan-sequence2855/1). We pre-compute the `ans` vector only once and use that commonly for all objects of `Solution` class

> Static member variables must be defined outside of the class definition to allocate memory for them. Notice the `vector<int> Solution::ans;` line

```cpp
class Solution
{
    static vector<int> ans;

public:
    static void init()
    {
        // Pre-compute ans[] ONLY ONCE and use it everywhere
        if (ans.empty())
        {
            ans.resize(1e6 + 1, 0);
            ans[2] = ans[1] = ans[0] = 1;
            for (int i = 3; i <= 1e6; i++)
            {
                ans[i] = ans[i - 2] + ans[i - 3];
            }
        }
    }

    Solution()
    {
        init();
    }

    int padovanSequence(int n)
    {
        return ans[n];
    }
};

// Allocating memory for the static member
vector<int> Solution::ans;

int main()
{
    int t;
    cin >> t;
    while (t--)
    {
        int n;
        cin >> n;
        Solution ob;
        cout << "p(" << n << ") = " << ob.padovanSequence(n) << endl;
    }
    return 0;
}
```
