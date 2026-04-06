# CMTI Conference Website
## Full-Stack Node.js Application — Based on AdMet 2025 Template

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
node server.js
```

### 3. Open the Website
- **Public site:** http://localhost:3000
- **Admin panel:** http://localhost:3000/admin
- **Admin password:** `cmti@admin2025`  ← **Change this in server.js before going live!**

---

## 📁 Project Structure

```
cmti-conference/
├── server.js              ← Main Express backend (routes, uploads, admin API)
├── data/
│   └── site.json          ← All site content (edit here or via Admin Panel)
├── views/
│   ├── layout.js          ← Shared header / nav / footer
│   ├── home.js            ← Home page
│   ├── committees.js      ← Committees page
│   ├── scope.js           ← Scope & Topics
│   ├── paper-submission.js
│   ├── registration.js    ← Indian participants
│   ├── registration-foreign.js
│   ├── abstract-submission.js
│   ├── workshop.js
│   ├── gallery.js
│   ├── venue.js
│   ├── sponsors.js
│   ├── admin-login.js     ← Admin login page
│   └── admin-dashboard.js ← Full admin panel
├── public/
│   ├── css/style.css      ← All styles
│   ├── js/main.js         ← Slideshow + mobile nav
│   └── images/
│       └── uploads/       ← All uploaded photos stored here
└── package.json
```

---

## 🖼 How to Add CMTI Photos (Admin Panel)

1. Go to http://localhost:3000/admin
2. Login with password: `cmti@admin2025`
3. Use the sidebar to navigate sections:

| Section | What it does |
|---|---|
| **Header Logos** | Upload CMTI logo + Ministry logos for the header banner |
| **Hero Images** | Upload large banner images (1280×480px recommended) — replaces the blue placeholder |
| **Committee** | Upload individual profile photos for each committee member |
| **Gallery** | Upload conference/campus photos for the Gallery page |
| **Sponsors** | Upload sponsor logos |

---

## ✏️ How to Edit Content

All text content can be edited via the Admin Panel:
- **Site Info** — title, dates, email, phone
- **Home Content** — intro text, body paragraphs, venue description
- **Deadlines** — important dates with status badges
- **Scope/Topics** — add/remove/edit conference topics
- **Workshop** — workshop title, date, theme, description
- **Venue** — venue name, address, website

Alternatively, edit `data/site.json` directly and restart the server.

---

## 🔐 Security (Before Going Live)

1. Change admin password in `server.js` line:
   ```js
   if (password === 'cmti@admin2025') {
   ```
   Replace `cmti@admin2025` with a strong password.

2. Set a strong session secret:
   ```js
   secret: 'cmti-conference-secret-2025',
   ```

3. Use HTTPS in production (nginx reverse proxy recommended).

---

## 📋 Pages Included (matching AdMet 2025)

| URL | Page |
|---|---|
| `/` | Home |
| `/paper-submission` | Paper Submission |
| `/committees` | Committees |
| `/scope` | Scope |
| `/registration` | Registration (Indian) |
| `/registration/foreign` | Registration (Foreign) |
| `/abstract-submission` | Abstract Submission |
| `/workshop` | Workshop |
| `/sponsors` | Sponsors |
| `/gallery` | Gallery |
| `/venue` | Venue |
| `/admin` | Admin Dashboard |

---

## 💡 Customization Tips

- Replace placeholder committee member names in `data/site.json` → `committeeRoles`
- Add real registration fees under `data/site.json` → `registration.indianFees`
- Update bank payment details under `registration.payment`
- Add venue highlights under `homeContent.venueHighlights`

---

*Built as a 1:1 template of AdMet 2025 (sites.google.com/view/admet2025) for CMTI, Bengaluru.*
