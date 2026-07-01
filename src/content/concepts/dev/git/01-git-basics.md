---
title: Git basics
tags: [git]
---

**Contents**:

- [About Git](#about-git)
- [Types of commands](#types-of-commands)
- [Git Config](#git-config)
- [Git Repository](#git-repository)
- [Git Status](#git-status)
- [Staging Area](#staging-area)
- [Git Commit](#git-commit)
  - [Amend Commit](#amend-commit)
- [Git Log](#git-log)
- [Gitignore](#gitignore)

## About Git

[Git](https://git-scm.com/) is a free and open-source **distributed version control system** (D-VCS) for source code management (SCM) designed to handle everything from small to very large projects with speed and efficiency. It was created by [Linus Torvalds](https://www.google.com/search?a&q=linus+torvalds), the creator of the Linux kernel, in 2005 after the Linux kernel project lost access to the free BitKeeper license.

Git comes pre-installed on most Linux distributions but if absent, you can refer the [Installation page](https://git-scm.com/install/linux). The [Pro Git](https://git-scm.com/book/en/v2) book is an excellent reference for learning Git and I also highly recommend [Primagen's Git course](https://www.boot.dev/courses/learn-git) on boot.dev

## Types of commands

Git is a complex software with a variety of commands available to interact with the VCS. These commands are divided into two groups:

- **Porcelain commands**: These are high-level commands like `add`, `status`, `commit`, `push`, `pull`, `log`
- **Plumbing commands**: These are low-level commands like `apply`, `commit-tree`, `hash-object`

Most of the times, devs would be using just the porcelain commands in day-to-day work. Also refer the handy [Reference](https://git-scm.com/docs) and [Cheatsheet](https://git-scm.com/cheat-sheet) for most common operations

## Git Config

To keep track of your changes made in the project, Git needs to know who YOU are. Your details such as name, email as well as some more preferences are stored in a Git config file. The global config file is `~/.gitconfig` while the local config is within your project repository. Refer [my Git setup](https://datkumar.github.io/Configs/Git-GitHub/) as well as the [`git config`](https://git-scm.com/docs/git-config) reference

In total there are 4 levels where the Git config can be stored. For the same variable name, the higher-precedence one replaces the lower-precedence one. The locations are as mentioned below, in increasing order of specificity (and thereby precedence):

- **System-wide** config: Stored as `/etc/gitconfig`, it's for **all users** on your system
- **Global** config: Stored as `~/.gitconfig`, it is the global config for **all repos of user** of which home folder is
- **Local** config: Stored as `.git/config` in your project repository, it' defined for that **specific repo**
- **Worktree** config: Stored at `.git/config.worktree` it's defined for that **part** of the project repo

In most cases, you'll just be using the Global config for all your projects and sometimes the Local config as needed. Refer [`Customizing Git`](https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration) for the most useful options as well as the [`git config`](https://git-scm.com/docs/git-config) command

## Git Repository

A Git repository is just a directory of your project files, along with a hidden `.git/` folder in it's root. This folder internally stores all the tracking and versioning information of changes made by various contributors as the project evolves. Your current **state** is also tracked from this folder

When you're in a freshly-created project, to **initialize a git repository** for the project, open a terminal in your project root folder and run:

```sh title="Initialize new repo"
git init
```

<details>
<summary>
The contents of the <code>.git/</code> folder can be seen via &ensp;<code>tree -F .git</code>
</summary>

```sh title="Contents of initialized .git/ folder"
tree -F .git
.git/
├── branches/
├── COMMIT_EDITMSG*
├── config*
├── description*
├── FETCH_HEAD
├── HEAD
├── hooks/
│   ├── applypatch-msg.sample*
│   ├── commit-msg.sample*
│   ...
├── index
├── info/
│   └── exclude*
├── logs/
│   ├── HEAD*
│   └── refs/
│       ├── heads/
│       │   └── main*
│       └── remotes/
│           └── origin/
│               ├── add_classics
│               └── main
├── MERGE_RR
├── objects/
│   ...
│   ├── info/
│   └── pack/
├── ORIG_HEAD
├── refs/
│   ├── heads/
│   │   └── main
│   ├── remotes/
│   │   └── origin/
│   │       ├── add_classics
│   │       └── main
│   └── tags/
└── rr-cache/
```

</details>

## Git Status

A file can be in one of several states in a Git repository. Here are a few important ones:

- **Untracked**: Git has no idea about the file as is not tracking it (never been added to the index). No way to recover an untracked file if you delete it
- **Staged**: Changes in the file are noted by Git and marked to be included in next commit
- **Committed**: File changes have been saved into the repository's history

View the status of your current changes using the [`git status`](https://git-scm.com/docs/git-status) command:

```sh title="View status of changes made"
git status
```

## Staging Area

Git has something called the **staging area** or **index**. This is an intermediate **mutable** area where upcoming commits can be formatted and reviewed before making a commit.

It's possible to quickly stage some of your files and commit them without committing all of the other modified files in your working directory or having to list them. Without staging, every file in the repository would be included in every commit, but that's often not what you want.

<img alt="Git Staging area" height="250px" width="auto" src="https://git-scm.com/images/about/index1@2x.png">

To convert `untracked` changes into `staged` changes, we add respective file(s) to staging area via the [`git add`](https://git-scm.com/docs/git-add) command as shown below. Verify it with `git status`. This command can be run multiple times before making your commit

```sh title="Stage Changes"
# Syntax:
git add FILE_PATTERN
# Examples:
git add README.md       # Single README.md file in current directory
git add docs/*.txt      # All .txt files inside "docs" directory
git add scripts/**/*.sh # All .sh files within "scripts" directory and subdirectories
git add .               # All files inside current directory and subdirectories
```

If you accidentally stage a file that you don't want to be included in the upcoming commit, you can **unstage** that staged file as below. Unstaging changes the file status from `staged` back to `untracked`. You need to use `-r` flag to recursively unstage files contained within a directory

```sh title="Unstaging Changes"
git rm --cached myfile.txt    # Single file
git rm --cached -r src/tests  # All files within src/tests/ directory (and subdirectories)
```

> Using the `--cached` flag means the file(s) are only removed from the index but not deleted and they remain within working tree. Without the flag, the file(s) would be deleted and staged as deletion

Also refer: [`git rm`](https://git-scm.com/docs/git-rm), [`git restore`](https://git-scm.com/docs/git-restore), [`git  reset`](https://git-scm.com/docs/git-reset), [`git revert`](https://git-scm.com/docs/git-revert.html)

---

## Git Commit

A commit is a **_snapshot_** of your branch in your repository at a given point in time (along with existing history, not just current `diff` changes). It's a way to save the **state** of the repository, and it's how Git keeps track of changes to the project. Refer [What is Git?](https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F)

Each commit requires a **message** that describes the changes made in that commit:

To commit all your staged files with a message use the [`git commit`](https://git-scm.com/docs/git-commit) command as:

```sh title="Commit staged changes"
git commit -m "your message"
```

You can also stage all files and commit them in a single step by passing the `-a` flag:

```sh title="Stage + Commit"
git commit -a "your message"
```

You can also create a [commit with multiple authors](https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/creating-a-commit-with-multiple-authors).

Git assigns each commit a **unique hash**, that identifies:

- The specific changes made in that commit (file diffs)
- When the changes were made (timestamp)
- Who made those changes (author, commiter)
- Commit message

### Amend Commit

If you wish to modify the latest commit in terms of the file changes or even just the commit message, you pass the `--amend` flag to `git commit`. Note that amending commits creates a new commit replacing the existing latest commit since the above inputs for the commit hash have changed. This changes history and should not be used with public histories

```sh title="Amend Last Commit"
# Update last commit with new commit message
git commit --amend -m "updated better message"

# Update last commit but keep same commit message
git commit --amend --noedit
```

---

## Git Log

A Git repo is a series of commits, where each commit represents the full state of the repository at that given point of time. As the project evolves, this list of commits would also grow big

To see the history of commits for your branch in your Git repository, use the [`git log`](https://git-scm.com/docs/git-log) command. By default, it's output is scrollable like the `less` command. You can modify the `core.pager` option in config for desired pager output

```sh title="View commit history"
# Entire scrollable history of commits
git log
# View just the last 5 commits (without scroll, prints to stdout)
git --no-pager log -n 5
# View just the title and short-hash of each commit
git log --oneline
# View commits history as graph of merges
git log --graph --oneline
# View patch text for just the latest commit ("git show" is better)
git log -p -n 1
```

Each entry in the output mentions the commit's hash, author, creation time and message

For convenience, you can often refer to a commit using a **shortened prefix** of its hash, as long as that prefix uniquely identifies the commit in the repository.

If you wish to see better about what exact changes were made in a commit, use [`git show`](https://git-scm.com/docs/git-show)

By default, `git log` only shows history for current branch. Use `git log BRANCH_NAME` to see history of specific branch or use `--all` (or `-a`) to show for all branches.

---

## Gitignore

Git sees every file in your working copy as one of three things:

- **Tracked**: Files previously staged or committed to the repository.
- **Untracked**: Files present in your working directory that have not been staged or committed
- **Ignored**: Files that Git has been explicitly instructed to overlook

To ignore files, create a [`.gitignore`](https://git-scm.com/docs/gitignore) file at the root of your repository. This file contains **patterns** that Git matches against file names to determine which files to exclude from tracking. While the `.gitignore` file itself is typically committed to the repository so the ignore rules are shared with your team, the files matching its patterns remain invisible to Git's tracking system.

```sh title="Sample .gitignore file"
# Ignores this specific file at the root level:
config.local.json
# Ignores the 'temp/' directory and everything inside it:
temp/
# Ignores 'output' folders nested at any depth like 'dist/output/', 'src/build/output/':
**/output/
# Ignores all files ending in .log anywhere in the project:
*.log
# Negation by "!" indicates to NOT exclude the "important-logs/debug.log" file:
!important-logs/debug.log
# This ignores 'notes.txt' at the root, but NOT something like 'docs/notes.txt':
/notes.txt
# Ignores .env file, but only inside the 'config/' directory:
config/.env
# Common ignores are libraries, build artifacts, system files, editor settings:
node_modules/
dist/
.vscode
.DS_Store
```

You can even have multiple `.gitignore` files across your nested folders to make ignore patterns more organized instead of cluttering up the root `.gitignore`. Each `.gitignore` file's exclude behavior applies to that directory and subdirectories within it. You also have the option of a global `.gitignore` file to apply ignores across all your projects

If you accidentally staged a file and then added it to your `.gitignore`, it won't be ignored by Git. You must remove it from the index manually:

```sh title="Unstage and Ignore a staged file"
# You can unstage a single or multiple files, folders or pattern:
git rm --cached FILE_PATTERN
```
