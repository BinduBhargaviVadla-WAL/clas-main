# Cypresslawn

## Setup

### Install required dependencies

```bash
$ yarn
```

### Create `.env` for local development environment using `.env.sample` file

### Starting App on local

```bash
$ yarn dev
```

### Packaging for Production

To package apps for the local platform:

```bash
$ yarn package
```

<hr>

## Coding guidelines

### Application Structure

```
app
|── api
|── common (reusable)
|   |── features (reusable app features)
|     |── add-note
|     └── notes-list
|   |── components
|     |── panel
|     └── radio-group
|   └── hooks
|     |── use-paging
|     └── use-localstorage
|
|── features (app features)
|    |── calls (module)
|      |── list (component)
|      └── new-call (component)
|    |── cases (module)
|      └── dashboard
|    |── fragments (playground for trying reusable components)
|    └── route-warp (playground for all routes in application)
|── sqlite (offline storage config files)
```

### Useful VSCode Extensions

- [EsLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### Routing

- Each module should have its own routing.

  Example : For calls module <a href="app/features/calls/index.js">app/features/calls/index.js</a> has the Calls component which manages other child components like NewCall with /calls/new-call route. Add the module level route in <a href="app/routes/protected-routes.jsx">app/routes/protected-routes.jsx</a> component`

<a href="app/features/calls/index.js">app/features/calls/index.js</a>

```
<Switch>
  <Route path={path} component={CallList} />
  <Route path={`${path}/new-call`} component={NewCall} />
</Switch>
```

<a href="app/routes/protected-routes.jsx">app/routes/protected-routes.jsx</a>

```
<Route path="/calls" component={Calls} />
```

### General Conventions

- Always commit `yarn.lock` changes
- Always format the code properly before the commit. Use prettier format on save feature.

### Components

- Use functional components with `useState, useEffect, useCallback, useMemo, useSelector, useDispatch`
- Split the components into
- Follow the file and component naming convention as below example

```
call-list.jsx (component)
call-list.scss (styles)
call-list.spec.js (unit tests)
call-list.container.js (container)
```

- For Reusable components make use of `propTypes and defaultProps`. Example: <a href="app/common/components/button/Button.jsx">app/common/components/button/Button.jsx</a>
- Avoid adding business logic to reusable components
- Avoid props spreading `{...this.props}`
- Use the existing common form components. If additional features are required extend those components
- For loading use the existing common hook

### Forms

- Use formik
- Each form must have relevant validation

### Container

- containers if used should live beside the component

### Redux

- Use it for storing app level data.
  `Example: authentation, drafts, location, dropdown lists data`
- Avoid using it for storing forms, reusable components, tables data

### Styles (scss)

- For feature components use <a href="app/features/features.scss">app/features/features.scss</a> to import styles
- For common components use <a href="app/common/components/components.scss">app/common/components/components.scss</a> to import styles
- For common features use <a href="app/common/features/common-features.scss">app/common/features/common-features.scss</a> to import styles

### Unit Testing

- Use `yarn test` for running unit tests
- To check code coverage open this file in your browser <a href="coverage/lcov-report/index.html">coverage/lcov-report/index.html</a>
- Snapshots are created in the root folder `__snapshots__`

### Builds Configuration for QA, UAT

- run `node pre-build.js` to create .env file with the following variables

  - APP_BUILD_ENV="value" // qa, uat
  - APP_ENV="value" // content for .env file, each env variable name and value pair separated by space.

    Example:
    `node pre-build.js --APP_BUILD_ENV=qa --APP_ENV="REACT_APP_BASEURL=http://dev-app01:3001/api/v1 ROLLBAR_ACCESS_TOKEN=9aa91a2d53d2432e8cef2747c003e759 STRIPE_PUBLIC_KEY=pk_test_Yt9QOwAV52OB86a8ohZaJreg00fA1uuBgs"`

### Preprod and production Builds

- run `node pre-build.js` to create .env file with the following variables

  - APP_BUILD_ENV="value" // preprod, production
  - APP_ENV="value" // content for .env file, each env variable name and value pair separated by space.
  - APP_GH_TOKEN="token" // github user token for github release and auto updates
  - APP_GH_OWNER="value" // github owner name for github release and auto updates
  - APP_GH_REPO="cl-fe" // github repo for github release and auto updates

    Example:
    `node pre-build.js --APP_BUILD_ENV=preprod --APP_ENV="REACT_APP_BASEURL=http://dev-app01:3001/api/v1 ROLLBAR_ACCESS_TOKEN=9aa91a2d53d2432e8cef2747c003e759 STRIPE_PUBLIC_KEY=pk_test_Yt9QOwAV52OB86a8ohZaJreg00fA1uuBgs" --APP_GH_TOKEN=token --APP_GH_OWNER=westagilelabs --APP_GH_REPO=cl-fe`
