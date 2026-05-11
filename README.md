# AMBd2 Studio Portfolio

这是一个基于 Vite + React + Tailwind CSS v4 的静态作品集站点，可直接推送到 GitHub，并部署到 Cloudflare Pages。

## 本地开发

```bash
npm install
npm run dev
```

## 生产构建

```bash
npm run build
```

构建产物输出到 `dist/`。

## 推送到 GitHub

```bash
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin <你的 GitHub 仓库地址>
git push -u origin main
```

## 部署到 Cloudflare Pages

在 Cloudflare Pages 里连接 GitHub 仓库后，使用以下配置：

- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: `20`

如果你只需要静态托管，不需要额外的 Pages Functions 或 Workers 配置。
