# Contributing Guide

## Prepare the Development Environment

1. Make sure you've got Node (v. ^16) and NPM (v. ^8) installed
2. Fork the repo
3. Clone the fork
4. Install the dependencies: `npm i`
5. Run `npm run build:lib`
6. Run `npm link`
7. Run `npm link @maplibre/maplibre-gl-directions`
8. Run `npm run build:lib`
9. Introduce some changes (see the section below)
10. Make sure the `npm run build` passes
11. Commit and push the changes
12. Create a PR

The steps 6 and 7 must be performed in order to have the `@maplibre/maplibre-gl-directions` as a local symlinked dependency, because the Demo project uses not the library sources, but the locally-built `/dist` folder to make sure that the instance being tested is the same instance which is deployed to the end user.

## Project Structure

The source files of the library itself are located under the `/src` folder. The `/src/main.ts` is the main entry point. The `/src/directions` folder contains everything related to the plugin's main purpose. The `/src/control` folder contains all the UI-Control-related source code (is currently WIP).

TypeDoc is responsible for building all the API documentation. The API documentation is built from the library sources and from the files located under the `/doc` folder.

The Demo project's source files are located under the `/demo` folder. See its README for more information.

## Making Changes

_All the processes mentioned in this section are described in more detail in the section below._

Changes to the library sources should be introduced while there's a running `dev:lib` process. You may also want to have a running `dev:doc` process to see how correctly your doc-comments are parsed. Notice however that `dev:doc` does not serve the built documentation static-website somewhere, it just continuously rebuilds it.

The Demo project might be used as a test-stand while working on the library sources. The `dev:demo` process serves the demo project at `localhost:3000` (by default). The Demo project uses the built `/dist` folder to refer to the library (instead of using sources from the `/src` directly), so you may also want to have a running `dev:lib` at the same time.

You may keep any examples you add when creating a PR if you think the changes you were working on are worth a separate example. An additional example by itself (without modifying the library sources) is a good PR candidate as well. The only thing you should remember when introducing any changes to the Demo project is that they are about to be seen by any other person, a potential end-user, so don't go too crazy and provide human-readable explanations of what the example is really meant to show.

## NPM Scripts

- `npm run dev:lib` - starts a vite-powered development server for the library source files. Continuously rebuilds the contents of the `/dist` folder while you make changes to the `/src` folder. **Does not rebuild types!** Must be restarted in order to rebuild them.

- `npm run dev:doc` - continuously rebuilds the documentation static-website while you make changes to the library source files and puts the result under the `/docs/api`. **Note** that for some reason it must be restarted in order to detect the changes you made to the `/doc` folder.

- `npm run dev:demo` - starts a vite-powered development server for the Demo project. The Demo project targets the library from the `/dist` folder via a symlinked `@maplibre/maplibre-gl-directions` package.

- `npm run build` - Combines `npm run format`, `npm run build:lib`, `npm run build:doc` and `npm run build:demo` into a single call.

  1. `npm run format` - lints (with `eslint --fix`) and formats (with `prettier --write`) all the necessary project source files.

  2. `npm run build:lib` - builds the library (the `/src` folder contents) and outputs the resulting es-module and its type declarations into the `/dist` folder.

  3. `npm run build:doc` - builds the documentation (the `/doc` folder contents and the source code comments) using the TypeDoc compiler and outputs the resulting static-website into the `/docs/api` folder.

  4. `npm run build:demo` - builds the Demo project (the `/demo` folder contents) and outputs the resulting static-website into the `/docs` folder.

Since the deployment process is configured to be performed automatically, you don't have to make sure that the `/docs` folder is up-to-date (it's actually ignored by Git). You run `npm run build` manually only to make sure that the build doesn't fail.

## Troubleshooting

### "Failed to resolve import "@maplibre/maplibre-gl-directions" from "demo/<...>". Does the file exist?

That happens when the package is not self-symlinked. Perhaps you did `npm i` or installed some new dependencies (NPM removes all the symlinked deps after updating the `node_modules).

**Solution**: run `npm run build:lib`, then run `npm link` and `npm link @maplibre/maplibre-gl-directions` once again.
