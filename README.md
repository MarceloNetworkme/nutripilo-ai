# Rsbuild Project

## Setup

Install the dependencies:

```bash
pnpm install
```

## Get Started

Start the dev server:

```bash
pnpm dev
```

Build the app for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

## Components:

Place on witch we centralize all the components, this should contain the minimum logic as possible, is a UI layer with the required logic to manage state call services, triguers, etc...

## Infra:

Contains the actual clients that we will require to connect with the external systems (our case, openAI and Cosmos)

Also contains code about tools that facilitate this communications like cache and our custom query system

## Interface:

Place on witch that we actualy present the pages of our application, this pages can have multiple components

## Services

This represents the layer on witch we use to call the services, we can:
-  Apply some buisness logic
-  Request/response transformations
-  Call external systems trough infra



## Others

Local, utils and theme are just helper stuff for generic logic and UI personalization
