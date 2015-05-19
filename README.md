# Git Alert

Broadcast important messages alongside your commits, so that the others
could see them on `git pull`.

`git-alert` is a command-line utility written in [Node](http://nodejs.org).

## Installation

1. Install `git-alert` globally via [npm](http://npmjs.org):

    ```bash
    npm install -g git-alert
    ```

2. Install `post-merge` hook in your repository:
 
    ```bash
    git alert install
    ```

3. You're done! Read on.
    
## Summary

`git alert install` — installs `post-merge` hook that displays pending messages
after you `git pull` in your repository

`git alert 'My important message'` — adds specified message

`git alert rm e3bfac` — removes specified message (yeap, each message has its hash,
like commits)

`git alert show` — shows pending (unread) messages, marking them as read

`git alert list` — lists all messages from `.gitalert` file (where they
are actually stored)

## How it works?

1. You and your team members install `git-alert` and hooks for the repository.

2. You add a message via `git alert 'My important message'` and commit your changes.

3. Other team members do `git pull` and see `'My important message'`.
 
Did I mention some details?

* The list of messages is stored in `.gitalert` file in your repository. Note,
  you should actually commit this file so that the others could receive it.
  
* The list of read messages is stored locally in `.git` directory.

* When you no longer need a message, you can remove it: first locate it
  and its hash with `git alert list`, then remove it with `git alert rm <hash>`.
  
  It is a good practice to keep an entire list of messages small.
  
* `.gitalert` is actually a human-readable JSON file, so you can edit it by hand
  and even merge conflicts.

* In case you miss messages (e.g. when automatic merge fails `post-merge` hooks
  are not executed) you can always read them manually via `git alert show`.
  
## License

ISC / Boris Okunskiy
