#include <bits/stdc++.h>
using namespace std;

void solve () {}

int main () {
    cout << "======== PROGRAM START ========\n";
    auto start = chrono::steady_clock::now();
    /* =========================================================================== */

    solve();

    /* =========================================================================== */
    auto end = chrono::steady_clock::now();
    auto seconds_elapsed = chrono::duration_cast<chrono::duration<double>>(end - start).count();
    cout << "\n======== PROGRAM END ========\n";
    cout << fixed << setprecision(6) << "Time taken: " << seconds_elapsed << " sec\n";

    return 0;
}