# [PROJECT NAME] [YEAR]

[SHORT DESCRIPTION]


---


## LINKS

* Code repository: [URL]
* Jira: [URL]
* Jenkins / Teamcity: [URL]
* Preview Server: [URL]
* Design: [URL]
* IA: [URL]


---


## DEVELOPERS

* [NAME / SHORT NAME] [YEAR]


---


## DOCUMENTATION

### Requirements (Browser Support, Accessibility Level etc.)

See [docs/Requirements.md](docs/Requirements.md)

### Coding Guidelines

See [docs/Coding_Guidelines.md](docs/Coding_Guidelines.md)

### Setup / Usage

See [docs/Setup_and_Usage.md](docs/Setup_and_Usage.md)

### FAQ (work in progress)

See [docs/FAQ.md](docs/FAQ.md)

### Tasks

See [docs/Tasks.md](docs/Tasks.md)


---


## How to make a pull request

1. Create your feature branch from a proper branch:
	- **release/github** - if you're making a change to Estático core
	- **develop** - if you're creating a pattern

	Name your branch well. Start with ticket number, add short title.

1. Do stuff.

1. Make sure your stuff works by checking that:
    - build runs on OS X and Windows
    - all Estático tasks are still functioning (by running **'npm test'** in a console)

1. Clean up code, remove unnecessary things.

1. Document your stuff! Possibilities:
    - Markdown file of your pattern module
    - /docs/FAQ.md
    - gulp task description at the top of task file + 'gulp document' in a console

1. If you made changes to dependency versions or included new dependencies, run **'npm shrinkwrap --dev'**.

1. Commit with meaningful messages, starting with relevant ticket number. E.g. **'ESTATICO-42: Meaningful message'**.

1. If you've made a lot of small meaningless commits, please squash them to avoid embarassment.

1. Close your eyes and push.

1. Run Jenkins build of your feature branch and make sure it doesn't fail.

1. Create a pull request with all frontend team as reviewers. Add a meaningful message, that includes:
    - ticket number
    - description of change
    - link to a preview of your jenkins build, if there is anything to see

1. Annoy the hell out of everyone by telling how good your pull request is and how soon should it be merged.

1. Deal with criticism in pull request comments. Cry a little. Fix it.

1. If your pull request doesn't get merged 5 seconds after you commit a fix, go to step 12.