## Usage

Install the dependencies:

```sh
yarn install
```

Run dev server:

```sh
yarn dev
```

## Production version

To generate the production version, you can run:

```sh
yarn build
```

All files you have to deploy will be located at the `dist` directory.

### Run production version locally

To check if everything will be ok in production before the deployment, you can run this command after `yarn build`:

```sh
yarn preview
```