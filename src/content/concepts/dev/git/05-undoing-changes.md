---
title: Undoing Changes
tags: [git]
---

**Contents**:

- [Git Reset](#git-reset)
  - [Git Reset modes](#modes-for-git-reset)
- [Reflog](#reflog)
  - [Recover Commit from Reflog](#recover-commit-from-reflog)
- [Stash](#stash)

As humans, we are bound to make mistakes and thereby need a way to get back to the previous working state. Git provides a variety of commands for this purpose based on your use-case

## Git Reset

The [`git reset`](https://git-scm.com/docs/git-reset) command is used to undo changes by moving the `HEAD` pointer to a specific previous commit state. Before knowing what `reset` exactly does, let's revise a few terms:

- **Index** or **Staging Area**: it contains changes for upcoming commit that you have done `git add` for but not made any commit yet
- `HEAD`: pointer that points to the tip i.e. the latest commit in your current branch
- **Repository**: The `objects` database consisting of snapshots (commits), refs and metadata that Git has saved. `HEAD` points to latest snapshot
- **Worktree** or **working tree**: the actual contents of files on disk right now, that are shown to you when you open it. Here, tree refers to the project folder structure
- **Untracked files**: These are files that exist on your disk, but Git is ignoring them. You haven't added them to the index via `git add` yet. Git doesn't know these files exist, doesn't track their history, and won't include them in your next commit.
- **Unstaged changes**: These are files that are already tracked (Git knows about them), but you have modified their contents since the last commit. You haven't run `git add` on them yet.

![Git Three Trees](/code-journal/diagrams/git-three-trees.svg)

Also refer: [Git: Difference between HEAD, working tree and index?](https://stackoverflow.com/questions/3689838/git-difference-between-head-working-tree-and-index), [What does the git index contain EXACTLY?](https://stackoverflow.com/questions/4084921/what-does-the-git-index-contain-exactly)

All `reset` operations move the `HEAD` pointer. You can specify which commit point you want to reset back to as the `SAVE_POINT` value below. If no `SAVE_POINT` is specified, Git defaults to `HEAD`. Similarly, the default `MODE` value is `--mixed`. Refer [Reset Demystified](https://git-scm.com/book/ms/v2/Git-Tools-Reset-Demystified) for more detailed explanation

**Syntax**: `git reset MODE SAVE_POINT`

```sh title="Git Reset"
# Reset state to what existing commit was
git reset MODE
# Reset state to that commit
git reset MODE COMMIT_HASH
# Reset state to two commits before current commit in history
git reset MODE HEAD~2
```

The `MODE` for reset operation can be any of these: Soft (`--soft`), Hard (`--hard`) and Mixed (`--mixed`)

Running just `git reset` would be equivalent to `git reset --mixed HEAD`, which simply unstages any currently staged changes without changing any file contents

![Soft Reset example](/code-journal/diagrams/git-reset.svg)

### Modes for Git Reset

- **Soft Reset**: Git **uncommits** the commit changes after `SAVE_POINT` but their changes are preserved in worktree as well as staged in the index
- **Mixed Reset**: Git **uncommits** and **unstages** commit changes after `SAVE_POINT`, but they are preserved in working tree.
- **Hard Reset**: Git **uncommits** and **unstages** as well as **deletes** the commit changes after `SAVE_POINT`, making the index empty

```sh title="Git Reset Variants"
git reset --soft SAVE_POINT      # Soft Reset
git reset --hard SAVE_POINT      # Hard Reset
git reset --mixed SAVE_POINT     # Mixed Reset
# Examples:
git reset 4c20c79         # mixed-reset to that commit
git reset --soft HEAD~1   # soft-reset to one commit before latest (undo last commit but keep changes as staged)
```

There are also other mode options like `--merge`, `--keep`, `--recurse-submodules` but they are rarely used

A detailed breakdown of how the reset variants affect different file types:

- **Untracked files**: Git never touches untracked files. Because they aren't part of the repository index, `git reset` (regardless of mode) ignores them. They stay in your worktree exactly as they are.
- **Unstaged changes**:
  - `soft` and `mixed` reset: they do not touch your worktree. If you have modified a file (unstaged), those edits remain in your file on your disk.
  - `hard` reset: it **destroys** unstaged changes. Since it forces your worktree to match the target commit; any edits you made to tracked files are wiped out.
- **Staged changes**:
  - `soft` reset: staged changes remain in the index. You can immediately commit them again.
  - `mixed` reset: the index is reset to the target commit. Your changes are removed from index, but they stay in your worktree as **unstaged** changes.
  - `hard` reset: the index is reset to the target commit. Your staged changes are **permanently discarded**.

> Be very careful with `reset --hard`. The changes are not preserved in index nor in worktree and are lost almost permanently. They're hard to recover (would need some `reflog` hacks)

What happens to **Orphaned commits**?

The commits that are "skipped over" become orphaned/dangling commits and are not immediately deleted. They are still present in your local `.git/` repository database, but they are no longer reachable via any branch pointer or tag. Before the garbage collector deletes these commits, they remain protected for a default grace period (usually 30 days) in your `reflog`.

## Reflog

Just how `git log` show us the history of commits, `git reflog` shows the history of refs. Reflog i,e. reference log lists the changes made to the references (be it branch pointer or `HEAD` pointer) in the repository. The output mentions history in terms of **steps** i.e something like `HEAD@{2}` means the point where `HEAD` was `2` moves ago

```sh title="Git Reflog"
git reflog
a26bfa2 (HEAD -> main, origin/main) HEAD@{0}: commit: Watchlist and Favourites screens with card grid and action buttons
b3aafbe HEAD@{1}: commit: Watchlist, Favourite buttons and local DB operations setup with Room, Hilt
0eb01a2 HEAD@{2}: commit: Details and Popular Screens, Theming and Styling
99ddf6c HEAD@{3}: commit: Net-check, Hilt setup, Theming, Home and Details screen
8b325f3 HEAD@{4}: Branch: renamed refs/heads/master to refs/heads/main
8b325f3 HEAD@{6}: commit (amend): Initial Create Project commit
b23f5c4 (origin/master) HEAD@{7}: commit (initial): Initial Create Project commit
```

### Recover Commit from Reflog

Suppose you lost access to certain commits, either by deleting some branch or via `git reset --hard` at some point but now wish to view its changes. There is currently no ref like `HEAD` or any branch pointer pointing to that commit for you to directly access it. However, you can view the commit in the `git reflog` output.

As per below example, assume you created a commit `0d16f95` with message `B: slander` on the branch `slander` that was created off `main`. Then you deleted the `slander` branch (assume accidentally). You won't see your deleted branch in `git branch` output but you can see the commit `f6636fc` at `HEAD@{1}` (where `HEAD` was `1` move ago) in the reflog. So you could `merge` that commit into your desired branch (assuming current `main` branch here) via `git merge HEAD@{1}`. The `git merge` operation accepts a _commitish_ i.e. anything that resolves to a commit (could be either of commit hash, branch name, tag, reflog entry etc)

```sh title="Recover Commit from Reflog"
# Created new branch "slander' from "main" and switched into it.
# Made commit "B: slander" in it having hash "f6636fc". Switched back into "main" branch
$ git reflog
0d16f95 (HEAD -> main, origin/main, origin/HEAD) HEAD@{0}: checkout: moving from slander to main
f6636fc (slander) HEAD@{1}: commit: B: slander
0d16f95 (HEAD -> main, origin/main, origin/HEAD) HEAD@{2}: checkout: moving from main to slander
0d16f95 (HEAD -> main, origin/main, origin/HEAD) HEAD@{3}: clone: from github.com:datkumar/megacorp.git

# Force-delete the "slander" branch (imagine accidentally)
$ git branch -D slander
$ git branch -a
* main
  remotes/origin/HEAD -> origin/main
  remotes/origin/main

# No pointer to that branch but that commit is still accessible via reflog: see HEAD@{1}
$ git reflog
0d16f95 (HEAD -> main, origin/main, origin/HEAD) HEAD@{0}: checkout: moving from slander to main
f6636fc HEAD@{1}: commit: B: slander
0d16f95 (HEAD -> main, origin/main, origin/HEAD) HEAD@{2}: checkout: moving from main to slander
0d16f95 (HEAD -> main, origin/main, origin/HEAD) HEAD@{3}: clone: from github.com:datkumar/megacorp.git

# Merge that commit "f6636fc" into local "main" branch
$ git merge HEAD@{1}
Updating 0d16f95..f6636fc
Fast-forward
 slander.md | 4 ++++
 1 file changed, 4 insertions(+)
 create mode 100644 slander.md
```

## Stash

Suppose you are in the middle of making changes and have to quickly jump into another task or pull latest changes from remote. Your changes are not final enough to be made into a commit but you'd like to save the current state of your work somewhere. Git provides a way to store your current state away in a dirty working directory by using the [`git stash`](https://git-scm.com/docs/git-stash) command.

Each time you do `git stash` (or `git stash push`), the **current state of your working directory and index** (staging area) is recorded and it **resets** your working directory to match the `HEAD` commit (last existing commit in your branch) so that you get a clean working directory. You can stash multiple times and each such recorded state gets stored in a **Stack** data structure meaning it is last-in first-out (**LIFO**). Internally, each stash entry is stored as one (or more) Git commit objects, meaning stashes are part of your repository and are not stored outside Git.

The default stash entry name is `WIP on BRANCH_NAME ...` unless specified. The latest stash entry you created is referenced by `refs/stash`

- When you do `pop` operation on stash, the latest recorded state gets applied over your working directory and that saved record entry is removed from the stash list
- To apply the changes of a stash entry without removing that entry from stash list, use `apply` instead of `pop`
- To discard a stash list entry without ever applying changes stored in that entry, use `drop` instead of `pop`
- By default, the operations (`pop`, `apply`, `drop`) are applied on the **latest** i.e. topmost entry in the stash list, but you may also apply it on another entry by specifying its index such as `stash@{2}`. Note that the index `0` is the latest entry and higher indices mean older stash entries

By default, stashing saves both staged changes and tracked unstaged changes of working directory. It ignores untracked (newly created but unstaged) and ignored files. You can pass the `-u` or `--include-untracked` flag while stashing to include them. The `-a` or `--all` flag includes the ignored files in stash too. You can keep your staged changes present even after stashing finishes via the `-k` or `--keep-index` flag

Use stashing as a temporary way to "pause' your work to come back to it later. Prefer creating branches and making commits for long-lived work.

```sh title="Git Stash operations"
# To save current state (working directory and index) into stash:
$ git stash
# Saved working directory and index state WIP on main: 7b3a9c2 Existing commit message

# Do some changes, maybe stage some. To save current state with a message:
$ git stash -m "refactored api endpoints"

# List existing records in stash:
$ git stash list
# stash@{0}: On main: refactored api endpoints
# stash@{1}: WIP on main: 7b3a9c2 Existing commit message

# Apply the latest record's state and remove it from stash
$ git stash pop
# On branch main
# Changes not staged for commit:
#         modified:   somefile.txt
# no changes added to commit (use "git add" and/or "git commit -a")
# Dropped refs/stash@{0} (abc9c0e1f39c74d0a719296a41d9a0dc2209652b)

# Apply the latest record's state but do NOT remove it from stash:
$ git stash apply
On branch main
Changes not staged for commit:
        modified:   somefile.txt
no changes added to commit (use "git add" and/or "git commit -a")

# Do NOT apply the latest record's state but just remove it from stash:
$ git stash drop
# Dropped stash@{0} (aa74cdb4c5eebacde9e1cd6d9a4af513b219e9ea)

# You can also access a record in stash by its index
# This will apply the third most recent stash (latest one is at index 0)
git stash apply stash@{2}
```

You may also get conflicts while applying the changes/patches of successive stash entries

```sh title="Applying multiple stash entries"
$ git stash list
# stash@{0}: On main: bad marketing
# stash@{1}: On main: good marketing

$ git stash pop stash@{1}
#        modified:   README.md
# Dropped stash@{1} (aa74cdb4c5eebacde9e1cd6d9a4af513b219e9ea)

$ git stash pop
# Auto-merging README.md
# CONFLICT (content): Merge conflict in README.md
# Recorded preimage for 'README.md'
# On branch main
# Unmerged paths:
#   (use "git restore --staged <file>..." to unstage)
#   (use "git add <file>..." to mark resolution)
#         both modified:   README.md
#
# no changes added to commit (use "git add" and/or "git commit -a")
# The stash entry is kept in case you need it again.
```

It says there is conflict in file `README.md`. When you open it in editor, you'll see the markers that you see during merge conflicts. The `Updated upstream` section represents the state of your working directory before applying the stash, while `Stashed changes` contains the incoming changes from the stash. Git will not drop a stash if applying it results in a merge conflict. Resolve the conflict and stage or even commit your work as needed

```txt title="Conflicting Stash patches"
<<<<<<< Updated upstream
# megacorp | good example

MegaCorp™ is _the_ enterprise Customer Relationship Management (CRM) software. Not only is it an incredible product, but it also ships a programming language for "MegaCorp developers" that want to build custom features within the MegaCorp™ ecosystem. That language is called "Apux".
=======
# megacorp | bad example

Unite marketing, sales, and service in a single app. Try MegaCorp Starter Suite today. There's nothing to install. No credit card required. The only thing standing between you and more customers are your terrible salespeople. Get started today.
>>>>>>> Stashed changes
```

If you wish to stash some selective contents only of your working directory, you can specify that filter to the `push` command. There is also an interactive mode via flag `-p` or `--patch` that goes over each hunk of changes asking you what you wish to do with it

```sh title="Stash Push Filter"
# Stash the staged changes ONLY:
git stash push --staged -m "tested API changes"
# Stash changes present inside certain files or folder:
git stash push FILE_PATTERN
git stash push config/settings.json -m "temporary tweak"
git stash push src/components/ -m "stash component changes"
# Interactive Stashing:
git stash push -p
```

A neat trick is converting a stash into a new branch via `git stash branch`. It checks out the exact base commit where that stash was originally created, creates the new branch there, applies the stashed changes, and then, if it applies cleanly - automatically drops the entry from your stash list. This is helpful when you need to resurrect old work without polluting or fighting your current working directory.

```sh title="Convert stash entry to new branch"
# Syntax: git stash branch BRANCH_NAME STASH_ENTRY
on ⎇ main
$ git stash branch fix-api stash@{0}
# Switched to a new branch 'fix-api'
# On branch fix-api
# Changes not staged for commit:
#         modified:   src/api.js
#
# Dropped refs/stash@{0} (b7c2d91ae39b4f...)
```
