---
title: Switch-case in C++
tags: [cpp]
---

When initializing separate variables inside switch cases, wrap the case code inside `{_}` braces

Refer [this answer](https://stackoverflow.com/a/11578973)

```cpp
double areaSwitchCase(int choice, vector<double> arr) {
    switch (choice) {
        // Circle
        case 1: {
            double r = arr[0];
            return M_PI * r * r;
        }
        // Rectangle
        case 2: {
            double l = arr[0], b = arr[1];
            return l * b;
        }
        default: {
            return 0;
        }
    }
}
```

For fun, also check out [Duff's device](https://belaycpp.com/2021/11/18/duffs-device-in-2021/)
