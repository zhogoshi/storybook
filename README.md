# storybook

A Next.js gallery of the Hogoshi kit. This is not the Storybook npm library.

Repository: https://github.com/zhogoshi/storybook

## What

Pages that render `@hogoshi/ui` so a component can be checked without opening a product.

## Why

The kit stays a library. The gallery is an app that depends on the published packages.

## Install and run

```bash
pnpm install
pnpm dev
```

Dev server: http://localhost:6006

```bash
pnpm build && pnpm start
```

## Docker

```bash
PORT=6010 docker compose up --build
```

`PORT` is the host port. The app inside the container still listens on `6006`. Set `HUGEICONS_NPM_TOKEN` before the image build. In Dokploy, point the domain at container port `6006`.
