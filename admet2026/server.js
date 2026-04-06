const express = require('express');
const multer = require('multer');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'admet2026-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 }
}));

const DATA_FILE = path.join(__dirname, 'data', 'site.json');
function getData() { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); }
function saveData(data) { fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2)); }

// Image upload storage
const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'public', 'images', 'uploads');
    fse.ensureDirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E6) + ext);
  }
});
const upload = multer({
  storage: imgStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only images allowed'));
  },
  limits: { fileSize: 10 * 1024 * 1024 }
});

// PDF/doc upload storage
const docStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'public', 'docs');
    fse.ensureDirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = req.docName || ('doc-' + Date.now());
    cb(null, base + ext);
  }
});
const uploadDoc = multer({
  storage: docStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.originalname.endsWith('.pdf')) cb(null, true);
    else cb(new Error('Only PDF allowed'));
  },
  limits: { fileSize: 20 * 1024 * 1024 }
});

function requireAdmin(req, res, next) {
  if (req.session.admin) return next();
  res.redirect('/admin/login');
}

function renderPage(res, template, d, extra = {}) {
  const html = require('./views/' + template)(d, extra);
  res.send(html);
}

// ── Public Routes ──────────────────────────────────────────────────────────────

app.get('/', (req, res) => {
  const d = getData();
  res.send(require('./views/layout')(d, 'home', require('./views/home')(d)));
});

app.get('/paper-submission', (req, res) => {
  const d = getData();
  res.send(require('./views/layout')(d, 'paper-submission', require('./views/paper-submission')(d)));
});

app.get('/committees', (req, res) => {
  const d = getData();
  res.send(require('./views/layout')(d, 'committees', require('./views/committees')(d)));
});

app.get('/scope', (req, res) => {
  const d = getData();
  res.send(require('./views/layout')(d, 'scope', require('./views/scope')(d)));
});

app.get('/registration', (req, res) => {
  const d = getData();
  res.send(require('./views/layout')(d, 'registration', require('./views/registration')(d)));
});

app.get('/registration/foreign', (req, res) => {
  const d = getData();
  res.send(require('./views/layout')(d, 'registration', require('./views/registration-foreign')(d)));
});

app.get('/abstract-submission', (req, res) => {
  const d = getData();
  res.send(require('./views/layout')(d, 'abstract-submission', require('./views/abstract-submission')(d)));
});

app.get('/workshop', (req, res) => {
  const d = getData();
  res.send(require('./views/layout')(d, 'workshop', require('./views/workshop')(d)));
});

app.get('/sponsors', (req, res) => {
  const d = getData();
  res.send(require('./views/layout')(d, 'sponsors', require('./views/sponsors')(d)));
});

app.get('/gallery', (req, res) => {
  const d = getData();
  res.send(require('./views/layout')(d, 'gallery', require('./views/gallery')(d)));
});

app.get('/venue', (req, res) => {
  const d = getData();
  res.send(require('./views/layout')(d, 'venue', require('./views/venue')(d)));
});

// ── Admin Routes ───────────────────────────────────────────────────────────────

app.get('/admin/login', (req, res) => res.send(require('./views/admin-login')({ error: null })));

app.post('/admin/login', (req, res) => {
  if (req.body.password === 'admet@admin2026') {
    req.session.admin = true;
    res.redirect('/admin');
  } else {
    res.send(require('./views/admin-login')({ error: 'Invalid password' }));
  }
});

app.get('/admin/logout', (req, res) => { req.session.destroy(); res.redirect('/admin/login'); });

app.get('/admin', requireAdmin, (req, res) => {
  res.send(require('./views/admin-dashboard')(getData()));
});

app.post('/admin/site', requireAdmin, (req, res) => {
  const d = getData(); Object.assign(d.site, req.body); saveData(d);
  res.redirect('/admin?saved=site');
});

