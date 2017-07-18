# Unit testing

> Unit tests are automatically executed in the build phase, but are excluded in the default task.

## TDD

To run karma in watch mode (watching file changes) execute `gulp js:tdd`.
 

## Debugging
For unit test debugging open 2 consoles:
1. `gulp --dev` - Will watch changes to source files.
2. `gulp js:tdd --chrome` - Runs unit tests in chrome with UI interface and watches all test files.
