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

Dev server: http://localhost:3000

```bash
pnpm build && pnpm start
```

## Docker

```bash
PORT=3010 docker compose up --build
```

The process binds `PORT`. When it is unset, dev and start use `3000`. Compose publishes that same port. After `next build`, the image runs `obfuscate-hogoshi .next`. Local `pnpm dev` stays readable. Set `HUGEICONS_NPM_TOKEN` before the image build. In Dokploy, set `PORT` and point the domain at that container port.