app.post('/admin/deadlines', requireAdmin, (req, res) => {
  const d = getData();
  const labels = [].concat(req.body.label || []);
  const dates  = [].concat(req.body.date  || []);
  const statuses = [].concat(req.body.status || []);
  d.deadlines = labels.map((l, i) => ({ label: l, date: dates[i], status: statuses[i] }));
  saveData(d); res.redirect('/admin?saved=deadlines');
});

app.post('/admin/home-content', requireAdmin, (req, res) => {
  const d = getData(); Object.assign(d.homeContent, req.body); saveData(d);
  res.redirect('/admin?saved=home');
});

app.post('/admin/scope', requireAdmin, (req, res) => {
  const d = getData();
  d.scope = [].concat(req.body.topic || []).filter(t => t.trim());
  saveData(d); res.redirect('/admin?saved=scope&tab=scope');
});

app.post('/admin/workshop', requireAdmin, (req, res) => {
  const d = getData(); Object.assign(d.workshop, req.body); saveData(d);
  res.redirect('/admin?saved=workshop&tab=workshop');
});

app.post('/admin/venue', requireAdmin, (req, res) => {
  const d = getData(); Object.assign(d.venue, req.body); saveData(d);
  res.redirect('/admin?saved=venue&tab=venue');
});

// Google Form links + early bird note
app.post('/admin/form-links', requireAdmin, (req, res) => {
  const d = getData();
  if (req.body.abstractFormUrl !== undefined) d.abstractFormUrl = req.body.abstractFormUrl;
  if (req.body.registrationFormIndianUrl !== undefined) d.registrationFormIndianUrl = req.body.registrationFormIndianUrl;
  if (req.body.registrationFormForeignUrl !== undefined) d.registrationFormForeignUrl = req.body.registrationFormForeignUrl;
  if (req.body.earlyBirdNote !== undefined) d.registration.earlyBirdNote = req.body.earlyBirdNote;
  saveData(d); res.redirect('/admin?saved=forms&tab=forms');
});

// Hero image upload/delete
app.post('/admin/upload/hero', requireAdmin, upload.single('image'), (req, res) => {
  const d = getData();
  if (req.file) {
    d.heroImages.push({ path: '/images/uploads/' + req.file.filename, caption: req.body.caption || '' });
    saveData(d);
  }
  res.redirect('/admin?saved=hero');
});
app.post('/admin/delete/hero/:idx', requireAdmin, (req, res) => {
  const d = getData(); const idx = parseInt(req.params.idx);
  if (d.heroImages[idx]) {
    const fp = path.join(__dirname, 'public', d.heroImages[idx].path);
    if (fs.existsSync(fp)) fs.unlinkSync(fp);
    d.heroImages.splice(idx, 1); saveData(d);
  }
  res.redirect('/admin?saved=hero');
});

// Banner logo upload/delete
app.post('/admin/upload/banner-logo', requireAdmin, upload.single('image'), (req, res) => {
  const d = getData();
  if (req.file) {
    d.bannerLogos.push({ path: '/images/uploads/' + req.file.filename, alt: req.body.alt || 'Logo' });
    saveData(d);
  }
  res.redirect('/admin?saved=banner');
});
app.post('/admin/delete/banner-logo/:idx', requireAdmin, (req, res) => {
  const d = getData(); const idx = parseInt(req.params.idx);
  if (d.bannerLogos[idx]) {
    const fp = path.join(__dirname, 'public', d.bannerLogos[idx].path);
    if (fs.existsSync(fp)) fs.unlinkSync(fp);
    d.bannerLogos.splice(idx, 1); saveData(d);
  }
  res.redirect('/admin?saved=banner');
});

