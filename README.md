# Lendflow Frontend Assessment

My implementations for all 4 problems listed in the Lendflow Frontend Assessment.

### Project Requirements

- [Bun](https://bun.sh/docs/installation) version 1.1.30 or greater.

Bun was choosen so assignments could be written nativly in TypeScript with no setup. This was particuarily useful for the first 3 assignments, `watching-an-object`, `typescript-type-definition`, and `json-manipulation`.

### Project setup

With Bun installed, dependencies can be resolved repo wide by running the following command at the root of the repository:

```
bun install
```

### Assignments

There are 4 assignments included in this repository, found in the `assignments` directory. Valid assignment names, which are used in the commands below, are as follows:

- `watching-an-object`
- `typescript-type-definition`
- `json-manipulation`
- `scroll-cards`

### Running an assignment

All assignments, with the exception of `scroll-cards`, includes an index.ts entrypoint. These can be invoked from the root of the repository as follows:

```
bun run ./assignments/<assignment-name>
```

Where `<assignment-name>` is the name of the assignment you wish to run. For example, if I wanted to run `watching-an-object`, I would do:

```
bun run ./assignments/watching-an-object
```

Note that the `./` is required when providing the path. Without it, Bun will think you are trying to invoke a script listed in package.json.

### Running `scroll-cards`

To start a dev server for the scroll-cards assignment, cd to `./assignments/scroll-cards` and run `bun run dev`.

### Running tests

Tests can be run on all assignments by running the following at the root of the repository:

```
bun run vitest
```

If you wish to run tests for a single assignment only, pass the assignment to vitest as follows:

```
bun run vitest ./assignments/<assignment-name>
```

Note that tests for `typescript-type-definition` are statically analyized, and can not be invoked by vitest. See the [vitest guide on testing types](https://vitest.dev/guide/testing-types#testing-types) for more information.
