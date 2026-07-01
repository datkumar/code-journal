---
title: Git Internals
tags: [git]
---

## Git Commit hashes

Git commit hashes are generated automatically by Git via the [`SHA-1`](https://en.wikipedia.org/wiki/SHA-1) hash function. These hashes are almost always unique, so you don't need to worry too much about collisions.

A number of attributes are passed into the commit hash function such as:

- Source tree of the commit (which unravels to all the subtrees and blobs)
- Parent commit's hash
- Author info (name, email)
- Committer info (usually same as author but varies during certain operations)
- Commit message

Each SHA-1 hash is 160 bits long, meaning **40 characters** of hexadecimal digits

## Git Objects

Git is a **content-addressable filesystem**. It means you can insert any kind of content into a Git repository, for which Git will return a unique key you can use later to retrieve that content. Git internally uses a [Merkle Tree](https://en.wikipedia.org/wiki/Merkle_tree) (actually a DAG) to maintain the **integrity** of changes made in the repository. Git is made up of [Objects](https://git-scm.com/book/en/v2/Git-Internals-Git-Objects) such as commits, branches, tags etc. which are stored in the `.git/objects/` directory within the project repository.

To see this, note the hash of your recent commit. Check contents of `.git/objects/` and you'll see some **2-letter folders**; find one whose starting characters are that of your commit hashes. Inside them will be files named as rest 38-characters of your commit hash. These are your **commit files**. For example, see how the `3d22053f2403d3f75371e71210a47d5283d9c5c1` commit hash is stored as object file within `3d/` folder with the commit object file `22053f2403d3f75371e71210a47d5283d9c5c1`. This 2-letter folder name splitting of commit hash objects is done so as to prevent exceeding the [inode limit](https://www.site24x7.com/learn/linux/inode.html) of the underlying filesystem. You can view the contents of your commit object file as shown below.

The contents would be a bunch of weird raw bytes. This is because Git **compresses** your commits for efficiently sending them over the network. There's also the plumbing command [`git cat-file`](https://git-scm.com/docs/git-cat-file) to view contents of repository objects

We might think Git just stores the changes you made during that commit in the commit information i.e. just the diffs. However, that is not the case.

> On every commit, Git stores a **snapshot** of **ALL** your project files at that point of time (along with existing history) in that commit

While taking the entire snapshot, Git does a bunch of performance optimizations so that the size occupied by `.git/` folder doesn't get too large. Some of the optimizations are:

- Compressing and packing files. Refer [Packfiles](https://git-scm.com/book/en/v2/Git-Internals-Packfiles)
- De-duplicating files that remain same between commits i.e. if a file didn't change, Git will only store it once

```sh title="Trying to view a commit object file"
# View History of Commits (selecting second one):
git log --oneline
# ff8968b (HEAD -> main, origin/main) Unit tests for Input Validation (email, password)
# 3d22053 Fix Homescreen restaurant list refetching, Splash Screen, minor refactor
# e66c3fb Save User Details to Prefs along with the Token
# ... further commit history ...


# Using 'cat' on commit object file prints raw bytes:
cat .git/objects/3d/22053f2403d3f75371e71210a47d5283d9c5c1
# xMj0)fkIJ       Fq,bAǯZzxG[)UfPBydpD
#                                     zO^DCix`#)1S]BHJYf֑3;hV(X.>?#y9V^@:/0VhxV|lw+TFs^o'>g6OP5zmu|{e%


# View a hex dump of that commit object file:
xxd .git/objects/3d/22053f2403d3f75371e71210a47d5283d9c5c1
# 00000000: 7801 a58f 4d6a c330 1085 bbf6 2966 df10  x...Mj.0....)f..
# 00000010: f46b 4910 4a17 a514 bacc 0946 a371 2c62  .kI.J......F.q,b
# 00000020: d941 96a1 c7af 5a7a 83ae 86ef f178 cc47  .A....Zz.....x.G
# 00000030: 5b29 b981 16e1 a955 6650 4279 85e3 9464  [).....UfPBy...d
# 00000040: 70c6 44d2 fd90 0c82 7ac8 d24f 5ea3 4443  p.D.....z..O^.DC
# 00000050: 6978 60e5 b501 8f23 e929 ba31 18ab 53f4  ix`....#.).1..S.
# 00000060: 185d 9c42 484a 5966 81d6 9133 d23b 1ef0  .].BHJYf...3.;..
# 00000070: 68f3 56e1 f328 58e1 8df7 b91c f719 2ef7  h.V..(X.........
# 00000080: 1f3e a73f ee23 afb7 8279 39d3 565e 403a  .>.?.#...y9.V^@:
# 00000090: 2f85 3056 6878 1656 8ba1 a7fd dbc6 ffdd  /.0Vhx.V........
# 000000a0: 19de f317 7c6c 8577 ead2 2b54 de1b 1e15  ....|l.w..+T....
# 000000b0: bbd0 92f7 d679 e246 735e 6f27 b83e 16dc  .....y.Fs^o'.>..
# 000000c0: 67b8 fe36 4f50 f2da 357a 01a9 6d75 f806  g..6OP..5z..mu..
# 000000d0: 7c7b 65cf                                |{e.
```

Syntax to print a Git Object: `git cat-file -p HASH_VALUE`

At least **4 starting characters** of the hash value are needed to view it

```sh title="Correct way to view a git object"
# Pretty-print contents of the commit object file (3d22053 is the commit hash prefix)
git cat-file -p 3d22053
```

```txt title="Output: Commit metadata shown"
tree 20282a6fd19744bc3974c190c2a6e18f83a1a4cd
parent e66c3fb769453db8ab7bf99d225ee0a57c74187e
author Kumar Deshmukh <MY_EMAIL@gmail.com> 1781004503 +0530
committer Kumar Deshmukh <MY_EMAIL@gmail.com> 1781004503 +0530

Fix Homescreen restaurant list refetching, Splash Screen, minor refactor
```

The `parent` commit hash would be absent for the first commit (as it won't have any parent before it). Each `parent` commit hash value helps us walk backwards in history over prior commits. Each commit stores a unique `tree` per commit. These `tree` hashes are also **pointers** to files i.e. `blobs` or to folders (other `tree` hashes) but they do NOT store the exact file contents for each commit. These hashes of `tree` folders or `blob` files would change in upcoming commits only when their contents have been modified, unless they'd stay the same

Some of git's internal terminologies to note are:

- `tree` : Git's way of storing a **directory**
- `blob` : Git's way of storing a **file**

```sh title="Viewing a tree object"
# Pretty-print contents of the tree object file (20282a6f is the tree hash prefix)
git cat-file -p 20282a6f
```

```txt title="Output: Blob entires for files and Tree entries for folders"
100644 blob 428f128b6484068d7da27f9258dd5254980de01f    .gitignore
040000 tree 7cbf8a520230957069bf36bdeab39b7c3555957a    app
100644 blob 00ba9a9bcf420791b69c2dfdf2587e93192e7095    build.gradle.kts
100644 blob 34c5e9eb726211b38cff8900b58fa974699d63df    gradle.properties
040000 tree 535299c215871a43de92d601e20e60ac56eb7d93    gradle
100755 blob ef07e0162b183eb9d19a2c9ba7035c283af9f8dd    gradlew
100644 blob db3a6ac207e507b0bc1635a9f2c18d3b174e682e    gradlew.bat
100644 blob ee3145b838f28ab9460544fef6d9e8bac19b49b9    settings.gradle.kts
```

```sh title="View contents of a blob file"
# Pretty-print contents of the blob object file (00ba9a9b is the blob hash prefix)
git cat-file -p 00ba9a9b
```

```kt title="Output: Actual contents of that source code file shown"
// Top-level build file where you can add configuration options common to all sub-projects/modules.
plugins {
    alias(libs.plugins.android.application) apply false
    alias(libs.plugins.kotlin.compose) apply false
    alias(libs.plugins.google.ksp) apply false
    alias(libs.plugins.secrets) apply false
}
```

Below is the normal view of the folder structure for which Git has internally converted into tree structure. Note how `app/` and `gradle/` folders translate to a `tree` in above output but the remaining files like `gradle.properties` and `build.gradle.kts` translate to corresponding `blob` entries. We have used the `git cat-file -p` to command to read each of the objects like `commit`, `tree`, `blob` etc. Also note how certain files like `secrets.properties` or folders like `build/` that are put in a `.gitignore` to be excluded from version control are not being tracked in any way within Git's stored objects

```sh title="Folder structure"
tree -F -L 2
./
├── app/
│   ├── build/
│   ├── build.gradle.kts
│   ├── proguard-rules.pro
│   └── src/
├── build/                              # gitignored
│   └── reports/
├── build.gradle.kts
├── gradle/
│   ├── gradle-daemon-jvm.properties
│   ├── libs.versions.toml
│   └── wrapper/
├── gradle.properties
├── gradlew*
├── gradlew.bat
├── local.properties                    # gitignored
├── secrets.properties                  # gitignored
└── settings.gradle.kts
```

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
  - [Deconstructing a git commit](https://krishnabiradar.com/blogs/deconstructing-a-git-commit)
  - [Merkle Tree 101](https://ghost.oxen.ai/merkle-tree-101/)
  - [Understanding Merkle Trees](https://medium.com/geekculture/understanding-merkle-trees-f48732772199)

- **YouTube**:
  - [Merkle Tree with real world examples | Gaurav Sen](https://youtu.be/qHMLy5JjbjQ?si=QG0OwYNexQWs1fAQ)
  - [How GIT works under the HOOD? | Tech with Nikola](https://youtu.be/RxHJdapz2p0?si=qwJznf26AzHhXkrD)
  - [Github merkle DAG | John Williams](https://youtu.be/ronoCeMzfJ4?si=Wh5ZONtIbPjTL-hD)
  - [Git Internals - Git Objects | Brief](https://youtu.be/MyvyqdQ3OjI?si=UQk_HW4Adus5jEUY)
