# storybook

Gallery of `@hogoshi/ui`. https://github.com/zhogoshi/storybook

```bash
pnpm install
pnpm dev
```

http://localhost:3000

Routes: `/`, `/tokens`, `/components/[slug]`.

```bash
PORT=3010 docker compose up --build
```

`PORT` defaults to `3000`. The image build needs `HUGEICONS_NPM_TOKEN`. Push to `main` redeploys. `node scripts/deploy.mjs storybook` does the same.
