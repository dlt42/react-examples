# react-examples

I have created this project as a repository of example react components I have written, accessible via a simple UI, as a reference for myself but also for the benefit of others (should they stumble across it).

My aim is to place the source code for each example in a separate folder to make discovery easier.

Some examples are quite contrived, and bordering on overkill, but context helps.

Friendly feedback welcome.

This project can now be accessed at https://dlt42.github.io

# Available Scripts

In the project directory, you can run:

### `npm run dev`

Run the app on a local server with fast reloading using vite at `http://localhost:5173/`

### `npm run build`

Build the app with generated files output to the `./build` folder

### `npm run eslint`

Run lint checks using es-lint and the associated config, helping to identify bugs and ensure consistency 

### `npm run eslint-fix`

Run lint checks using es-lint and the associated config, applying fixes for identified bugs or changes to ensure consistency (where possible)

### `npm run preview`

Run a local static web server that serves the files from `./dist` at `http://localhost:4173`

### `npm run typecheck`

Checks variable types throughout the code
    
### `npm run lint`

Runs the `eslint` and `typecheck` scripts

### `npm run lint-fix`

Runs the `eslint-fix` and `typecheck` scripts

### `npm run test`

Runs the unit tests using vitest

### `npm run coverage`

Evaluates unit test coverage using vitest

### `npm run format`

Formats all source code using prettier

# TODO

- Add unit tests
- Add coverage checks
- Finish transfer of CSS to tailwind
- Add controls for adding / removing elements in expression editor
- Add more examples
- Add explanation popup for examples
- Improve overall look and feel
- Add mandelbrot set viewer