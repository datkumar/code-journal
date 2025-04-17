---
title: Git Branches
tags: [git]
---

A Git branch allows you to keep track of different changes separately

![Git branches](/code-journal/images/git-branches.png)

Suppose you want to create a small change or build feature into your project but you aren't sure about including it. You can create a new `some-feature` branch from a certain point in your history of commits. Make your changes in that branch. The rest of the major development of your project can continue side-by-side on the `main` branch. Once you have finalized the changes of your `some-feature` branch and you want to include them, you can **merge** them into the `main` branch; or else if you want to discard them, simply delete the `some-feature` branch and come back into usual `main` branch

To view branches, use the [`git branch`](https://git-scm.com/docs/git-branch) command:

```sh title="List branches"
# List all local branches (current branch marked by *)
git branch
# List all local and remote branches
git branch -a
```

## Create, switch and rename branches

A branch in Git is simply a lightweight movable **pointer** to a **commit**. Each branch pointer points to the **latest commit** in that branch, called the **tip** of that branch. Every time you make a commit, that branch pointer **moves forward automatically**. Git also maintains a special pointer `HEAD` which points to the branch you're currently on

Also, each commit contains information about it's previous parent commit. This means the links between commits go backwards into the history.

So creating new branches and switching between them is quite cheap as it just involves moving the pointer. This make branch operations quite fast as compared to other VCSs which might have to spend time copying contents into separate branch directories

### Create new branch

To create a new branch, specify the branch name after `git branch`:

```sh title="Create new branch"
git branch my-feature
```

### Switch between branches

To switch into a branch, you can use either of the `checkout` or `switch` commands:

- The [`git checkout`](https://git-scm.com/docs/git-checkout) command is the older multi-purpose command that can be used to switch into a branch, switch into a commit or even restore file(s) from a commit
- On the other hand, [`git switch`](https://git-scm.com/docs/git-switch) is the newer command specifically aimed at just creating and switching branches

```sh title="Switch into an existing branch"
git switch my-feature
git checkout my-feature
```

```sh title="Create new branch and switch into it"
git switch -c other-feature
git checkout -b other-feature
```

```sh title="Other uses of checkout"
# Switch into a commit
git checkout commitHash

# Restore file(s) from a commit
git checkout commitHash -- file1.txt file2.md
```

---

As illustrated in below image, consider you are on default `main` branch having three commits `A`, `B`, `C` created in that order. Now when you create a new branch `feature`, a new pointer gets created pointing to the latest commit in the branch you were in, i.e. to latest commit `C` in `main` branch. This is known as the **branch base** of the newly created `feature` branch

At this point, both `main` and `feature` branches are pointing to `C` with your current branch `main` as indicated by `HEAD`. To start working in the new `feature` branch, switch into that branch via `checkout` or `switch` command. This would move the `HEAD` pointer to now point to `feature` instead of `main` as your current branch.

![Create and switch into branch](/code-journal/diagrams/git-branch-1.svg)

While switched into the new `feature` branch, let's say you make a few changes and end up creating two new commits `D` and `E` as seen in below image. As you make these commits, the `feature` branch pointer (and `HEAD` pointer along with it) move forward to point to the latest made commit in that branch. However, note that the rest of the branch pointers like `main` stay right where they are. So after making `C` and `D` commits in `feature` branch, you'd have the `feature` branch as **two commits ahead** of `main`

![Make commits into new branch](/code-journal/diagrams/git-branch-2.svg)

Switching back from `feature` into `main` branch would involve moving the `HEAD` pointer back two places to commit `C` where `main` was pointing. Note that as we are moving the pointers, we are hopping over series of commits i.e. over snapshots of the project at different points of time. This switching of branches **applies/discards the changes of those commits** over the files in your working directory

Later, when that feature is finalized and you wish to merge it into `main` branch, Git would look for the **merge base** by searching the **closest common ancestor** of those two branches which would be `C` in given case

---

### Rename a branch

The default branch in Git is named `master` and it gets created when you do `git init`. You can set the `defaultBranch` option under `init` section in your Git config file to define default branch name for new repos being created. You can also rename an existing branch by passing the `-m` (or `--move`) flag to `git branch` as:

```sh title="Rename branch"
# Move/rename a branch, together with its config and reflog
git branch -m oldName newName
```

GitHub recently changed it's default branch name from `master` to `main`, which is why they have `git branch -M main` among their steps in creating new repo (`-M` flag is aliased as `--move --force` for force rename)

---

`git-log` only shows history for current branch. Use `git log branchName` to see history of specific branch or use `--all` (or `-a`) to show for all branches.

**Divergent history**: ...

Merging: merge base, closest common ancestor

<!-- git checkout commitHash -->
<!-- git show commitHash -->
<!-- git diff commitHash1 commitHash2 -->

<!-- git log -p -->
<!-- Running git-diff, git-log, git-show, git-diff-index, git-diff-tree, or git-diff-files with the -p option produces patch text -->
