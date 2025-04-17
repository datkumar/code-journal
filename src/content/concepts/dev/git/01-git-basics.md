---
title: Git basics
tags: [git]
---

**Contents**:

- [About Git](#about-git)
- [Types of commands](#types-of-commands)
- [Git Config](#git-config)
- [Repository](#repository)
- [File Status](#file-status)
- [Staging](#staging)
- [Commit](#commit)
- [Branches](#branches)

## About Git

[Git](https://git-scm.com/) is a free and open-source **distributed version control system** (D-VCS) designed to handle everything from small to very large projects with speed and efficiency. It was developed by [Linus Torvalds](https://www.google.com/search?a&q=linus+torvalds), the creator of Linux in 2005 to avoid using BitKeeper. The [Pro Git](https://git-scm.com/book/en/v2) book is a great reference book for learning Git

## Types of commands

Git is a complex software with a variety of commands available to interact with the VCS. These commands are divided into two groups:

- **Porcelain commands**: These are high-level commands like `add`, `status`, `commit`, `push`, `pull`, `log`
- **Plumbing commands**: These are low-level commands like `apply`, `commit-tree`, `hash-object`

Most of the times, devs would be using just the porcelain commands in your day-to-day work

---

## Git Config

To keep track of your changes made in the project, Git needs to know who YOU are. Your details such as name, email as well as some more preferences are stored in a Git config file. The global config file is `~/.gitconfig` while the local config is within your project repository. Refer [my Git setup](https://datkumar.github.io/Configs/Git-GitHub/) as well as the [`git-config`](https://git-scm.com/docs/git-config) reference

---

## Repository

A Git repository is just a directory of your project files, along with a hidden `.git/` folder in it's root. This folder internally stores all the tracking and versioning information of changes made by various contributors as the project evolves. Your current **state** is also tracked from this folder

When you're in a fresh created project, to **initialize a new git repository** for the project, open a terminal in your project root folder and run:

```sh title="Initialize new repo"
git init
```

<details>
<summary>
The contents of the <code>.git/</code> folder can be seen via &ensp;<code>tree -F .git</code>
</summary>

```sh title="Contents of initialized .git/ folder"
.git/
├── branches/
├── config
├── description
├── HEAD
├── hooks/
│  ├── applypatch-msg.sample*
│  ├── commit-msg.sample*
│  ├── fsmonitor-watchman.sample*
│  ├── post-update.sample*
│  ├── pre-applypatch.sample*
│  ├── pre-commit.sample*
│  ├── pre-merge-commit.sample*
│  ├── pre-push.sample*
│  ├── pre-rebase.sample*
│  ├── pre-receive.sample*
│  ├── prepare-commit-msg.sample*
│  ├── push-to-checkout.sample*
│  ├── sendemail-validate.sample*
│  └── update.sample*
├── info/
│  └── exclude
├── objects/
│  ├── info/
│  └── pack/
└── refs/
   ├── heads/
   └── tags/
```

</details>

---

## File Status

A file can be in one of several states in a Git repository. Here are a few important ones:

- **Untracked**: Git has no idea about the file as it's not tracking it
- **Staged**: current changes to file are noted by Git and marked for inclusion in next commit
- **Committed**: File changes have been saved into the repository's history

View the status of your current file changes using the [`git status`](https://git-scm.com/docs/git-status) command:

```sh title="View status of changed files"
git status
```

## Staging

Git has something called the **staging area** or **index**. This is an intermediate mutable area where commits can be formatted and reviewed before completing the commit.

It's possible to quickly stage some of your files and commit them without committing all of the other modified files in your working directory or having to list them. Without staging, every file in the repository would be included in every commit, but that's often not what you want.

<img alt="Git staging area" height="250px" src="https://git-scm.com/images/about/index1@2x.png">

To convert `untracked` file changes into `staged` file changes, we add file(s) to staging area via the [`git add`](https://git-scm.com/docs/git-add) command as shown below. Verify it with `git status`. This command can be run multiple times before making your commit

```sh title="Stage file(s)"
git add <filePath | pattern>
# Examples:
git add docs/*.txt      # All .txt files inside "docs" directory
git add scripts/**/*.sh # All .sh files within "scripts" directory and subdirectories
git add .               # All files inside current directory and subdirectories
```

If you accidentally stages a file that you don't want to be included in the upcoming commit, you can **unstage** the staged file as below. Unstaging changes the file status from `staged` back to `untracked`

```sh title="Unstage a file"
git rm --cached myfile.txt
```

---

## Commit

A commit is a **snapshot** of your branch in your repository at a given point in time. It's a way to save the **state** of the repository, and it's how Git keeps track of changes to the project. Refer [What is Git?](https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F)

Each commit requires a **message** that describes the changes made in that commit:

To commit all your staged files with a message use the [`git commit`](https://git-scm.com/docs/git-commit) command as:

```sh title="Commit staged changes"
git commit -m "your descriptive message"
```

You can also stage all files and commit them in a single step by passing the `-a` flag:

```sh title="Stage & commit"
git commit -a "your message"
```

If you wish to **change the commit message** in your recently-made commit, you can do it as:

```sh title="Change commit message"
git commit --amend -m "updated descriptive message"
```

You can also create a [commit with multiple authors](https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/creating-a-commit-with-multiple-authors)

Git assigns each commit a **unique hash**, that identifies:

- The specific changes made in that commit
- When the changes were made
- Who made those changes

---

## Log

A Git repo is a series of commits, where each commit represents the full state of the repository at that given point of time. As the project evolves, this list of commits would also grow big

To see the history of commits for your branch in your Git repository, use the [`git log`](https://git-scm.com/docs/git-log) command. By default, it's output is scrollable (like the `less` command)

```sh title="View commit history"
# Entire scrollable history of commits
git log
# Show just the last 5 commits (without scroll)
git --no-pager log -n 5
```

Each entry in the output mentions the hash, author, creation time and message of that commit

For convenience, you can refer to any commit via just the **first 7 characters** of it's hash
