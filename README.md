# Infocus Group — Corporate Web Portal & API

Welcome to the Infocus Group corporate web portal repository. The project is split into a static frontend built with **Eleventy (11ty)** and a lightweight **Node.js/Express.js** backend API.

---

## 📂 Project Structure

```
infocus-site/
├── frontend/             # Frontend application (Eleventy SSG)
│   ├── src/              # Development source files (templates, assets)
│   │   ├── _data/        # Nunjucks template data
│   │   ├── _includes/    # Base layouts & components
│   │   ├── admin/        # Netlify CMS page configuration
│   │   └── ...           # Site pages (index, capabilities, contact)
│   ├── .eleventy.js      # Eleventy compiler configuration
│   └── package.json      # Frontend npm package settings
│
├── backend/              # Backend API service (Express)
│   ├── data/             # Backend mock databases (case studies JSON)
│   ├── server.js         # Express app entrypoint and API routes
│   └── package.json      # Backend npm package settings
│
├── .gitignore            # Git exclusion rules
├── package.json          # Workspace-level script orchestrator
└── README.md             # Project documentation
```

---

## ⚡ Quick Start

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 16 or higher recommended).

### 1. Install Dependencies
You can install dependencies for both the frontend and backend simultaneously from the project root:
```bash
npm run install:all
```

### 2. Start Development Servers
To start the Eleventy development server (which compiles the pages and runs on port `8082`) and the Express API server (which runs on port `5000`) concurrently, run:
```bash
npm run dev
```

---

## 🛠️ CLI Reference

All scripts should be executed from the `infocus-site/` root directory:

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts both frontend and backend concurrently in development mode. |
| `npm run start:frontend` | Starts only the Eleventy development server (re-compiles on save). |
| `npm run start:backend` | Starts only the Express API server. |
| `npm run build` | Builds a production-ready static output inside `frontend/_site`. |
| `npm run install:all` | Installs npm dependencies in both `frontend` and `backend` folders. |

---

## 🔌 API Documentation (Backend)

The backend runs on port `5000` by default and exposes the following endpoints:

### `GET /api/case-studies`
Returns the array of active case studies utilized throughout the website.

- **URL:** `http://localhost:5000/api/case-studies`
- **Method:** `GET`
- **Response Format:** `JSON`

### `POST /api/contact`
Receives contact form submissions from the portal's contact page.

- **URL:** `http://localhost:5000/api/contact`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Body Parameters:**
  ```json
  {
    "name": "Full Name",
    "email": "work-email@domain.com",
    "org": "Organisation Name",
    "role": "Role / Designation",
    "interest": "Sector of interest",
    "message": "Brief description of the challenge/enquiry"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Thank you for your message! Our team will get back to you shortly."
  }
  ```
