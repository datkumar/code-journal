---
title: Working with Remotes
tags: [git]
---

**Contents**:

- [Remotes](#remotes)
  - [Upstream](#upstream)
- [Fetch](#fetch)
  - [Refspec](#refspec)
- [Push](#push)
- [Pull](#pull)
- [Pull Request](#pull-request)
- [Fork](#fork)

## Remotes

<img alt="Git Three Trees with Remote" width="100%"  src="/code-journal/diagrams/git-three-trees-with-remote.svg">

Git is a distributed version-control system, which means every developer has their own complete local repository. To share work, repositories communicate with one another by exchanging commits. In Git terminology, another repository that your repository can communicate with is called a `remote`. Refer [Working with Remotes](https://git-scm.com/book/ms/v2/Git-Basics-Working-with-Remotes).

Although Git (the open-source CLI tool) itself has no concept of a "central" repository, teams usually agree to treat one `remote` as the authoritative copy of the project, which is typically hosted on a site like GitHub, GitLab, or Bitbucket. By convention, this primary `remote` is usually named as `origin`. Developers `push` their work to this remote so others can `fetch` and integrate those changes into their own repositories. A `remote` can be another repository on your own machine or one hosted elsewhere. Since git remote accepts a [URI](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier), a `remote` can be a local path or an URL. Refer [Git URLs](https://git-scm.com/docs/git-fetch#_git_urls) for supported URL formats including HTTP, SSH, FTP

When you `clone` the remote repository, Git automatically sets up a relationship between your local repository and the remote. It creates **remote-tracking branches** such as `origin/main` and `origin/dev`, which are local references that record the last known state of branches on the remote. Git also configures an **upstream** branch relationship, for example, your local main branch tracks `origin/main` by default if remote branch not specified. Local branches and remote branches remain separate. The upstream relationship simply tells Git which remote branch a local branch should communicate with. This is how Git knows whether your branch is "ahead of" or "behind" origin/main, and why commands like git pull and git push can often work without explicitly specifying a remote branch.

To add another repo as `remote` for your own repo to track, use the [`git remote`](https://git-scm.com/docs/git-remote) command as follows:

```sh title="Adding another repo as remote"
# Syntax:
git remote add REMOTE_NAME REMOTE_URI
# Adding a local remote:
git remote add origin ../../project
# Adding a GitHub repo as remote:
git remote add origin git@github.com:username/repo_name.git        # via SSH (better)
git remote add origin https://github.com/username/repo_name.git    # via HTTP
```

To view your `remote`, use any of the following commands; the `-v` flag is for verbose output. It is possible that you may have different remote URIs for fetching and pushing. For example, if you have forked a repository and you would `fetch` from the original repo but `push` to your own fork

```sh title="View remotes"
# Lists remote names:
git remote
# origin

git remote -v
# origin  git@github.com:username/webflyx.git (fetch)
# origin  git@github.com:username/webflyx.git (push)

# Shows detailed information about a particular remote:
git remote show origin
# * remote origin
#   Fetch URL: git@github.com:username/webflyx.git
#   Push  URL: git@github.com:username/webflyx.git
#   HEAD branch: main
#   Remote branch:
#     main tracked
#   Local ref configured for 'git push':
#     main pushes to main (fast-forwardable)
```

If you wish to later change the `remote` to another repo, provide its URI as:

```sh title="Update remote"
# Syntax:
git remote set-url REMOTE_NAME NEW_URI
# To modify just the "push" remote:
git remote set-url --push origin NEW_URI
# Example:
git remote set-url origin git@github.com:another_user/some_proj.git
```

### Upstream

A local branch can optionally track a remote branch called its **upstream** branch. Remote commands like `git pull` and `git push` can use this relationship to determine which remote branch to communicate with by default. You just set the upstream once via `-u` or `--set-upstream` flag and Git would use that remote branch as default. The upstream relationship does not make the branches the same branch; it simply tells Git which remote branch your local branch should compare and synchronize with.

```sh
# Set the upstream branch once
git push -u origin main
# That upstream will be used for all these remote operations
git push
git pull
```

<!-- TODO: Git Clone section -->

---

## Fetch

Adding a `remote` to your repo doesn't automatically make your repo include all contents of that `remote`. You would have to fetch the contents via [`git fetch`](https://git-scm.com/docs/git-fetch) command as follows. It downloads any objects of `.git/objects` (commits, trees, blobs, tags, etc.) from the `remote` repository that your repository does not already have, along with other bookkeeping information. Fetching never modifies your working tree or your local branches; it only downloads new objects and updates remote-tracking branches.

By default, `git fetch origin` fetches all branches that match the remote's fetch **refspec** (usually every branch). Running `git fetch` without specifying a remote usually fetches from the default `remote`, typically `origin`. Git fetches all remote branches that match the configured `fetch` refspec and downloads any objects required to represent them locally. It would update all your matching local remote-tracking branches like `origin/main`, `origin/feature-x`. This is usually desired; because Git is distributed, having the full state of all remote branches locally allows you to compare your work, merge, or switch branches offline without hitting the network again

In example below, I had initialized our empty repo `webflyx-local` and added `../webflyx` repo (from sibling folder) as its `remote` and named as `origin`. Notice the contents of our repo before and after fetching from remote. After fetch, our repo has all the `objects` (commits, trees, blobs) from the `remote` as well as remote-tracking branches (`origin/main`, `origin/update_dune`)

```sh title="Fetching from remote"
# Contents of repo before fetching:
webflyx-local on ⎇ main
$ find .git/objects
.git/objects
.git/objects/info
.git/objects/pack

# Syntax to fetch:
git fetch REMOTE_NAME REFSPEC

# Fetch from remote:
webflyx-local on ⎇ main
$ git fetch
remote: Enumerating objects: 30, done.
remote: Counting objects: 100% (30/30), done.
remote: Compressing objects: 100% (28/28), done.
remote: Total 30 (delta 9), reused 0 (delta 0), pack-reused 0 (from 0)
Unpacking objects: 100% (30/30), 3.04 KiB | 778.00 KiB/s, done.
From ../webflyx
 * [new branch]      main        -> origin/main
 * [new branch]      update_dune -> origin/update_dune

# Contents of repo after fetching:
webflyx-local on ⎇ main
$ find .git/objects
.git/objects
.git/objects/8b
.git/objects/8b/65cb14f5323b514837ea6d808157126d24700e
.git/objects/a4
.git/objects/a4/cfb616be5793fc1300c4e7ff3887c791e9652b
.git/objects/20
# and so on ...
```

Just because we've fetched all the objects and references from the `remote` `webflyx` doesn't mean our working tree of `webflyx-local` suddenly contains all of its files. Our local repository has no commits yet and no local branches show up either. The commit objects present are the ones from `remote`, which you can view by specifying the remote branch name to `git log`

```sh title="Fetching latest commit history from remote"
webflyx-local on ⎇ main
$ git branch -a
  remotes/origin/HEAD -> origin/update_dune
  remotes/origin/main
  remotes/origin/update_dune

webflyx-local on ⎇ main
$ git log
fatal: your current branch 'main' does not have any commits yet

# View commits of "update_dune" branch on remote
# Notice how origin/main is behind origin/update_dune
webflyx-local on ⎇ main
$ git log origin/update_dune --oneline
6c580be (origin/update_dune, origin/HEAD) I: Dune fear quote
9c83a06 H: Dune spice quote
555b312 (origin/main) G: Updated Movie list
a23ad5f F: Merge branch 'add_classics'
8340a1c E: Filled contents.md
8b65cb1 D: add classics
# ...
```

Just how you are able to merge local branches of your repository, you can merge a remote branch into your local repository too. Since our local repo was empty (no commits in `main`), while merging remote branch `origin/main` into local branch `main`, it did a clean fast-forward merge. Notice in log output how both local `main` branch and remote `origin/main` branch point to the same commit `555b312` now

```sh title="Merge remote branch into local"
# Merge remote branch "origin/main" into current local branch "main"
webflyx-local on ⎇ main
$ git merge origin/main

webflyx-local on ⎇ main
$ git log --oneline
555b312 (HEAD -> main, origin/main) G: Updated Movie list
a23ad5f F: Merge branch 'add_classics'
8340a1c E: Filled contents.md
8b65cb1 D: add classics
# ...
```

To list references in `remote` repository, use the [`git ls-remote`](https://git-scm.com/docs/git-ls-remote) command:

```sh title="List refs in remote"
webflyx-local on ⎇ main
$ git ls-remote
From ../webflyx
6c580be2a128f6c19a991d7e955a0cc3aba89571        HEAD
555b3124d683077c23afc26a3f2333e2e3786c94        refs/heads/main
6c580be2a128f6c19a991d7e955a0cc3aba89571        refs/heads/update_dune
555b3124d683077c23afc26a3f2333e2e3786c94        refs/remotes/origin/main
```

To check how ahead or behind your local branches are with their remote-tracking branches, pass the `-vv` verbose flag:

```sh title="Check ahead/behind of remote"
$ git branch -vv
* dev  8e682bb [origin/dev: ahead 1] Docs Content Added
  main 5f36ba4 [origin/main] Astro V6 Upgrade (#4)
```

### Refspec

When you clone a repository, Git automatically sets up a **fetch refspec** in your repo's `.git/config` file. A [refspec](https://git-scm.com/book/en/v2/Git-Internals-The-Refspec) is a mapping rule that tells Git how to synchronize references (branches, tags) from the `remote` to your local repository.

```sh title="Refspec section in Config"
[remote "origin"]
        url = git@github.com:username/webflyx.git
        fetch = +refs/heads/*:refs/remotes/origin/*
```

The default fetch refspec is `+refs/heads/*:refs/remotes/origin/*`. This rule directs Git to take all branches found in the remote's `refs/heads/` directory and map them to your local `refs/remotes/origin/` directory.

The format of the refspec is `[+]<src>:<dst>`:

- `+` (Optional): The plus sign allows for a "non-fast-forward" update. It tells Git to **overwrite** the local reference even if the new history is not a direct descendant of the old one. This is standard for fetch operations to ensure your remote-tracking branches perfectly mirror the server state.
- `<src>`: The pattern for references on the remote side, like `refs/heads/*`
- `<dst>`: The destination pattern for where those references will be stored locally, like `refs/remotes/origin/*`

In short, the refspec is the "invisible engine" that ensures `git fetch` knows exactly where to place the incoming data from the remote repository.

---

## Push

Assuming you are authenticated and have permissions, in order to send the changes of your local branch to the `remote` repo, use the [`git push`](https://git-scm.com/docs/git-push) command

```sh title="Git Push"
# Syntax (:REMOTE_BRANCH part is optional):
git push REMOTE_NAME LOCAL_BRANCH:REMOTE_BRANCH

# Push local "main" branch to the "main" branch of your "origin" remote:
git push origin main

# Push local "main" branch to the "master" branch of your "origin" remote:
git push REMOTE_NAME main:master

# Pushing empty local branch like this deletes the "feature-x" branch on remote:
git push origin :temp-feature
```

An example of `push` operation output:

```sh title="Push operation example"
webflyx on ⎇ add_classics
$ git push origin add_classics
Enumerating objects: 21, done.
Counting objects: 100% (19/19), done.
Delta compression using up to 12 threads
Compressing objects: 100% (13/13), done.
Writing objects: 100% (13/13), 1.34 KiB | 1.34 MiB/s, done.
Total 13 (delta 6), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (6/6), completed with 2 local objects.
remote:
remote: Create a pull request for 'add_classics' on GitHub by visiting:
remote:      https://github.com/username/webflyx/pull/new/add_classics
remote:
To github.com:username/webflyx.git
 * [new branch]      add_classics -> add_classics
```

Normally, Git only allows a `push` if it can be applied as a _fast-forward_ update. If you have modified prior commit history via commands `rebase`, `git commit --amend`, or `git reset`, your push may be **rejected**. In such cases, you may need to **force push** your history to the `remote` branch via `-f` or `--force`. The `--force-with-lease` option is generally preferred over `--force` because it refuses to overwrite commits that someone else may have pushed in the meantime (lease duration).

```sh title="Force Push"
# Force push (DANGER):
git push -f
# Force push only if no one else pushed during lease:
git push --force-with-lease
```

> Be **very careful with force push** as it would rewrite history of the central `remote` that all other team member's local repos are also tracking and their history would get out-of-sync. Thus, avoid or restrict for shared/public branches

---

## Pull

Most of the times we don't just want to fetch the changes of remote repo, but actually integrate them in our local repo too. For this, we use the [`git pull`](https://git-scm.com/docs/git-pull) command.

```sh title="Git Pull"
# Syntax:
git pull MODE REMOTE_NAME BRANCH_NAME
# Example:
git pull --rebase origin master
```

The `git pull` operation first runs a `git fetch` with similar arguments to fetch remote branch. Then it attempts to integrate that remote branch into your current local branch. There are 4 `MODE` flag options to determine how the integration happens:

- `--ff-only` : it will only do _fast-forward_ updates and would fail if your local branch has diverged from the remote branch. This is default if no `MODE` is specified or configured
- `--rebase` : runs `git rebase`. It's the recommended one for maintaining a clean linear history
- `--no-rebase` : runs `git merge`. Suited for `main` branch where you wanted to keep track when a branch was merged
- `--squash` : runs `git merge --squash`. Not used much

If there’s a merge conflict during the merge or rebase that you don’t want to handle, you can safely abort it with `git merge --abort` or `git rebase --abort`. You can also set any one of the flags `pull.rebase`, `pull.squash`, or `pull.ff` to `true` in your config file for preferred behavior.

Note that just how we `merge`/`rebase` or local branches into one another, during the `pull` operation we'd be fetching and then merging/rebasing a `remote` branch like `origin/main` into our local `main` branch

```sh title="Pull operation example"
webflyx on ⎇ main
$ git pull origin main
remote: Enumerating objects: 1, done.
remote: Counting objects: 100% (1/1), done.
remote: Total 1 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
Unpacking objects: 100% (1/1), 899 bytes | 899.00 KiB/s, done.
From github.com:username/webflyx
 * branch            main       -> FETCH_HEAD
   7218fd2..7150dbe  main       -> origin/main
Updating 87e750d..7150dbe
Fast-forward
 classics.csv | 1 +
 1 file changed, 1 insertion(+)
```

---

## Pull Request

We previously discussed how teams maintain a central `remote` repository on platforms like GitHub or GitLab. If every developer pushed their commits directly to the project's `main` branch, the codebase would quickly become a chaotic, broken mess. We need an intermediary mechanism to **review and discuss changes before they are integrated** into the authoritative central repository. This is exactly what the [Pull Request (PR)](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) feature on GitHub (or Merge Request on GitLab) provides. It is important to note that this is a feature of the hosting platform, not Git itself.

In a typical PR workflow, a developer works in an independent feature branch and pushes those commits to the `remote`. Once the work is ready, they open a PR, which acts as a dedicated space for team members to inspect the proposed changes, discuss them, and provide feedback. Once the work is finalized and approved, the **PR is merged** into the central `main` branch on the `remote` server. To maintain a clean history, all team members should periodically `pull` these updates into their own local branches (`git pull --rebase` preferred) to ensure their work is built upon the latest state of the project.

---

## Fork

A fork is not a feature of Git itself, but a collaborative feature provided by hosting platforms like GitHub. To ["fork" a GitHub repo](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) means to create a server-side copy of an existing project under your own user account.

This is the standard workflow for contributing to open-source projects where you do not have direct write access to the original repository:

- **Fork**: Create a copy of the original project in your own account
- **Clone**: `clone` your forked repo to your local machine
- **Develop**: Create a separate feature/bugfix branch, implement your changes, and commit them
- **Push**: Push that feature branch changes to your fork (`origin`)
- **Open PR**: Create a Pull Request requesting the maintainers of the original project to `merge` your branch into `main` on their repository, also describe your proposed changes. If they approve of the changes, they'll merge it into original project

Since the original project continues to evolve while you work, your fork can quickly become outdated. To keep your fork in sync, add the original repository as a second remote, usually named `upstream`.

```sh title="Upstream for Fork"
# Add the original project as a remote named 'upstream'
git remote add upstream ORIGINAL_REPO_URL

# Update your local 'main' branch with the latest changes
git fetch upstream
git switch main
git rebase upstream/main

# Update the 'main' branch on your fork (origin)
git push --force-with-lease origin main
```

At this point, your remotes usually look like this:

```txt frame="none"
origin   -> your fork on GitHub
upstream -> the original project
```

By periodically rebasing your local `main` branch onto `upstream/main`, your fork stays up to date with the latest changes from the original project. This allows new feature branches and Pull Requests to start from the most recent version of the code, reducing the likelihood of unnecessary merge conflicts.