// Committee photo/info
app.post('/admin/upload/committee/:idx', requireAdmin, upload.single('image'), (req, res) => {
  const d = getData(); const idx = parseInt(req.params.idx);
  if (req.file && d.committeeRoles[idx]) {
    if (d.committeeRoles[idx].photo) {
      const old = path.join(__dirname, 'public', d.committeeRoles[idx].photo);
      if (fs.existsSync(old)) fs.unlinkSync(old);
    }
    d.committeeRoles[idx].photo = '/images/uploads/' + req.file.filename;
    saveData(d);
  }
  res.redirect('/admin?saved=committee&tab=committee');
});
app.post('/admin/committee/:idx', requireAdmin, (req, res) => {
  const d = getData(); const idx = parseInt(req.params.idx);
  if (d.committeeRoles[idx]) {
    d.committeeRoles[idx].name = req.body.name;
    d.committeeRoles[idx].role = req.body.role;
    d.committeeRoles[idx].title = req.body.title;
    saveData(d);
  }
  res.redirect('/admin?saved=committee&tab=committee');
});
app.post('/admin/committee/add', requireAdmin, (req, res) => {
  const d = getData();
  d.committeeRoles.push({ name: req.body.name || 'New Member', role: req.body.role || 'Member', title: req.body.title || '', photo: '' });
  saveData(d); res.redirect('/admin?saved=committee&tab=committee');
});
app.post('/admin/committee/delete/:idx', requireAdmin, (req, res) => {
  const d = getData(); const idx = parseInt(req.params.idx);
  if (d.committeeRoles[idx]) {
    if (d.committeeRoles[idx].photo) {
      const fp = path.join(__dirname, 'public', d.committeeRoles[idx].photo);
      if (fs.existsSync(fp)) fs.unlinkSync(fp);
    }
    d.committeeRoles.splice(idx, 1); saveData(d);
  }
  res.redirect('/admin?saved=committee&tab=committee');
});

// Gallery
app.post('/admin/upload/gallery', requireAdmin, upload.single('image'), (req, res) => {
  const d = getData();
  if (req.file) {
    d.gallery.push({ path: '/images/uploads/' + req.file.filename, caption: req.body.caption || '' });
    saveData(d);
  }
  res.redirect('/admin?saved=gallery&tab=gallery');
});
app.post('/admin/delete/gallery/:idx', requireAdmin, (req, res) => {
  const d = getData(); const idx = parseInt(req.params.idx);
  if (d.gallery[idx]) {
    const fp = path.join(__dirname, 'public', d.gallery[idx].path);
    if (fs.existsSync(fp)) fs.unlinkSync(fp);
    d.gallery.splice(idx, 1); saveData(d);
  }
  res.redirect('/admin?saved=gallery&tab=gallery');
});

// Sponsor logo
app.post('/admin/upload/sponsor/:idx', requireAdmin, upload.single('image'), (req, res) => {
  const d = getData(); const idx = parseInt(req.params.idx);
  if (req.file && d.sponsors[idx]) {
    d.sponsors[idx].logo = '/images/uploads/' + req.file.filename;
    saveData(d);
  }
  res.redirect('/admin?saved=sponsor&tab=sponsors');
});

// Brochure PDF upload
app.post('/admin/upload/brochure', requireAdmin, (req, res, next) => {
  req.docName = 'brochure';
  next();
}, uploadDoc.single('doc'), (req, res) => {
  const d = getData();
  if (req.file) { d.brochure = '/docs/' + req.file.filename; saveData(d); }
  res.redirect('/admin?saved=docs&tab=docs');
});

// Second Circular PDF upload
app.post('/admin/upload/second-circular', requireAdmin, (req, res, next) => {
  req.docName = 'second-circular';
  next();
}, uploadDoc.single('doc'), (req, res) => {
  const d = getData();
  if (req.file) { d.secondCircular = '/docs/' + req.file.filename; saveData(d); }
  res.redirect('/admin?saved=docs&tab=docs');
});

app.listen(PORT, () => {
  console.log(`✅ AdMet-2026 server running at http://localhost:${PORT}`);
  console.log(`🔐 Admin panel: http://localhost:${PORT}/admin (password: admet@admin2026)`);
});
