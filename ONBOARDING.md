# Onboarding

## Day 1

- Tools installation

  ### Mac:

  - [VS Code](https://code.visualstudio.com/)
  - Ensure .bash_profile
    `touch ~/.bash_profile`
  - [nvm](https://github.com/nvm-sh/nvm)
  - Node
    - `nvm install 11.10.1` to install required version of node
    - `nvm use 11.10.1` - to set the current version of node
  - yarn
    `npm i yarn -g`
  - Install xcode-select:

  ```bash
  xcode-select --print-path
  ```

  ```bash
  sudo rm -r -f /Library/
  Developer/CommandLineTools
  ```

  ```bash
  xcode-select --install
  ```

  - Install MiniConda. Download the necessary installer from https://docs.conda.io/en/latest/miniconda.html#macosx-installers. Then run

  ```bash
  bash ~/Downloads/<INSERT_WHAT_EVER_YOU_HAVE_DOWNLOADED>
  ```

  - Install python2
    `conda create -n base2 python=2`
  - Activate python2
    `conda activate base2`
  - Install VPN by following https://docs.google.com/document/d/1U4LK3IQKwtMABa7xTPTYPg6V_tC6gP4pD3LE5XW9xG8/edit?usp=sharing

  ### Windows:

  - Install python 2.7 https://www.python.org/downloads/release/python-2717/
  - Install msbuild tools https://download.visualstudio.microsoft.com/download/pr/3e542575-929e-4297-b6c6-bef34d0ee648/639c868e1219c651793aff537a1d3b77/vs_buildtools.exe

  https://stackoverflow.com/questions/57795314/are-visual-studio-2017-build-tools-still-available-for-download

  - Add python to env PATH variable
  - Install VPN by following https://docs.google.com/document/d/1U4LK3IQKwtMABa7xTPTYPg6V_tC6gP4pD3LE5XW9xG8/edit?usp=sharing

- Project setup
- Project structure walk-through

## Day 2

- [React Functional components](https://reactjs.org/docs/components-and-props.html)
- [React hooks](https://reactjs.org/docs/hooks-intro.html)
  - `useState`
  - `useEffect`
  - `useMemo`
  - `useCallback`

## Day 3

- [Redux](https://redux.js.org/)
  - Container pattern
  - selectors
  - reducer

## Day 4

- [Formik](https://formik.org/docs/guides/validation#validationschema)
- [Yup](https://www.npmjs.com/package/yup)

## Day 5

- Explore functional components in app
- Explore hooks usage and reusable hooks in app
- Explore reducers and redux usagein app

## Day 6

- KT

## Day 7

- KT

## Day 8

- KT

# Branches

- `rewrite/dev`
- `rewrite/qa`
- `rewrite/uat`
- `rewrite/preprod`
- `master` - production
