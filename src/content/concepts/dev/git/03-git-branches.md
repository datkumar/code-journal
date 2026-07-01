---
title: Git Branches
tags: [git]
---

![Git branches](/code-journal/images/git-branches.png)

**Contents**:

- [What is a Git Branch?](#what-is-a-git-branch)
- [Creating and Switching between Branches](#creating-and-switching-between-branches)
  - [Rename Branch](#rename-branch)
- [Merging Branches](#merging-branches)
  - [The Merge Commit](#the-merge-commit)
  - [How is the Merge Commit computed?](#how-is-the-merge-commit-computed)
- [Merge Conflicts](#merge-conflicts)
  - [Mergetool](#mergetool)
  - [Preferring one side's changes](#preferring-one-sides-changes)
- [Fast-Forward Merge](#fast-forward-merge)
- [Rebasing](#rebasing)
  - [Conflicts during Rebase](#conflicts-during-rebase)
  - [Interactive Rebase](#interactive-rebase)
- [Deciding to Merge or Rebase](#deciding-to-merge-or-rebase)
- [Squashing](#squashing)
- [Rerere](#rerere)
- [Delete Branch](#delete-branch)

## What is a Git Branch?

A [Git Branch](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell) allows you to keep track of different changes separately

Suppose you want to create a small change or build a feature in project but you aren't sure about including it in the ongoing commit path. You can create a new `some-feature` branch from a certain point in your history of commits. Make your changes in that branch. The rest of the major development of your project can continue side-by-side on the `main` branch. Once you have finalized the changes of your `some-feature` branch and you want to include them, you can **merge** them into the `main` branch; or else if you want to discard them, simply delete the `some-feature` branch and come back into usual `main` branch

To view branches of the repository, use the [`git branch`](https://git-scm.com/docs/git-branch) command:

```sh title="List branches"
# List all LOCAL branches; current branch is marked by "*"
git branch

# List ALL branches (local and remote)
git branch -a
```

A branch in Git is simply a lightweight movable **named pointer to a commit**. Each branch pointer points to the **latest commit** in that branch, called the **tip** of that branch. Every time you make a commit, that branch pointer **moves forward automatically**. Git maintains a special `HEAD` pointer which points to the branch or commit you've currently at (i.e. done `checkout` into)

Also, each commit contains information about it's previous parent commit. This means the **links between commits go backwards into the history**. So creating new branches and switching between them is quite cheap as it just involves just moving the pointer. This makes branch operations quite fast compared to other VCSs which might have to spend time copying contents into separate branch directories

![Git Branches overview](/code-journal/diagrams/git-branch-basic.svg)

In above figure, the commit history consists of three branches: `main`, `dev` and `feature`. As per the branch pointers, `main` branch points to commit `C`, `dev` branch points to commit `E` and `feature` branch points to commit `G`. Since `HEAD` points to the `feature` branch, we are currently checked out on the feature branch. Any new commits created now will be added to the `feature` branch, causing both the `feature` branch and `HEAD` pointers and to advance to the new commit.

The branch history shown by `git log` would contain commits (in recent to older) order as:

- `main` branch log: `C`, `B`, `A`
- `dev` branch log: `E`, `D`, `C`, `B`, `A`
- `feature` branch log: `G`, `F`, `E`, `D`, `C`, `B`, `A`

Git's history is technically a directed acyclic graph (**DAG**), not a tree, because merge commits can have multiple parents. Branches are just pointers to commits. The commits (`A` to `G`) are the **immutable history**, while `main`, `dev`, `feature`, and `HEAD` are **movable references**.

In the normal **attached** state, `HEAD` points to a branch, which in turn points to the latest commit on that branch (`HEAD -> BRANCH_NAME -> COMMIT_HASH`). However, sometimes you might have a [**detached** `HEAD`](https://git-scm.com/docs/git-checkout#_detached_head), meaning the `HEAD` is directly pointing to a commit (`HEAD -> COMMIT_HASH`) instead of pointing to a branch. An example of this is when you have done `checkout` into an intermediate non-latest commit within a branch

## Creating and Switching between Branches

To create a new branch, specify the branch name to create after [`git branch`](https://git-scm.com/docs/git-branch) command:

```sh title="Create new branch"
# Creates a new branch named "feature" pointing to the current commit
git branch feature
```

Below figure shows how a new `feature` pointer is added to the current commit you're on (assuming you're on the latest tip with just one `main` branch previously)

![Create new branch](/code-journal/diagrams/git-branch-create.svg)

To switch into a branch, you can use either the `checkout` or the `switch` command:

- The [`git checkout`](https://git-scm.com/docs/git-checkout) command is the older multi-purpose command that can be used to switch into a branch, switch into a commit or even restore file(s) from a commit
- The [`git switch`](https://git-scm.com/docs/git-switch) command is a newer one specifically aimed at just creating and switching branches

```sh title="Switch into an EXISTING branch"
git switch BRANCH_NAME
git checkout BRANCH_NAME
```

```sh title="Create NEW branch & Switch into it"
git switch -c BRANCH_NAME
git checkout -b BRANCH_NAME
```

The `checkout` command can also be useThe git rerere functionality is a bit of a hidden feature. The name stands for “reuse recorded resolution” and, as the name implies, it allows you to ask Git to remember how you’ve resolved a hunk conflict so that the next time it sees the same conflict, Git can resolve it for you automatically.d to switch into a certain commit within the history or restore certain files' state from older history too:

```sh title="Other uses of 'checkout'"
# Switch into a commit (puts 'HEAD' in detached if not latest commit of any branch)
git checkout COMMIT_HASH

# Restore file(s) from a commit
git checkout COMMIT_HASH -- file1.txt file2.md
```

If you wanted to create a branch from any commit that isn't the tip of existing branch, you would specify that start point (if not specified, the latest commit of current branch is assumed) as shown below. The `START_POINT` value could be a `COMMIT_HASH`,or a `BRANCH_NAME` (new branch would be created from tip of that branch) or even any other refs or patterns (`HEAD~2`, `main~2`, tags)

```sh title="Creating new branch off a specific point"
# Just create new branch off that start point
git branch BRANCH_NAME START_POINT
# Create and switch into the new branch
git switch -c BRANCH_NAME START_POINT
git checkout -b BRANCH_NAME START_POINT
```

As illustrated in below image, consider you are on default `main` branch having three commits `A`, `B`, `C` created in that order. Now when you create a new branch `feature`, a new pointer gets created pointing to the latest commit in the branch you were in, i.e. to latest commit `C` in `main` branch. This is known as the **branch base** of the newly created `feature` branch

At this point, both `main` and `feature` branches are pointing to `C` with your current branch `main` as indicated by `HEAD`. To start working in the new `feature` branch, switch into that branch via `checkout` or `switch` command. This would move the `HEAD` pointer to now point to `feature` instead of `main` as your current branch.

![Create and switch into branch](/code-journal/diagrams/git-branch-create-switch.svg)

While switched into the new `feature` branch, let's say you make a few changes and end up creating two new commits `D` and `E` as seen in below image. As you make these commits, the `feature` branch pointer (and `HEAD` pointer along with it) move forward to point to the latest made commit in that branch. However, note that the rest of the branch pointers like `main` stay right where they are. So after making `C` and `D` commits in `feature` branch, you'd have the `feature` branch as **two commits ahead** of `main`

![Make commits into new branch](/code-journal/diagrams/git-branch-feature-commit.svg)

Switching back from `feature` into `main` branch would involve moving the `HEAD` pointer back two places to commit `C` where `main` was pointing. Note that as we are moving the pointers, we are hopping over series of commits i.e. over snapshots of the project at different points of time. This switching of branches **applies/discards the changes of those commits** over the files in your working directory

Later, when that feature is finalized and you wish to merge it into `main` branch, Git would look for the **merge base** by searching the **closest common ancestor** of those two branches which would be `C` in given case

A branch name is an alias to the commit it is pointing to. So the `git log` output shows history from that commit and going backwards in history

```sh title="Logging specific commit history"
# Shows current branch's history (starting from which commit HEAD is pointing to)
git log
# Shows specified branch's history (starting from tip of that branch)
git log BRANCH_NAME
# Shows history starting from that commit
git log COMMIT_HASH
# View entire history of ALL Branches in graph mode
git log --oneline --graph --all
```

To view the full refs instead of just the branch name in your commit log, add the `--decorate=full` flag

A branch is a type of ref in Git. A [ref](https://git-scm.com/book/en/v2/Git-Internals-Git-References) is a human-readable alias or pointer that resolves to a specific commit hash. All branches are refs, but all refs are not branches; they are also used for `tags` and `remotes`. These are located at `.git/refs` directory and the file content is the commit hash they're aliasing. A branch is a mutable pointer to a commit while a [tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging) is an immutable pointer to a commit.

```sh title="View refs"
la .git/refs
# heads  remotes  tags

cat .git/HEAD
# ref: refs/heads/main

# View the local "main" branch's ref ("heads/" folder used for local branches)
cat .git/refs/heads/main
# 555b3124d683077c23afc26a3f2333e2e3786c94

# Full ref of branches shown instead of just branch names
git log --oneline --decorate=full
# 555b312 (HEAD -> refs/heads/main, refs/remotes/origin/main) G: Updated Movie list
# a23ad5f F: Merge branch 'add_classics'
# 8340a1c E: Filled contents.md
# 8b65cb1 D: add classics
# a8438bf C: add quotes
# 23f52f6 B: add titles
# 3af19e9 A: add contents.md
```

### Rename branch

The default branch in Git is named `master` and it gets created when you do `git init`. You can set the `defaultBranch` option under `init` section in your Git config file to define default branch name for new repos being created. You can also rename an existing branch by passing the `-m` or `--move` flag to `git branch` as follows

```sh title="Rename branch"
# Move/rename a branch, together with its config and reflog
git branch -m OLD_NAME NEW_NAME
git branch -m feature feature-pagination
```

GitHub recently changed it's default branch name from `master` to `main`, thereby, they have `git branch -M main` among their steps in creating new repo; `-M` flag is aliased as `--move --force` for force rename

---

## Merging Branches

When you have finished working on your separate branch and wish to include it in the final `main` line, you would merge your branch into `main`. Consider the below example:

Say you're currently working separately on the `feature` branch that was created out of commit `B` of `main`. You have made two commits `D` and `E` in that feature branch and now finalized that you want all this work of `feature` branch to be included within the `main` branch's history. While you were working in the `feature` branch, there could be some ongoing work that could have continued in the `main` branch that wasn't included in your branch's history, like the commit `C` on which `main` is currently on.

To merge your `feature` branch into `main`, use the [`git merge`](https://git-scm.com/docs/git-merge) command as follows:

```sh title="Merge 'feature' branch into 'main'"
# Switch to the branch in which you want to merge your branch into
# We want to merge "feature" branch's work into "main" branch
git switch main
# Do the merge operation
git merge feature
```

![Git Merge](/code-journal/diagrams/git-merge.svg)

```sh frame="none"
# Histories of both branches BEFORE merging
on ⎇ main
$ git log --oneline --graph --parents --all
* 11d327f e2df797 (HEAD -> main) C
| * acf8420 75f4cf9 (feature) E
| * 75f4cf9 e2df797 D
|/
* e2df797 4c35bbc B
* 4c35bbc A

# Histories of both branches AFTER merging
on ⎇ main
$ git log --oneline --graph --parents --all
*   22088ec 11d327f acf8420 (HEAD -> main) M: Merge branch 'feature'
|\
| * acf8420 75f4cf9 (feature) E
| * 75f4cf9 e2df797 D
* | 11d327f e2df797 C
|/
* e2df797 4c35bbc B
* 4c35bbc A
```

### The Merge Commit

The merge operation creates a new merge commit which has **two parents** - the tips (i.e. latest commits) of the two branches it is merging. In above example, `M` would be the merge commit, whose parents are `C` and `E`, the tips of branches `main` and `feature` respectively. Note that we can also **merge more than two branches** at a time, and the merge commit would have **that many parents**

The two-parent nature of the merge commit can be verified by the graph log output above. The merge commit `M: Merge branch 'feature'` having commit hash `22088ec` has two values for the parent commit:

- **First parent** having hash `11d327f` is the commit `C` i.e. the **existing branch's tip** of `main` before the merge operation
- **Second parent** having hash `acf8420` is the commit `E` i.e. tip of the `feature` branch which we want to merge into `main`

The merge commit is the only commit having two parents (or more also), most other commits have only one previous parent commit, with the first commit having none. This two-parent nature prevents the git graph from qualifying as a tree, even though it has no cycles. Thereby, the git history graph is said to be a **Directed Acyclic Graph (DAG)**. Traversing these parent pointers moves backwards in history from branch tips toward the repository's root commit

### How is the Merge Commit computed?

We know the merge commit `M` of above example is made from the two parents `C` and `E` of the two branches, but how exactly does it decide what the resulting state of file contents would be?

Some might think it would first apply all changes of first parent branch i.e. of `main` and then the changes of second parent branch i.e. `feature` over it. However, that is not the case. During the merge operation, git does the following steps:

- It first finds the **closest common ancestor** of those branches, known as the **merge base**. For above example, the merge base would be the commit `B`, which is from where the divergent branching-out happened.
- Git computes three snapshots (a commit is a snapshot of the repository at that a particular stage):
  - `base` : contents of the merge base i.e. commit `B`
  - `ours` : contents of tip of the branch we're currently in i.e. first parent i.e. commit `C`
  - `theirs` : contents of tip of the branch we want to merge in ours i.e. second parent i.e. commit `E`
- Then, it attempts to do a **three-way merge** of these three snapshots; note that the merge operation only cares about the two parent commits, not the intermediate commits in those two branches after the merge-base (like `D` or if any commit was between `B` and `C`)
- If all goes well, it would result in the merge commit `M` being created and the current branch's pointers i.e. `main`, `HEAD` moving ahead to that merge commit.
- However, a lot of times, the tree-way merge operation does not succeed automatically, resulting in **merge conflicts**. This could happen when, say both parent commit snapshots have modified the same file in the same region. In such cases, you would have to resolve those conflicts and then continue with making the merge commit

When the merge operation succeeds without conflicts, Git would open the system's default editor (decided by `EDITOR` environment variable) to allow you to enter the merge commit's message. Default message for our example would be `Merge branch 'feature'`. It would also say which strategy it used for the merge operation (`ort` here is the optimized modern strategy over older `recursive` one)

```sh title="Merge operation when there are no conflicts"
$ git merge feature
Merge made by the 'ort' strategy.
 myfile.txt | 6 ++++++
 1 file changed, 6 insertions(+)
 create mode 100644 myfile.txt
```

You need a way to combine the **divergent histories** of the two branches you are merging (`main` and `feature`), into a single one, which is why the merge commit is created. Beyond the merge base `B`, the changes diverged where `main` branch had commit `C` and `feature` had commits `D`, `E` which would be combined into a single resulting merge commit

## Merge Conflicts

While merging, if there are any merge conflicts, you would have to resolve them before the merge can succeed. The **non-conflicting** changes would get **staged automatically** and git would wait for you to resolve conflicts for the files containing merge conflicts, before making the final merge commit.

The merge command's output would indicate that merge operation failed and which files have conflicts

```sh title="Conflict while merging"
$ git merge feature
Auto-merging notes.txt
CONFLICT (content): Merge conflict in notes.txt
Automatic merge failed; fix conflicts and then commit the result.

$ git status
On branch main
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)
        both modified:   notes.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

In the files which have any merge conflict, you would see both versions of the contents for which Git is confused about. The non-conflicting regions of the file would appear as-is. It is recommended to use a text editor or IDE to visually compare and decide which parts you want in the final merged version. Below example shows how the contents would look like in a file that contains merge conflicts

- First you'll see the `ours` version i.e. of the branch in which you're currently in (which `HEAD` points to i.e. `main`). Notice the `<<<<<<< HEAD` part indicating the start of `ours` section
- After `ours` section ends, you'll see a separator line `=======` between the two versions before starting the `theirs` section
- Finally, you'll see the `theirs` version i.e. of the branch which you want to merge into current branch `main` i.e. of `feature` branch. Notice the `>>>>>>> feature` part indicating the end of `theirs`

At this point, you have three options to resolve conflict at each of the sections:

1. Use the current branch's change only i.e. the `ours` section (`HEAD` part)
2. Use the incoming branch's change only i.e. the `theirs` section (`feature` part here)
3. Use a combination of both versions or your own modified result. For this, you'll have to manually edit the contents over the conflicted section and remove those conflict section markers too.

```txt title="File Merge conflict example"
A
B
<<<<<<< HEAD
C
=======
D
E
>>>>>>> feature
```

### Mergetool

There are a bunch of [`mergetool`](https://git-scm.com/docs/git-mergetool) options which you can set as the editor for helping you to open and resolve conflicts:

```sh title="Using 'mergetool' to resolve conflicts"
# View list of mergetool editors:
git mergetool --tool-help
# Some options listed are: vscode, nvimdiff vimdiff,vimdiff1, vimdiff2, vimdiff3, meld ...

# Define your mergetool in the global git config:
git config --global merge.tool vscode
# You can also modify the command to run:
git config --global mergetool.vscode.cmd 'code --wait --merge $REMOTE $LOCAL $BASE $MERGED'

# Launching the mergetool (in order to resolve merge conflicts):
git mergetool
```

There is also [`git diff`](https://git-scm.com/docs/git-diff) or [`difftool`](https://git-scm.com/docs/git-diff) if you wish to only view where the merge conflicts are

### Preferring one side's changes

While resolving conflicts, if you wish to take entire of `ours` version for one or more of the conflicting files, you would do so by providing those files to `checkout --ours` as shown below. Similarly if you wanted to use the incoming branch's version use `--theirs` instead of `--ours` i.e. `git checkout --theirs FILE_PATTERN`. Make sure to stage your resolved file edits (`git add .`) and finally make a commit (`git commit -m "some message"`) to ensure the merge operation succeeds and a merge commit is made.

```sh title="Taking current (HEAD) branch's changes during conflict"
# Syntax:
git checkout --ours FILE_PATTERN
# To take existing branch's version for SPECIFIC conflicting files
git checkout --ours file1.txt file2.md
# To take existing branch's version for ALL conflicting files
git checkout --ours .
```

In VSCode:

- "Accept Incoming Change" refers to `git checkout --theirs`
- "Accept Current Change" refers to `git checkout --ours`

If at any point during resolving the merge conflicts you feel that you do not want to complete the merge operation, you can `abort` the merge operation as follows. It would set you back into the state you were in before initiating the merge operation

```sh title="Abort Merge operation"
git merge --abort
```

## Fast-forward Merge

There is a simpler case of merging branches called the [**fast-forward merge**](https://git-scm.com/docs/git-merge#_fast_forward_merge). This occurs when the tip of our current branch does not have any new commits since the branching-out of the other branch happened. Notice how in below figure, when we are attempting to merge the `feature` branch into our current `main` branch, `main` branch does not have any new commit since the `feature` branch was created out of commit `B`

![Fast-forward Merge](/code-journal/diagrams/git-merge-fast-fwd.svg)

```sh title="Fast-forward Merge"
# While switched into 'main' branch, merge 'feature' branch into it
$ git merge feature
Updating b49a2a9..4aa9bc2
Fast-forward
 notes.txt | 2 ++
 1 file changed, 2 insertions(+)
```

In other words, the **tip of our current branch is the same as the merge base**. As above figure shows, the tip of current branch `main` is at commit `B` and tip of the branch we want to merge in ours i.e. of `feature` is at commit `E`. The commit `B` is also the merge base i.e. closest common ancestor for the tips `B` and `E`. The history of the other `feature` branch (`A <- B <- D <- E`) already contains entire history of our current `main` branch (`A <- B`) and the current branch is **just a few commits behind** the other branch. There are **no divergent histories** and thereby we would **no new merge commit** needed to get a combined snapshot. To phrase that another way, when you try to merge one commit with a commit that can be reached by following the first commit’s history, Git simplifies things by moving the pointer forward because there is no divergent work to merge together  - this is called a “fast-forward”

You can verify this by the `git log` outputs below for before and after the fast-forward merge operation. Thus, no new merge commit was created and just the pointers of current branch (`HEAD -> main`) moved to the other `feature` branch's tip

```sh frame="none"
# Histories of both branches BEFORE FF Merge
on ⎇ main
$ git log --oneline --graph --parents --all
* 4aa9bc2 e31a846 (feature) E
* e31a846 b49a2a9 D
* b49a2a9 d75815f (HEAD -> main) B
* d75815f A

on ⎇ main
# Histories of both branches AFTER FF Merge
$ git log --oneline --graph --parents --all
* 4aa9bc2 e31a846 (HEAD -> main, feature) E
* e31a846 b49a2a9 D
* b49a2a9 d75815f B
* d75815f A
```

Merging branches this way prevents having to deal with merge conflicts and an extra merge commit. For such a **happy path workflow**, keep your `main` branch behind your ongoing separate branch without making any extra commits within `main`

---

## Rebasing

Rebase is a powerful command that gets a bad rep since many people confuse it with merge and use it the wrong way. Rebase is used when you want to keep your separate branch like `feature` ahead of the ongoing primary branch like `main`. This keeps your history clean and **allows for a fast-forward merge later** when you wish to merge it into `main`, without creating any additional merge commits or having divergent branches

While working in your separate `feature` branch, the ongoing `main` branch could have some extra commits being added. To include them within your `feature` branch,
rebase your `feature` branch onto `main` branch via the [`git rebase`](https://git-scm.com/docs/git-rebase) command as follows:

```sh title="Rebase 'feature' branch onto 'main'"
# While you're in 'feature' branch
git switch feature
git rebase main
```

![Git Rebase](/code-journal/diagrams/git-rebase.svg)

Consider example of the figure shown above. The `feature` branch has branched-off from the commit `B` and has two commits `E` and `F` within it. However, alongside this, the `main` branch has continued work and added commits `C`, `D`. These `C`, `D` extra commits of `main` branch are not reachable from your `feature` branch.

If you attempted to merge `main` branch while you're in `feature` branch (as shown in below half), you would create a new merge commit `M` whose first parent would be the tip `F` of current `feature` branch and second parent would be the tip `D` of the `main` branch. This addition of a merge commit each time in our branch's work history might be undesirable as we may often wish to sync our `feature` branch with ongoing work of `main`

Rebase does things a bit differently:

- It first identifies the **tip of the `main` branch** you're rebasing your current `feature` branch onto i.e. the latest commit `D` of `main`. Then, it uses that tip commit as the **temporary new base** for the rebase process. Before starting, the parent of the first commit `E` of your `feature` branch was the commit `B`. Now the parent of commit `E` was updated to be the the tip commit `D` of `main`
- Then it **replays each commit's patch** from your `feature` branch over this temporary base, **one-by-one** i.e. first commit `E`'s changes applied over the new base `D`, then commit `F`'s changes over it
- Since the parent commit changes, the commit hash would also need to be computed and would change; this would happen for each commit of your `feature` branch. See in figure how `E'` and `F'` are the updated commits after rebase operation

Notice the `git log` output below for the example in figure before and after `feature` branch was rebased onto `main`. Earlier, the commit `E` having hash `cd3686b` had parent as commit `B` with hash `6fd2b08`. However, after rebasing, the hash of commit `E` changed to `c72020b` with updated commit message `E resolved` and it's parent commit hash also changed to `e2bab05` i.e. the commit `D`. Similarly, the commit `F` also changed its commit hash from `5be80ae` to `32ba737` after and parent commit became the updated `E resolved` one

```sh title="Branch histories before and after rebase"
# Histories of both branches BEFORE rebasing:
on ⎇ feature
$ git log --oneline --graph --parents --all
* e2bab05 10b71ef (main) D
* 10b71ef 6fd2b08 C
| * 5be80ae cd3686b (HEAD -> feature) F
| * cd3686b 6fd2b08 E
|/
* 6fd2b08 c5870e9 B
* c5870e9 A

# Histories of both branches AFTER rebasing:
on ⎇ feature
$ git log --oneline --graph --parents --all
* 32ba737 c72020b (HEAD -> feature) F resolved
* c72020b e2bab05 E resolved
* e2bab05 10b71ef (main) D
* 10b71ef 6fd2b08 C
* 6fd2b08 c5870e9 B
* c5870e9 A
```

The rebase operation did not affect the `main` branch. After rebase operation finishes, your `feature` includes all changes from `main`

> Rebase rewrites history of the current branch you're rebasing. So you must never rebase a shared/public branch like `main` over anything as it would rewrite history of `main` branch itself and the `main` branch histories of other devs would get out-of-sync if you force-pushed it

### Conflicts during Rebase

Since rebase applies **each commit's patch** from your `feature` branch one-by-one over the tip of `main` branch, there could arise merge conflicts while applying patches/changes of each commit. When the rebase operation starts, Git would continue applying patches and **stop at the first problematic commit** that contains merge conflicts. Then you have these three options:

1. **Resolve** the merge conflict at each such conflicting commits. For the files whose conflicts you've resolved, stage them via `git add` so Git can mark it as resolved. After resolving all conflicts, continue rebase to the next commit of your branch:

   ```sh title="Continue rebase after resolving a commit's conflicts"
   # Applies resolved commit and moves to next conflicting commit (if none, it finishes)
   git rebase --continue
   ```

2. **Skip** that particular commit that was causing conflict. Git will pretend this commit never happened and won't apply its patches.

   ```sh title="Ignore a commit during rebase"
   # Exclude applying current commit's patches
   git rebase --skip
   ```

3. **Abort** the rebase operation entirely. Git will NOT apply ANY commit's patches and would go back to the initial state before rebase was started

   ```sh title="Abort Rebase operation entirely"
   git rebase --abort
   ```

Since commits are replayed, any modified commit receives a new commit hash.

Below is how the merge conflict looked like while applying the first commit `E` which had hash `cd3686b`:

```txt title="File Rebase conflict example"
A
B
<<<<<<< HEAD
C
D
=======
E
>>>>>>> cd3686b (E)
```

When rebasing `feature` branch onto `main`, Git has done `checkout` into the tip commit `D` of `main` branch having hash `e2bab05`, which is our new base. That's why the output of `git branch` shows we're in neither branch; `HEAD` is detached and points directly to tip commit `e2bab05` of `main`. Over this new temporarily checked-out base, Git attempts to apply patches of the first commit `E` of our `feature` branch, which has hash `cd3686b`. Below output shows the results after each conflicting commit `E` and `F` has been resolved, applied and rebase has finished successfully:

```sh title="Rebase operation completed after resolving each commit"
# Attempt to rebase current "feature" branch onto "main" (fails due to conflicts)
on ⎇ feature
$ git rebase main
Auto-merging notes.txt
CONFLICT (content): Merge conflict in notes.txt
error: could not apply cd3686b... E
Could not apply cd3686b... # E

# Notice we're currently in NEITHER branch
# HEAD is detached and points directly to tip commit "e2bab05" of "main"
on ⎇ HEAD (e2bab05) (REBASING 1/2) [=]
$ git branch
* (no branch, rebasing feature)
  feature
  main

on ⎇ HEAD (e2bab05) (REBASING 1/2) [=]
$ git status
interactive rebase in progress; onto e2bab05
Last command done (1 command done):
   pick cd3686b # E
No commands remaining.
You are currently rebasing branch 'feature' on 'e2bab05'.
  (fix conflicts and then run "git rebase --continue")
  (use "git rebase --skip" to skip this patch)
  (use "git rebase --abort" to check out the original branch)
Unmerged paths:
  (use "git restore --staged <file>..." to unstage)
  (use "git add <file>..." to mark resolution)
        both modified:      notes.txt
no changes added to commit (use "git add" and/or "git commit -a")

# Resolve conflicts in editor and stage them. Then continue rebase to next commit
# We have to do this for EACH commit of "feature" branch

on ⎇ HEAD (e2bab05) (REBASING 1/2) [=]
$ git add .

on ⎇ HEAD (e2bab05) (REBASING 1/2) [+]
$ git rebase --continue
[detached HEAD c72020b] E resolved
 1 file changed, 2 insertions(+), 2 deletions(-)
Auto-merging notes.txt
CONFLICT (content): Merge conflict in notes.txt
error: could not apply 5be80ae... F
Could not apply 5be80ae... # F

on c HEAD (c72020b) (REBASING 2/2) [=]
$ git add .

git-prac-rebase on ⎇ HEAD (c72020b) (REBASING 2/2) [+]
$ git rebase --continue
[detached HEAD 32ba737] F resolved
 1 file changed, 1 insertion(+), 1 deletion(-)
Successfully rebased and updated refs/heads/feature.
# We've successfully resolved all conflicts and rebased "feature" branch onto "main"
```

> During `rebase` operation, the convention of `--ours` and `--theirs` is **flipped** compared to `merge` operation because Git first checks out into the tip of the branch we're rebasing onto ours. In other words, `--theirs` would mean our current branch before starting `rebase` and `--ours` means the other branch we're rebasing our branch onto

If no changes of the `theirs` branch's commit were selected to be applied during rebase, Git might just **drop** that commit for you

### Interactive Rebase

You may also do [interactive rebase](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History) by passing the `-i` or `--interactive` flag. Interactive rebase lets you edit history by telling Git **how to replay each commit onto a new base**. Note that the commit point we pass to interactive rebase such as `COMMIT_HASH` or `HEAD~n` would be the updated base and we would be modifying history for the commits that come **after** it

```sh title="Interactive Rebase"
# Interactively rebase all commits onto 'main' branch
git rebase -i main
# Interactively rebase all commits after this COMMIT_HASH commit
git rebase -i COMMIT_HASH
# Interactively rebase last 3 commits from your current position
git rebase -i HEAD~3
```

Git opens a **todo list of actions** listing the existing commits to be applied onto the new base and shows you a list of operations that you could apply at each commit such as `pick(p)`, `drop(d)`, `reword(r)`, `edit(e)`, `squash(s)`, `fixup(f)`, `exec(x)`, `break(b)`. Initially all the commits are listed as `pick` before you modify. The temporary todo file (opened in your `$EDITOR`) to edit history is usually `.git/rebase-merge/git-rebase-todo`. Also, at one or more points, it might open editor asking the commit message for the resulting modified commits (usually file `.git/COMMIT_EDITMSG`)

```sh title="git-rebase-todo (rebasing onto commit 6fd2b08)"
pick a26bfa2 # some commit msg
pick b3aafbe # other commit msg
pick c72020b # some other commit msg

# Rebase 6fd2b08..c72020b onto 6fd2b08 (3 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup [-C | -c] <commit> = like "squash" but keep only the previous
#                    commit's log message, unless -C is used, in which case
#                    keep only this commit's message; -c is same as -C but
#                    opens the editor
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
#         create a merge commit using the original merge commit's
#         message (or the oneline, if no original merge commit was
#         specified); use -c <commit> to reword the commit message
# u, update-ref <ref> = track a placeholder for the <ref> to be updated
#                       to this position in the new commits. The <ref> is
#                       updated at the end of the rebase
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
```

## Squashing

Squashing refers to combining multiple commits into a single commit. You would have the changes made by all the squashed commits but you'd lose individual checkpoints of individual commits to easily go back to (can retrieve via `reflog` and some plumbing). Note that squashing rewrites history, so it is a destructive operation. You should never squash or do rewrite history on shared branches like `main`, but it's perfectly fine to do it on your own branch

During development, you could be making multiple small incremental commits of changes on your branch before reaching a satisfactory state that is ready to be merged. Some teams might prefer that you squash these incremental commits into a single final commit and then push that to your remote branch to be later merged into the shared branch like `main`. Keeping a single final commit also makes it easier to later revert it if needed. GitHub even provides the "Squash and Merge" option while merging a PR, which allows you to keep incremental commits for your branch but a squashed single commit in the shared branch.

![Git Squash](/code-journal/diagrams/git-squash.svg)

The most common way to squash commits is via **interactive rebase**. You'd pass the commit point by either hash or steps from `HEAD`, which acts as the temporary base, and we would edit history for the commits that come after it. Notice in figure above how we would squash the last 3 commits `F`, `G`, `H` into a single combined `F'`. We'd pass the start point as 3 commits behind where `HEAD` currently is and rewrite history after it

```sh title="Start Squash operation"
# Commit history BEFORE Squashing:
git-squash on ⎇ feature
$ git log --oneline --parents
# b840b47 38f1a53 (HEAD -> feature) H
# 38f1a53 775b0b0 G
# 775b0b0 fb15ae7 F
# fb15ae7 4bfb263 E
# 4bfb263 a3c65d0 D
# a3c65d0 a5fc5fb C
# a5fc5fb 4110ec2 (main) B
# 4110ec2 A

# Start interactive rebase from 3 commits behind where HEAD currently is
git-squash on ⎇ feature
$ git rebase -i HEAD~3
# hint: Waiting for your editor to close the file...
```

It would open the todo-list file in your editor for defining the operations to apply for modifying history. Initially, all the existing commits are listed as `pick`

```sh title="git-rebase-todo (BEFORE)"
pick 775b0b0 # F
pick 38f1a53 # G
pick b840b47 # H
```

We edit the file and change the last two commits to squash `s` instead of pick `p` so that both would be melded into the first commit's changes itself.

```sh title="git-rebase-todo (AFTER)"
p 775b0b0 # F
s 38f1a53 # G
s b840b47 # H
```

Finally, after the operations are applied, you would be prompted to enter the commit message for the modified combined commit. The default commit message would list the commit messages of the individual commits we merged

```sh title="COMMIT_EDITMSG (BEFORE)"
# This is a combination of 3 commits.
# This is the 1st commit message:
F
# This is the commit message #2:
G
# This is the commit message #3:
H
```

```sh title="COMMIT_EDITMSG (AFTER)"
# This is a combination of 3 commits.
F' squashed
```

After our interactive rebase finishes, we'd see the final squashed commit `29f9bb2` with our updated commit message `F' squashed`

```sh title="After Squash operation finishes"
git-squash on ⎇ feature
$ git rebase -i HEAD~3
# [detached HEAD 29f9bb2] F' squashed
#  Date: Fri Jul 10 10:38:17 2026 +0530
#  1 file changed, 3 insertions(+)
# Successfully rebased and updated refs/heads/feature.

# Commit history AFTER Squashing:
git-squash on ⎇ feature took 5m19s
$ git log --oneline --parents
# 29f9bb2 fb15ae7 (HEAD -> feature) F' squashed
# fb15ae7 4bfb263 E
# 4bfb263 a3c65d0 D
# a3c65d0 a5fc5fb C
# a5fc5fb 4110ec2 (main) B
# 4110ec2 A

git-squash on ⎇ feature
$ git reflog
# 29f9bb2 (HEAD -> feature) HEAD@{0}: rebase (finish): returning to refs/heads/feature
# 29f9bb2 (HEAD -> feature) HEAD@{1}: rebase (squash): F' squashed
# 722c86a HEAD@{2}: rebase (squash): # This is a combination of 2 commits.
# 775b0b0 HEAD@{3}: rebase (start): checkout HEAD~3
# b840b47 HEAD@{4}: commit: H
# 38f1a53 HEAD@{5}: commit: G
# 775b0b0 HEAD@{6}: commit: F
# fb15ae7 HEAD@{7}: commit: E
# 4bfb263 HEAD@{8}: commit: D
# a3c65d0 HEAD@{9}: commit: C
# a5fc5fb (main) HEAD@{10}: checkout: moving from main to feature
# a5fc5fb (main) HEAD@{11}: commit: B
# 4110ec2 HEAD@{12}: commit (initial): A
```

You could squash just the last commits or just a few intermediate ones while you are rewriting history inside interactive rebase. If you just wanted to squash the last few commits, you could also do via a **soft reset**; it would jump back in history, but keep your changes as staged

```sh title="Squash via Soft Reset"
# Soft reset to 3 commits behind where HEAD currently is
git reset --soft HEAD~3
# Stage current state (containing all changes)
git add .
# Make the single commit (of all your changes) and give squash commit's message
git commit -m "Squashed commit message"
```

## Deciding to Merge or Rebase

You might think that resolving conflicts commit-by-commit during a `rebase` is tedious. However, these conflicts would eventually have to be resolved during a `merge` anyway. By rebasing early and regularly onto the latest `main`, we resolve integration issues incrementally within our own feature branch and keep it up-to-date with the shared `main` branch. As a result, when you eventually merge your `feature` into `main`, the process is often a simple, clean, fast-forward merge.

Additionally, if you find resolving conflicts commit-by-commit too taxing, you can **squash** your branch's commits into one before rebasing. This creates a single patch to replay, requiring you to resolve merge conflicts only once. Squashing also simplifies reverting your changes if you decide not to include them in the main branch.

Given the benefits of rebase, a benefit of merge commits is that they preserve the actual historical structure of development without rewriting any existing commits i.e. it preserves when exactly the branches diverged, evolved independently, and were eventually integrated. A merge only adds a new commit that ties the two histories together without modifying previous history. Ultimately, the choice comes down to history:

- Rebase provides a clean, linear project history, making it easier to track when features were developed
- Merge preserves the actual historical context - it explicitly records exactly when branches diverged, evolved independently, and were integrated

## Rerere

The [rerere](https://git-scm.com/book/en/v2/Git-Tools-Rerere) functionality is a handy feature. The name stands for **reuse recorded resolution** and as the name implies, it allows you to ask Git to remember how you’ve resolved a hunk conflict so that the next time it sees the same conflict, Git can resolve it for you automatically. This is particularly useful for long-running feature branches where you won't have to resolve the same conflicts again and again during after each rebase

```sh title="Enable Rerere"
# Enable rerere in global config to apply to ALL your repos:
git config --global rerere.enabled true
```

Git identifies a conflict by creating a unique SHA-1 hash based on the text content of the conflict hunk and its surrounding context. It then maintains a `preimage` (the hunk before resolution) and a `postimage` (the hunk after resolution) in the `.git/rr-cache/<hash-id>/` directory. When a conflict occurs later, Git executes [`git rerere`](https://git-scm.com/docs/git-rerere) which computes the hash of the new conflict, checks if a matching cache folder exists, and automatically applies the recorded `postimage`. Note that rerere doesn't automatically commit the resolved state; it just stages the resolved content.

This functionality is particularly useful for maintaining a clean, linear commit history. For example, if you are working on a long-lived `feature` branch and want to ensure it will eventually merge cleanly without creating unnecessary intermediate merge commits, you can use rerere. By periodically attempting a merge, resolving the conflicts, and then backing out of the merge (resetting), you "teach" Git how to handle those conflicts. When the time comes for the final merge, rerere will have already "learned" the resolutions, allowing the process to complete automatically.

If you wish to remove previous remembered resolutions, you can just delete the `.git/rr-cache/` directory itself

```sh title="Rerere in action"
# First time conflict encountered, file PREIMAGE recorded
on ⎇ favs
$ git rebase main
Auto-merging customers/favs.md
CONFLICT (add/add): Merge conflict in customers/favs.md
error: could not apply 9b69999... K: Favs added
Recorded preimage for 'customers/favs.md'
Could not apply 9b69999... # K: Favs added

# Edit files to resolve conflict and stage them...
# After conflict resolved and rebased, file resolution (POSTIMAGE) recorded
on ⎇ HEAD (339c635) (REBASING 1/1) [+]
$ git rebase --continue
Recorded resolution for 'customers/favs.md'.
[detached HEAD 74fb320] K: Combined Favs added
 1 file changed, 1 insertion(+)
Successfully rebased and updated refs/heads/favs.

# Next time similar conflict encountered, previous resolution applied automatically
on ⎇ favs2
$ git rebase main
Auto-merging customers/favs.md
CONFLICT (add/add): Merge conflict in customers/favs.md
error: could not apply 9b69999... K: Favs added
Resolved 'customers/favs.md' using previous resolution.
Could not apply 9b69999... # K: Favs added
```

## Delete Branch

After you are done with merging the `feature` branch into `main`, if you are done with the `feature` branch's work and won't be needing to work in the `feature` branch again, you may delete the branch as follows (local copy, not talking about remotes). However, if a branch hasn't been merged anywhere and you attempt to delete it, Git will warn you; you would need to pass the `-D` flag instead of `-d` to force branch deletion

```sh title="Delete (local) branch"
# Syntax: git branch -d BRANCH_NAME
git branch -d feature
```

To delete a remote branch, you would have to do a `push` operation as follows:

```sh title="Delete remote branch"
# Assuming remote named 'origin', both local and remote branch named 'feature':
git push origin -d feature
# We can also push an empty branch to remote branch to delete it
git push origin :feature
```
