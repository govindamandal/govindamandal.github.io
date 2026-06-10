# Govinda Mandal Portfolio

Dynamic portfolio and admin panel deployed to GitHub Pages.

## Local Development

```bash
npm install
npm run dev
```

Create `.env` from `.env.example` and set:

```bash
VITE_API_URL=https://your-vercel-api.vercel.app
```

## Routes

- `#/` public portfolio
- `#/admin` admin dashboard
- `#/admin/projects`
- `#/admin/experiences`
- `#/admin/skills`
- `#/admin/certifications`
- `#/admin/courses`
- `#/admin/testimonials`
- `#/admin/profile`
- `#/admin/siteSettings`

## Deployment

The `.github/workflows/pages.yml` workflow builds `dist/` and deploys it to GitHub Pages on every push to `main`.
