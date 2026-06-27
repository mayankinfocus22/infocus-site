# Infocus Group Website

Corporate website for Infocus Group, an Australian technology consultancy focused on strategy, transformation, delivery, data, AI, integration, cyber security, and change adoption.

The site is a static frontend built with Eleventy (11ty). It uses Nunjucks templates, shared JSON content, Netlify CMS configuration, and a lightweight JavaScript layer for navigation, reveal effects, and contact form behavior.

## Site Pages

- Home
- Capabilities
- Data & Integration
- Change & Adoption
- Sectors
- Methodology
- About
- Contact
- 404

## Project Structure

```text
infocus-site/
|-- frontend/
|   |-- admin/              # Netlify CMS admin entry and config
|   |-- src/
|   |   |-- _data/          # Shared site data
|   |   |-- _includes/      # Base layout
|   |   |-- 404.html
|   |   |-- about.html
|   |   |-- capabilities.html
|   |   |-- change-adoption.html
|   |   |-- contact.html
|   |   |-- data-integration.html
|   |   |-- index.html
|   |   |-- main.js
|   |   |-- methodology.html
|   |   |-- sectors.html
|   |   `-- styles.css
|   |-- .eleventy.js        # Eleventy configuration
|   |-- netlify.toml        # Netlify publish settings
|   |-- package-lock.json
|   `-- package.json
|-- package-lock.json
|-- package.json            # Root convenience scripts
`-- README.md
```

## Requirements

- Node.js 16 or newer
- npm

## Setup

Install dependencies from the repository root:

```bash
npm run install:all
```

This installs the frontend dependencies under `frontend/`.

## Development

Start the local Eleventy development server:

```bash
npm run dev
```

The site will be available at:

```text
http://localhost:8080/
```

Eleventy watches the frontend source files and rebuilds the static output into `frontend/_site`.

## Build

Create a production build:

```bash
npm run build --prefix frontend
```

The built files are generated in:

```text
frontend/_site/
```

## Scripts

Run commands from the repository root unless noted otherwise.

| Script | Description |
| --- | --- |
| `npm run dev` | Starts the Eleventy dev server from `frontend/`. |
| `npm start` | Same as `npm run dev`; starts the frontend site. |
| `npm run install:all` | Installs frontend dependencies. |
| `npm run build --prefix frontend` | Builds the static production site into `frontend/_site`. |

## Content

Shared company details, contact information, hero copy, metrics, and CTA copy live in:

```text
frontend/src/_data/site.json
```

Page templates live directly in:

```text
frontend/src/
```

The global layout is:

```text
frontend/src/_includes/base.html
```

## Styling and Interactions

- Global styles: `frontend/src/styles.css`
- Frontend JavaScript: `frontend/src/main.js`
- Fonts: Google Fonts (`Playfair Display` and `Inter`)
- Primary theme: dark navy, teal, gold, paper, and white

## Deployment

The site includes Netlify configuration:

```text
frontend/netlify.toml
```

The expected static publish output is:

```text
frontend/_site
```

## Notes

- The current application is frontend-only.
- There is no active backend API required to run the site.
- Generated folders such as `node_modules/` and `frontend/_site/` should not be committed.
