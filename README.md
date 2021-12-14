<!-- language-all: javascript -->

<h1 align="center">
  <img src="https://raw.githubusercontent.com/koii-network/koii.X/main/.github/images/koii_logo.svg" width="224px"/><br/>
  Create Koii App :fish:
</h1>
<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white" alt="typescript" />&nbsp;
  <img src="https://img.shields.io/badge/storybook-FF4785?style=?style=flat&logo=appveyor&logo=storybook&logoColor=white" alt="storybook" />&nbsp;
   <a href="https://discord.gg/koii" target="_blank"><img src="https://img.shields.io/badge/Discord-7289DA?style=flat&logo=discord&logoColor=white" alt="cli version" /></a>&nbsp;
   <a href="http://koii.network/" target="_blank"> <img src="https://img.shields.io/badge/made%20by-koii-blue" alt="made-by-koii" /></a>&nbsp;
</p>

## ⚡️ Quick start

First of all, run `npx create-koii-app` to create a Koii Dapp.

After the installation is done head to the installed project and inside it run `yarn start`.

## Table of Contents

- [Structure](#structure)
- [Hooks](#hooks)
  - [useFinnie](#useFinnie)
  - [useSdk](#useSdk)
  - [useKoii](#useKoii)
- [Integrations](#storybook)
  - [Storybook](#storybook)
- [Environment](#environment)
  - [Node](#node)
  - [Yarn](#yarn)

# Structure

Describes the app structure and usage of each part. Add additional ReadMe-files in each folder as needed and link them here.

- [services](./src/services) - shared services such as axios.
- [assets](./src/assets) - place images, svgs and any assets here
- [components](./src/components) - place any shared components here.
- [lib](./src/lib) - shared business logic such as hooks, api
- [routes](./src/routes) [react-router](https://reactrouter.com/web/guides/quick-start) implementation.
- [storybook](./storybook/main.js) - see **[storybook](#storybook)** section

# Hooks

## useFinnie

Use the `useFinnie` hook whenever you need to interact with finnie.

Example below how to connect to finnie wallet and get the wallet address:

```
import { useFinnie } from "services/hooks";

function Component() {
  const { state: { connectFinnie, isLoading, isError, walletAddress, isFinnieConnected } } = useFinnie();

  return (
    <>
      <button onClick={connectFinnie}>
        {isLoading ? "Connecting..." : isFinnieConnected ? "Connected ✓" : "Connect to finnie"}
      </button>

      {isFinnieConnected && (
        <p>
            Connected. Your wallet address is: <code>{walletAddress}</code>
        </p>
      )}

      {isError && (
          <p>An error occurred while connecting to finnie.</p>
      )}
    </>
  );
}
```

## useSdk

Use the `useSdk` hook whenever you need to interact with Koii sdk.

Example below how to get Koii nft for the connected finnie wallet:

```
import { useSdk } from "services/hooks";

function Component() {
  const {wallet, getKoiiNfts} = useSdk();
  return (
    <>
      <Button onClick={getKoiiNfts}>
        Get my Koii nfts
      </Button>

      <NftsListWrapper>
        {wallet?.nfts?.map((nft) => {
          return <NftCard item={nft} key={nft.id} />;
        })}
      </NftsListWrapper>
    </>
  );
}
```

## useKoii

Use the `useKoii` hook whenever you need to interact with Koii internal apis, e.g Uploading to Koi.rocks platform.

## Styled Components

Project uses Styled components to make the styles read more:

- https://styled-components.com/docs

## Integrations

### Storybook

implementation of [react-storybook](https://github.com/storybookjs/react).

Run `yarn storybook`

## Environment

### Node

These versions provides stable compatibility with React Native and other frameworks:

- **Node v12.XX** (`node --version`)
- **npm 6.XX** (`npm --version`)

**[Download Node with NPM](https://nodejs.org/download/release/v12.16.3/)**

### Yarn

We install and run our scripts with yarn, as an alternative to npm:

**[Download Yarn](https://yarnpkg.com/lang/en/docs/install/)**
