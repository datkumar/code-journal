---
title: Git internals
tags: [git]
---

## Git Commit hashes

Git commit hashes are generated automatically by Git using the [`SHA-1`](https://en.wikipedia.org/wiki/SHA-1) hash function. These hashes are almost always unique, so you don't need to worry too much about collisions

A number of things are passed into the commit hash function such as:

- Source tree of the commit (which unravels to all the subtrees and blobs)
- Parent commit hash
- Author info
- Committer info
- Commit message

## Git filesystem

Git is a **content-addressable filesystem**. It means you can insert any kind of content into a Git repository, for which Git will return a unique key you can use later to retrieve that content. Git internally uses a [Merkle Tree](https://en.wikipedia.org/wiki/Merkle_tree) (actually a DAG) to maintain the **integrity** of changes made in the repository

Git is made up of [objects](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects) such as commits, branches, tags etc. that are stored in the `.git/objects` directory. To see this, note the hash of your recent commit. Check contents of `.git/objects/` and you'll see some 2-letter folders; find one whose starting characters are that of your commit hashes. Inside them will be files named as rest of your hash characters. These are your commit files. The name splitting is done so as to prevent exceeding the [inode limit](https://www.site24x7.com/learn/linux/inode.html). Check the contents of your commit object file:

```sh title="View a commit object file"
# My commit hash was: 3af19e91c88109c2a47c82c7109fc7eb9055fe77
cat .git/objects/3a/f19e91c88109c2a47c82c7109fc7eb9055fe77
# View a hex dump of that commit object file
xxd .git/objects/3a/f19e91c88109c2a47c82c7109fc7eb9055fe77

# Pretty-print the commit object:
git cat-file -p 3af19e91c88109c2a47c82c7109fc7eb9055fe77
```

The contents would be a bunch of weird raw bytes. This is because Git **compresses** your commits for efficiently sending over the network. There's also the [`git cat-file`](https://git-scm.com/docs/git-cat-file) plumbing command to view contents of repository objects

We might think Git just stores the changes you made during that commit in the commit information i.e. just the diffs. However, that's not the case:

> On every commit, Git stores a **snapshot** of **ALL** your project files at that point of time in that commit

While taking the entire snapshot, Git does a bunch of performance optimizations so that the size occupied by `.git` folder doesn't get too large. Some of those are:

- Compressing and packing files. Refer [Packfiles](https://git-scm.com/book/en/v2/Git-Internals-Packfiles)
- De-duplicating files that remain same between commits i.e. if a file didn't change, Git will only store it once

```txt title="My git log"
commit 23f52f6f50d2d450ea312785892281aee3cd79d8 (HEAD -> master)
Author: Kumar Deshmukh <MY_EMAIL@gmail.com>
Date:   Thu Nov 28 17:14:12 2024 +0530

    B: add titles

commit 3af19e91c88109c2a47c82c7109fc7eb9055fe77
Author: Kumar Deshmukh <MY_EMAIL@gmail.com>
Date:   Wed Nov 27 21:06:56 2024 +0530

    A: add contents.md
```

```sh title="Tracing links from the commit"
git cat-file -p 3af19e91c88109c2a47c82c7109fc7eb9055fe77
# tree 5b21d4f16a4b07a6cde5a3242187f6a5a68b060f
# author Kumar Deshmukh <MY_EMAIL@gmail.com> 1732721816 +0530
# committer Kumar Deshmukh <MY_EMAIL@gmail.com> 1732721816 +0530

# A: add contents.md

git cat-file -p 5b21d4f16a4b07a6cde5a3242187f6a5a68b060f
# 100644 blob ef7e93fc61a91deecaa551c4707e4c3049af42c9    contents.md

git cat-file -p ef7e93fc61a91deecaa551c4707e4c3049af42c9
# contents
```

- `tree` : Git's way of storing a directory
- `blob` : Git's way of storing a file

---

Here are a few references to learn more:

- **Articles and Posts**:

  - [The anatomy of a Git commit](https://blog.thoughtram.io/git/2014/11/18/the-anatomy-of-a-git-commit.html)
  - [How is git commit sha1 formed](https://gist.github.com/masak/2415865)
  - [Git from the bottom up](https://ftp.newartisans.com/pub/git.from.bottom.up.pdf)
  - [Why is Git not considered a "block chain"?](https://stackoverflow.com/questions/46192377/why-is-git-not-considered-a-block-chain)
  - The [`git hash-object`](https://git-scm.com/docs/git-hash-object) command
  - [Understanding Merkle Trees, the quintessence of Git, Bitcoin, and DynamoDB](https://medium.com/geekculture/understanding-merkle-trees-f48732772199)
  - [Git’s database internals I: packed object store](https://github.blog/open-source/git/gits-database-internals-i-packed-object-store/)
  - [The Packfile - Git Community Book](https://shafiul.github.io/gitbook/7_the_packfile.html)

- **YouTube**:

  - [Merkle Tree with real world examples | Gaurav Sen](https://youtu.be/qHMLy5JjbjQ?si=QG0OwYNexQWs1fAQ)
  - [How GIT works under the HOOD? | Tech with Nikola](https://youtu.be/RxHJdapz2p0?si=qwJznf26AzHhXkrD)
  - [Github merkle DAG | John Williams](https://youtu.be/ronoCeMzfJ4?si=Wh5ZONtIbPjTL-hD)
  - [Git Internals - Git Objects | Brief](https://youtu.be/MyvyqdQ3OjI?si=UQk_HW4Adus5jEUY)
