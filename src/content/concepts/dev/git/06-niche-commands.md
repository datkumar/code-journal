---
title: Some niche commands
tags: [git]
---

**Contents**:

- [Cherry-Pick](#cherry-pick)
- [Bisect](#bisect)
- [Worktrees](#worktrees)
  - [Linked Worktrees](#linked-worktrees)
- [Tags](#tags)

## Cherry-Pick

Use cherry-pick When you want to **take just specific commit's changes** from a branch without having to merge or rebase as you don't want _all_ the commits of that branch. Before starting your cherry-pick, you need a clean working tree (no uncommitted changes). Specify the commit you want to the [`git cherry-pick`](https://git-scm.com/docs/git-cherry-pick) command

```sh
megacorp on ⎇ add_partners [$]
$ git log --oneline
6944c60 (HEAD -> add_partners) P: Another partner added
9a759b8 O: One partner added
4dbb90a (main) N: Revert M
48d62e0 M: Integrated stashed work and resolved conflicts
e1d534d L: Apux script fix
f7900f6 (origin/main, origin/HEAD) Merge pull request #1 from datkumar/add_scanner
25c3e3b (origin/add_scanner) K: Scan credit cards, SSN, phone numbers
65452e1 J: redacted
94173e7 H: Merged some ours some theirs
44b139f G: Replaced some records
7430614 F: Removed some records
d310c78 E: fine, Greg can have this one
665e3bd D: add jayson to customers
dd95c7d C: update customers and partners
29d0005 B: slander
0d16f95 A: The Founding of MegaCorp and the End of Art

megacorp on ⎇ add_partners [$]
$ git switch main
Switched to branch 'main'

megacorp on ⎇ main [$]
$ git cherry-pick 9a759b8
[main fdb7a7e] O: One partner added
 Date: Sun Jul 26 18:59:01 2026 +0530
 1 file changed, 1 insertion(+)

megacorp on ⎇ main [$]
$ git log --oneline
fdb7a7e (HEAD -> main) O: One partner added
4dbb90a N: Revert M
48d62e0 M: Integrated stashed work and resolved conflicts
e1d534d L: Apux script fix
f7900f6 (origin/main, origin/HEAD) Merge pull request #1 from datkumar/add_scanner
25c3e3b (origin/add_scanner) K: Scan credit cards, SSN, phone numbers
65452e1 J: redacted
94173e7 H: Merged some ours some theirs
44b139f G: Replaced some records
7430614 F: Removed some records
d310c78 E: fine, Greg can have this one
665e3bd D: add jayson to customers
dd95c7d C: update customers and partners
29d0005 B: slander
0d16f95 A: The Founding of MegaCorp and the End of Art

megacorp on ⎇ main [$]
$ cat orgs/partners.txt
partner list
SalesInc
TheStartup
ClosedML
```

## Bisect

Suppose you have a piece of code in production that is causing issues and you want to **know exactly when particular change was introduced**. For small teams with fewer number of commits, you might just get by with manually scanning each commit's changes. However, for large teams with numerous commits, such manual scanning would take too long and might not be feasible. This is where the [`git bisect`](https://git-scm.com/docs/git-bisect) command comes in to help your search

Since the history of commits can be thought of as an list of commits **ordered by time**, you can apply **binary search** over it to find the exact target commit where buggy code was introduced. Git asks you to specify the **starting** _good_ and **ending** _bad_ commit points you're aware of, over which it will then be run binary search. At each midpoint commit, it prompts you whether that commit is _good_ or _bad_ and then only looks to the half part which contains _bad_ commits. The process keeps repeating until we reach a singular commit which is our target commit that introduced the bug. Linear search would take us $O(n)$ time but binary search significantly reduces it to $O(logn)$ time

![Git Bisect](/code-journal/diagrams/git-bisect.svg)

```sh title="Git Bisect in action"
megacorp on ⎇ main [$]
$ git log --oneline
fdb7a7e (HEAD -> main) O: One partner added
4dbb90a N: Revert M
48d62e0 M: Integrated stashed work and resolved conflicts
e1d534d L: Apux script fix
f7900f6 (origin/main, origin/HEAD) Merge pull request #1 from datkumar/add_scanner
25c3e3b (origin/add_scanner) K: Scan credit cards, SSN, phone numbers
65452e1 J: redacted
94173e7 H: Merged some ours some theirs
44b139f G: Replaced some records
7430614 F: Removed some records
d310c78 E: fine, Greg can have this one
665e3bd D: add jayson to customers
dd95c7d C: update customers and partners
29d0005 B: slander
0d16f95 A: The Founding of MegaCorp and the End of Art

megacorp on ⎇ main [$]
$ git bisect start
status: waiting for both good and bad commits

megacorp on ⎇ main (BISECTING) [$]
$ git bisect bad
status: waiting for good commit(s), bad commit known

megacorp on ⎇ main (BISECTING) [$]
$ git bisect good 29d0005
Bisecting: 6 revisions left to test after this (roughly 3 steps)
[94173e7c003503ce372d362ece23c2087a3339bd] H: Merged some ours some theirs

megacorp on ⎇ HEAD (94173e7) (BISECTING) [$]
$ git show
commit 94173e7c003503ce372d362ece23c2087a3339bd (HEAD)
Merge: 44b139f 7430614
Author: Kumar Deshmukh <kumar.deshmukh945@gmail.com>
Date:   Tue Jul 7 22:42:30 2026 +0530

    H: Merged some ours some theirs


megacorp on ⎇ HEAD (94173e7) (BISECTING) [$]
$ cat scripts/scan.sh
# TODO: write the script

megacorp on ⎇ HEAD (94173e7) (BISECTING) [$]
$ git bisect good
Bisecting: 3 revisions left to test after this (roughly 2 steps)
[f7900f6e723b5c462410721b2d6722827cc6fca1] Merge pull request #1 from datkumar/add_scanner

megacorp on ⎇ HEAD (f7900f6) (BISECTING) [$]
$ cat scripts/scan.sh
printf "\n====== SCANNING FOR CREDIT CARD NUMBERS ======\n"
grep -rE --color=always '(\b[0-9]{4}[- ]?){3}[0-9]{4}\b' . --exclude-dir={.git} --line-number
echo "========= CREDIT CARD SCAN COMPLETE =========="
printf "\n==== SCANNING FOR SOCIAL SECURITY NUMBERS ====\n"
grep -rE --color=always '\b[0-9]{3}-[0-9]{2}-[0-9]{4}\b' . --exclude-dir={.git} --line-number
echo "======= SOCIAL SECURITY SCAN COMPLETE ========"
printf "\n========= SCANNING FOR PHONE NUMBERS =========\n"
grep -rE --color=always '\b[0-9]{3}-[0-9]{3}-[0-9]{4}\b' . --exclude-dir={.git} --line-number
grep -rE --color=always '\([0-9]{3}\) [0-9]{3}-[0-9]{4}' . --exclude-dir={.git} --line-number
echo "========= PHONE NUMBER SCAN COMPLETE ========="

megacorp on ⎇ HEAD (f7900f6) (BISECTING) [$]
$ git bisect bad
Bisecting: 0 revisions left to test after this (roughly 1 step)
[25c3e3b8a81f7de87cccf6fdf42aea589c2818cd] K: Scan credit cards, SSN, phone numbers

megacorp on ⎇ HEAD (25c3e3b) (BISECTING) [$]
$ cat scripts/scan.sh
printf "\n====== SCANNING FOR CREDIT CARD NUMBERS ======\n"
grep -rE --color=always '(\b[0-9]{4}[- ]?){3}[0-9]{4}\b' . --exclude-dir={.git} --line-number
echo "========= CREDIT CARD SCAN COMPLETE =========="
printf "\n==== SCANNING FOR SOCIAL SECURITY NUMBERS ====\n"
grep -rE --color=always '\b[0-9]{3}-[0-9]{2}-[0-9]{4}\b' . --exclude-dir={.git} --line-number
echo "======= SOCIAL SECURITY SCAN COMPLETE ========"
printf "\n========= SCANNING FOR PHONE NUMBERS =========\n"
grep -rE --color=always '\b[0-9]{3}-[0-9]{3}-[0-9]{4}\b' . --exclude-dir={.git} --line-number
grep -rE --color=always '\([0-9]{3}\) [0-9]{3}-[0-9]{4}' . --exclude-dir={.git} --line-number
echo "========= PHONE NUMBER SCAN COMPLETE ========="

megacorp on ⎇ HEAD (25c3e3b) (BISECTING) [$]
$ git bisect bad
Bisecting: 0 revisions left to test after this (roughly 0 steps)
[65452e1ccac4c2d94564dbe18f92aa55457aa473] J: redacted

megacorp on ⎇ HEAD (65452e1) (BISECTING) [$]
$ cat scripts/scan.sh
# TODO: write the script

megacorp on ⎇ HEAD (65452e1) (BISECTING) [$]
$ git bisect good
25c3e3b8a81f7de87cccf6fdf42aea589c2818cd is the first bad commit
commit 25c3e3b8a81f7de87cccf6fdf42aea589c2818cd (origin/add_scanner)
Author: Kumar Deshmukh <kumar.deshmukh945@gmail.com>
Date:   Fri Jul 10 01:10:04 2026 +0530

    K: Scan credit cards, SSN, phone numbers

 scripts/scan.sh | 11 ++++++++++-
 1 file changed, 10 insertions(+), 1 deletion(-)

# FOUND OUR TARGET COMMIT. VERIFY CHANGES IT MADE:

megacorp on ⎇ HEAD (65452e1) (BISECTING) [$]
$ git status
HEAD detached at 65452e1
You are currently bisecting, started from branch 'main'.
  (use "git bisect reset" to get back to the original branch)

nothing to commit, working tree clean

megacorp on ⎇ HEAD (65452e1) (BISECTING) [$]
$ git log -p 25c3e3b8a81f7de87cccf6fdf42aea589c2818cd

megacorp on ⎇ HEAD (65452e1) (BISECTING) [$] took 4s
$ git show 25c3e3b8a81f7de87cccf6fdf42aea589c2818cd
commit 25c3e3b8a81f7de87cccf6fdf42aea589c2818cd (origin/add_scanner)
Author: Kumar Deshmukh <kumar.deshmukh945@gmail.com>
Date:   Fri Jul 10 01:10:04 2026 +0530

    K: Scan credit cards, SSN, phone numbers

diff --git a/scripts/scan.sh b/scripts/scan.sh
index f4d9eb2..be676a7 100755
--- a/scripts/scan.sh
+++ b/scripts/scan.sh
@@ -1 +1,10 @@
-# TODO: write the script
+printf "\n====== SCANNING FOR CREDIT CARD NUMBERS ======\n"
+grep -rE --color=always '(\b[0-9]{4}[- ]?){3}[0-9]{4}\b' . --exclude-dir={.git} --line-number
+echo "========= CREDIT CARD SCAN COMPLETE =========="
+printf "\n==== SCANNING FOR SOCIAL SECURITY NUMBERS ====\n"
+grep -rE --color=always '\b[0-9]{3}-[0-9]{2}-[0-9]{4}\b' . --exclude-dir={.git} --line-number
+echo "======= SOCIAL SECURITY SCAN COMPLETE ========"
+printf "\n========= SCANNING FOR PHONE NUMBERS =========\n"
+grep -rE --color=always '\b[0-9]{3}-[0-9]{3}-[0-9]{4}\b' . --exclude-dir={.git} --line-number
+grep -rE --color=always '\([0-9]{3}\) [0-9]{3}-[0-9]{4}' . --exclude-dir={.git} --line-number
+echo "========= PHONE NUMBER SCAN COMPLETE ========="

megacorp on ⎇ HEAD (65452e1) (BISECTING) [$]
$ git bisect reset
Previous HEAD position was 65452e1 J: redacted
Switched to branch 'main'

megacorp on ⎇ main [$]
$ git revert 25c3e3b8a81f7de87cccf6fdf42aea589c2818cd
[main 0c9a3b2] P: Revert K
 1 file changed, 1 insertion(+), 10 deletions(-)

megacorp on ⎇ main [$] took 44s
$ git show
commit 0c9a3b24e677e72d8a87f1bef13b63a93685a424 (HEAD -> main)
Author: Kumar Deshmukh <kumar.deshmukh945@gmail.com>
Date:   Sun Jul 26 22:41:51 2026 +0530

    P: Revert K

    This reverts commit 25c3e3b8a81f7de87cccf6fdf42aea589c2818cd.

diff --git a/scripts/scan.sh b/scripts/scan.sh
index be676a7..f4d9eb2 100755
--- a/scripts/scan.sh
+++ b/scripts/scan.sh
@@ -1,10 +1 @@
-printf "\n====== SCANNING FOR CREDIT CARD NUMBERS ======\n"
-grep -rE --color=always '(\b[0-9]{4}[- ]?){3}[0-9]{4}\b' . --exclude-dir={.git} --line-number
-echo "========= CREDIT CARD SCAN COMPLETE =========="
-printf "\n==== SCANNING FOR SOCIAL SECURITY NUMBERS ====\n"
-grep -rE --color=always '\b[0-9]{3}-[0-9]{2}-[0-9]{4}\b' . --exclude-dir={.git} --line-number
-echo "======= SOCIAL SECURITY SCAN COMPLETE ========"
-printf "\n========= SCANNING FOR PHONE NUMBERS =========\n"
-grep -rE --color=always '\b[0-9]{3}-[0-9]{3}-[0-9]{4}\b' . --exclude-dir={.git} --line-number
-grep -rE --color=always '\([0-9]{3}\) [0-9]{3}-[0-9]{4}' . --exclude-dir={.git} --line-number
-echo "========= PHONE NUMBER SCAN COMPLETE ========="
+# TODO: write the script

megacorp on ⎇ main [$]
$ git log --oneline
0c9a3b2 (HEAD -> main) P: Revert K
fdb7a7e O: One partner added
4dbb90a N: Revert M
48d62e0 M: Integrated stashed work and resolved conflicts
e1d534d L: Apux script fix
f7900f6 (origin/main, origin/HEAD) Merge pull request #1 from datkumar/add_scanner
25c3e3b (origin/add_scanner) K: Scan credit cards, SSN, phone numbers
65452e1 J: redacted
94173e7 H: Merged some ours some theirs
44b139f G: Replaced some records
7430614 F: Removed some records
d310c78 E: fine, Greg can have this one
665e3bd D: add jayson to customers
dd95c7d C: update customers and partners
29d0005 B: slander
0d16f95 A: The Founding of MegaCorp and the End of Art
```

```diff
diff --git a/scripts/scan.sh b/scripts/scan.sh
index f4d9eb2..be676a7 100755
--- a/scripts/scan.sh
+++ b/scripts/scan.sh
@@ -1 +1,10 @@
-# TODO: write the script
+printf "\n====== SCANNING FOR CREDIT CARD NUMBERS ======\n"
+grep -rE --color=always '(\b[0-9]{4}[- ]?){3}[0-9]{4}\b' . --exclude-dir={.git} --line-number
+echo "========= CREDIT CARD SCAN COMPLETE =========="
+printf "\n==== SCANNING FOR SOCIAL SECURITY NUMBERS ====\n"
+grep -rE --color=always '\b[0-9]{3}-[0-9]{2}-[0-9]{4}\b' . --exclude-dir={.git} --line-number
+echo "======= SOCIAL SECURITY SCAN COMPLETE ========"
+printf "\n========= SCANNING FOR PHONE NUMBERS =========\n"
+grep -rE --color=always '\b[0-9]{3}-[0-9]{3}-[0-9]{4}\b' . --exclude-dir={.git} --line-number
+grep -rE --color=always '\([0-9]{3}\) [0-9]{3}-[0-9]{4}' . --exclude-dir={.git} --line-number
+echo "========= PHONE NUMBER SCAN COMPLETE ========="
```

The [`git blame`](https://git-scm.com/docs/git-blame) command can be used to see who made the change, not just when it was made.

You can also automate the search process by writing a shell script that detects whether the code change you're looking for exists in current commit or not. If present, use exit code `1` i.e. _bad_ commit and if not found use exit code `0` i.e. _good_ commit

```sh title="Shell script to validate commit"
if grep -q "SCANNING" "scripts/scan.sh"; then
    exit 1    # BAD commit
else
    exit 0    # GOOD commit
fi
```

```sh title="Automated bisect search with shell script"
megacorp on ⎇ main [$]
$ nano scripts/bisect.sh

megacorp on ⎇ main [$?] took 4s
$ chmod +x scripts/bisect.sh

megacorp on ⎇ main [$?]
$ git bisect start
status: waiting for both good and bad commits

megacorp on ⎇ main (BISECTING) [$?]
$ git bisect bad HEAD
status: waiting for good commit(s), bad commit known

megacorp on ⎇ main (BISECTING) [$?]
$ git bisect good 29d0005
Bisecting: 6 revisions left to test after this (roughly 3 steps)
[65452e1ccac4c2d94564dbe18f92aa55457aa473] J: redacted

megacorp on ⎇ HEAD (65452e1) (BISECTING) [$?]
$ git bisect run ./scripts/bisect.sh
running './scripts/bisect.sh'
Bisecting: 3 revisions left to test after this (roughly 2 steps)
[e1d534d0558ef975f76b5c00549e0d5a62fda3df] L: Apux script fix
running './scripts/bisect.sh'
Bisecting: 0 revisions left to test after this (roughly 1 step)
[f7900f6e723b5c462410721b2d6722827cc6fca1] Merge pull request #1 from datkumar/add_scanner
running './scripts/bisect.sh'
Bisecting: 0 revisions left to test after this (roughly 0 steps)
[25c3e3b8a81f7de87cccf6fdf42aea589c2818cd] K: Scan credit cards, SSN, phone numbers
running './scripts/bisect.sh'
25c3e3b8a81f7de87cccf6fdf42aea589c2818cd is the first bad commit
commit 25c3e3b8a81f7de87cccf6fdf42aea589c2818cd
Author: Kumar Deshmukh <kumar.deshmukh945@gmail.com>
Date:   Fri Jul 10 01:10:04 2026 +0530

    K: Scan credit cards, SSN, phone numbers

 scripts/scan.sh | 11 ++++++++++-
 1 file changed, 10 insertions(+), 1 deletion(-)
bisect found first bad commit

megacorp on ⎇ HEAD (25c3e3b) (BISECTING) [$?]
$ git bisect reset
Previous HEAD position was 25c3e3b K: Scan credit cards, SSN, phone numbers
Switched to branch 'main'

megacorp on ⎇ main [$?]
$ git status
On branch main
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        scripts/bisect.sh

nothing added to commit but untracked files present (use "git add" to track)

megacorp on ⎇ main [$?]
$ rm scripts/bisect.sh

megacorp on ⎇ main [$]
$ git status
On branch main
nothing to commit, working tree clean
```

Binary Search, good/bad labelling, script automation with exit code (0/1)

## Worktrees

A worktree (or "working tree" or "working directory") is just the directory on your filesystem where the code you're tracking with Git lives. Usually, we are dealing with just one worktree called the ""main worktree" at the root of your Git repo (where the `.git/` directory is) but there can be other worktrees too

Each worktree contains:

- Tracked files (files that Git knows about)
- Untracked files (files that Git doesn't know about)
- Modified files (files that Git knows about that have been changed since the last commit)

We use [`git worktree`](https://git-scm.com/docs/git-worktree) command to work with worktrees

```sh
# List existing worktrees
megacorp on ⎇ main [$]
$ git worktree list
/home/kdeshmukh/Desktop/projects-temp/megacorp 0c9a3b2 [main]
```

### Linked Worktrees

We know about:

- Stash (temporary storage for changes)
- Branches (parallel lines of development)
- Clone (copying an entire repo)

Worktrees accomplish a similar goal (allow you to work on different changes without losing work), but are particularly useful when:

- You want to switch back and forth between the two change sets without having to run a bunch of git commands (not branches or stash)
- You want to keep a light footprint on your machine that's still connected to the main repo (not clone)

The `main` worktree contains the `.git` directory with the entire state of the repo. It is heavy (lots of data in there!). To get a new `main` working tree requires a `git clone` or `git init`

On the other hand, a Linked Worktree:

- Contains a `.git` file (not a folder, just a file) with a path to the main working tree
- Is light (essentially no data in there!), about as light as a branch
- Can be complicated to work with when it comes to env files and secrets

To create a new worktree at a given path, run following command. The `<branch>` argument is optional; it will use the last part of the path as the branch name.

```sh
# Syntax to add a worktree:
git worktree add <path> [<branch>]
```

```sh
megacorp on ⎇ main [$]
$ pwd
/home/kdeshmukh/Desktop/projects-temp/megacorp

megacorp on ⎇ main [$]
$ git worktree list
/home/kdeshmukh/Desktop/projects-temp/megacorp 0c9a3b2 [main]

megacorp on ⎇ main [$]
$ git worktree add ../ultracorp
Preparing worktree (new branch 'ultracorp')
HEAD is now at 0c9a3b2 P: Revert K

megacorp on ⎇ main [$]
$ git worktree list
/home/kdeshmukh/Desktop/projects-temp/megacorp  0c9a3b2 [main]
/home/kdeshmukh/Desktop/projects-temp/ultracorp 0c9a3b2 [ultracorp]
```

You can see in the linked worktree:

```sh
ultracorp on ⎇ ultracorp [$]
$ pwd
/home/kdeshmukh/Desktop/projects-temp/ultracorp

ultracorp on ⎇ ultracorp [$]
$ la
.git  contributors  customers  orgs  README.md  scripts  slander.md

ultracorp on ⎇ ultracorp [$]
$ cat .git
gitdir: /home/kdeshmukh/Desktop/projects-temp/megacorp/.git/worktrees/ultracorp
```

Linked worktrees behave just like a "normal" git repo. You can create new branches, switch branches, delete branches, create tags, etc. However there is one thing you cannot work on a branch that is currently checked out by any other working tree (main or linked).

```sh
ultracorp on ⎇ ultracorp [$]
$ git branch -a
+ main
* ultracorp
  remotes/origin/HEAD -> origin/main
  remotes/origin/add_contrib
  remotes/origin/add_scanner
  remotes/origin/main

ultracorp on ⎇ ultracorp [$]
$ git switch main
fatal: 'main' is already used by worktree at '/home/kdeshmukh/Desktop/projects-temp/megacorp'
```

So how does your `main` worktree know about your linked worktree? Well, the references are stored in the `.git/worktrees` directory:

When you make a commit in a linked worktree, that commit is automatically reflected in the `main` worktree. Since the linked worktree doesn't have a `.git/` directory, so it's not a separate repository; it is just a different view of the same repository.

You can almost think of a linked worktree as just another branch in the same repo, but with its own space on the filesystem.

The `+` prefix before the branch name `ultracorp` indicates that the `ultracorp` branch is checked out in the linked worktree

```sh
megacorp on ⎇ main [$]
$ la .git/worktrees
ultracorp

megacorp on ⎇ main [$]
$ la .git/worktrees/ultracorp
commondir  gitdir  HEAD  index  logs  ORIG_HEAD  refs

megacorp on ⎇ main [$]
$ cat .git/worktrees/ultracorp/gitdir
/home/kdeshmukh/Desktop/projects-temp/ultracorp/.git

megacorp on ⎇ main [$]
$ git branch
* main
+ ultracorp
```

While stash might be useful for temporary changes, worktrees more suited for long-lived changes. When you are simultaneousy testing different methods to solve a certain problem, you could create another worktree and simultaneously continue development of the two approaches without having to switch branches each time.

At some point, when you are done with the worktree and no longer need it, you can clean it up with `remove` subcommand:

```sh
git worktree remove WORKTREE_NAME

megacorp on ⎇ main [$]
$ git branch
* main
+ ultracorp

megacorp on ⎇ main [$]
$ git worktree remove ultracorp

megacorp on ⎇ main [$]
$ git branch
* main
  ultracorp

megacorp on ⎇ main [$]
$ git worktree list
/home/kdeshmukh/Desktop/projects-temp/megacorp 0c9a3b2 [main]
```

Note how the `ultracorp` branch is not deleted, only the worktree.

An alternative is to delete the directory manually, then `prune` all the worktrees (removing the references to deleted directories)

```sh
megacorp on ⎇ main [$]
$ git worktree add ../sigmacorp
Preparing worktree (new branch 'sigmacorp')
HEAD is now at 0c9a3b2 P: Revert K

megacorp on ⎇ main [$]
$ git worktree list
/home/kdeshmukh/Desktop/projects-temp/megacorp  0c9a3b2 [main]
/home/kdeshmukh/Desktop/projects-temp/sigmacorp 0c9a3b2 [sigmacorp]

megacorp on ⎇ main [$]
$ la ../sigmacorp
.git  contributors  customers  orgs  README.md  scripts  slander.md

megacorp on ⎇ main [$]
$ cat ../sigmacorp/.git
gitdir: /home/kdeshmukh/Desktop/projects-temp/megacorp/.git/worktrees/sigmacorp

megacorp on ⎇ main [$]
$ rm -rf ../sigmacorp

megacorp on ⎇ main [$]
$ git worktree list
/home/kdeshmukh/Desktop/projects-temp/megacorp  0c9a3b2 [main]
/home/kdeshmukh/Desktop/projects-temp/sigmacorp 0c9a3b2 [sigmacorp] prunable

megacorp on ⎇ main [$]
$ git worktree prune

megacorp on ⎇ main [$]
$ git worktree list
/home/kdeshmukh/Desktop/projects-temp/megacorp 0c9a3b2 [main]
```

<!-- - Separate directory with a ref stored in original -->
<!-- - harder for environment variables, node_modules etc -->
<!-- - Can use this instead for long-lived stashes (easier switching) -->
<!-- - If folder deleted, assumed no ref no longer exists and can prune -->

---

## Tags

Immutable references to a commit. Once created, cannot modify name or assign to any other commit. Can give any name but usually kept for semantic versioning (`Major.Minor.Patch`)
