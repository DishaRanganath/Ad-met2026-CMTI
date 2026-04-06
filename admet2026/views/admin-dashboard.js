module.exports = function adminDashboard(d) {

  function thumb(src, size='60px') {
    return src
      ? `<img src="${src}" style="width:${size};height:${size};object-fit:cover;border-radius:6px;border:1px solid #ddd;">`
      : `<div style="width:${size};height:${size};background:#e8f0fe;border-radius:6px;border:1px dashed #99b;display:flex;align-items:center;justify-content:center;font-size:11px;color:#999">No img</div>`;
  }

  const heroRows = d.heroImages.map((img, i) => `
    <tr>
      <td>${thumb(img.path,'56px')}</td>
      <td>${img.caption||'—'}</td>
      <td>
        <form method="POST" action="/admin/delete/hero/${i}" onsubmit="return confirm('Delete this image?')">
          <button class="btn-del">✕ Delete</button>
        </form>
      </td>
    </tr>`).join('') || `<tr><td colspan="3" style="color:#999;font-style:italic">No hero images uploaded yet.</td></tr>`;

  const bannerRows = d.bannerLogos.map((l, i) => `
    <tr>
      <td>${thumb(l.path,'56px')}</td>
      <td>${l.alt}</td>
      <td>
        <form method="POST" action="/admin/delete/banner-logo/${i}" onsubmit="return confirm('Delete?')">
          <button class="btn-del">✕ Delete</button>
        </form>
      </td>
    </tr>`).join('') || `<tr><td colspan="3" style="color:#999;font-style:italic">No logos uploaded yet.</td></tr>`;

  const commRows = d.committeeRoles.map((m, i) => `
    <tr>
      <td>${thumb(m.photo,'48px')}</td>
      <td>
        <form method="POST" action="/admin/upload/committee/${i}" enctype="multipart/form-data" style="display:inline">
          <input type="file" name="image" accept="image/*" onchange="this.form.submit()" style="font-size:12px;width:140px">
        </form>
      </td>
      <td>
        <form method="POST" action="/admin/committee/${i}" class="inline-edit-form">
          <input class="ei" name="name" value="${m.name}" placeholder="Name">
          <input class="ei" name="role" value="${m.role}" placeholder="Role">
          <input class="ei" name="title" value="${m.title||''}" placeholder="Title/Designation">
          <button class="btn-save">💾 Save</button>
        </form>
      </td>
      <td>
        <form method="POST" action="/admin/committee/delete/${i}" onsubmit="return confirm('Remove member?')">
          <button class="btn-del">✕</button>
        </form>
      </td>
    </tr>`).join('');

  const galleryCards = d.gallery.map((g, i) => `
    <div class="gallery-admin-card">
      <img src="${g.path}" alt="${g.caption||''}">
      <div class="gac-cap">${g.caption||'No caption'}</div>
      <form method="POST" action="/admin/delete/gallery/${i}" onsubmit="return confirm('Delete photo?')">
        <button class="btn-del" style="width:100%">✕ Delete</button>
      </form>
    </div>`).join('') || `<p style="color:#999;font-style:italic">No gallery photos yet.</p>`;

  const sponsorRows = d.sponsors.map((s, i) => `
    <tr>
      <td>${s.level}</td>
      <td>${s.name}</td>
      <td>${thumb(s.logo,'48px')}</td>
      <td>
        <form method="POST" action="/admin/upload/sponsor/${i}" enctype="multipart/form-data" style="display:inline">
          <input type="file" name="image" accept="image/*" onchange="this.form.submit()" style="font-size:12px;width:140px">
        </form>
      </td>
    </tr>`).join('');

  const scopeInputs = d.scope.map((t, i) => `
    <div class="scope-row">
      <input class="ei" name="topic" value="${t}" style="width:calc(100% - 32px)">
      <button type="button" onclick="this.parentElement.remove()" class="btn-del" style="padding:4px 8px">✕</button>
    </div>`).join('');

  const deadlineInputs = d.deadlines.map((dl, i) => `
    <tr>
      <td><input class="ei" name="label" value="${dl.label}" style="width:100%"></td>
      <td><input class="ei" name="date" value="${dl.date}" style="width:140px"></td>
      <td>
        <select name="status" class="ei">
          <option ${dl.status==='Open'?'selected':''}>Open</option>
          <option ${dl.status==='Closed'?'selected':''}>Closed</option>
          <option ${dl.status==='Upcoming'?'selected':''}>Upcoming</option>
          <option ${dl.status==='Submitted'?'selected':''}>Submitted</option>
        </select>
      </td>
    </tr>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Admin Dashboard – AdMet-2026</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Segoe UI',sans-serif;background:#f0f4f8;color:#222;font-size:14px}
  .admin-topbar{background:#0a2a4a;color:#fff;padding:12px 24px;display:flex;align-items:center;justify-content:space-between}
  .admin-topbar h1{font-size:18px;font-weight:700}
  .admin-topbar a{color:#9dc8f0;text-decoration:none;font-size:13px}
  .admin-topbar a:hover{color:#fff}
  .admin-body{display:flex;min-height:calc(100vh - 48px)}
  .admin-sidebar{width:200px;background:#162d5e;flex-shrink:0;padding:16px 0}
  .admin-sidebar a{display:block;padding:11px 20px;color:#aac8f0;text-decoration:none;font-size:13.5px;border-left:3px solid transparent;transition:.15s}
  .admin-sidebar a:hover,.admin-sidebar a.active{background:rgba(255,255,255,.08);color:#fff;border-left-color:#c8a000}
  .admin-sidebar .sep{padding:8px 20px;font-size:11px;color:#6a88b0;text-transform:uppercase;letter-spacing:1px;margin-top:8px}
  .admin-content{flex:1;padding:28px;overflow-y:auto}
  .a-card{background:#fff;border-radius:10px;padding:24px;margin-bottom:24px;box-shadow:0 1px 6px rgba(0,0,0,.07)}
  .a-card h2{font-size:15px;font-weight:700;color:#0a2a4a;margin-bottom:16px;padding-bottom:10px;border-bottom:2px solid #e8f0fe}
  .a-card h3{font-size:13px;font-weight:700;color:#1a6040;margin:14px 0 8px}
  .ei{padding:7px 10px;border:1.5px solid #cdd6e8;border-radius:5px;font-size:13px;outline:none;transition:border .15s}
  .ei:focus{border-color:#0a2a4a}
  .form-row{display:flex;gap:10px;margin-bottom:10px;flex-wrap:wrap;align-items:center}
  .form-row label{font-size:12px;font-weight:600;color:#555;min-width:130px}
  textarea.ei{width:100%;min-height:90px;resize:vertical;font-size:13px}
  .btn-save{background:#0a2a4a;color:#fff;border:none;padding:8px 16px;border-radius:5px;cursor:pointer;font-size:13px;font-weight:600;transition:background .15s}
  .btn-save:hover{background:#1a3a6a}
  .btn-del{background:#fef2f2;color:#b91c1c;border:1px solid #fca5a5;padding:6px 10px;border-radius:5px;cursor:pointer;font-size:12px;transition:.15s}
  .btn-del:hover{background:#fee2e2}
  .btn-add{background:#c8a000;color:#fff;border:none;padding:8px 16px;border-radius:5px;cursor:pointer;font-size:13px;font-weight:600;transition:background .15s}
  .btn-add:hover{background:#a07800}
  .btn-upload{background:#059669;color:#fff;border:none;padding:8px 14px;border-radius:5px;cursor:pointer;font-size:13px;font-weight:600}
  .btn-upload:hover{background:#047857}
  .a-table{width:100%;border-collapse:collapse;font-size:13px}
  .a-table th{background:#e8f0fe;color:#0a2a4a;padding:9px 12px;text-align:left;font-size:12px;text-transform:uppercase;letter-spacing:.4px}
  .a-table td{padding:9px 12px;border-bottom:1px solid #f0f4f8;vertical-align:middle}
  .a-table tr:last-child td{border-bottom:none}
  .a-table tr:hover td{background:#f7fbff}
  .inline-edit-form{display:flex;gap:6px;flex-wrap:wrap;align-items:center}
  .inline-edit-form .ei{padding:5px 8px;font-size:12px}
  .gallery-admin-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:14px;margin-top:12px}
  .gallery-admin-card{background:#f8f9fa;border:1px solid #dde;border-radius:8px;overflow:hidden;text-align:center}
  .gallery-admin-card img{width:100%;height:120px;object-fit:cover}
  .gac-cap{font-size:12px;padding:6px;color:#555;border-top:1px solid #eee}
  .scope-row{display:flex;gap:8px;margin-bottom:8px;align-items:center}
  .toast{position:fixed;top:60px;right:20px;background:#059669;color:#fff;padding:12px 20px;border-radius:8px;font-size:14px;font-weight:600;z-index:9999;box-shadow:0 4px 16px rgba(0,0,0,.2);animation:slideIn .3s ease}
  @keyframes slideIn{from{transform:translateX(100px);opacity:0}to{transform:translateX(0);opacity:1}}
  .tab-section{display:none}.tab-section.show{display:block}
  .url-display{font-size:12px;color:#666;margin-top:4px;word-break:break-all}
  .current-file{background:#e8f4e8;border:1px solid #b2d8b2;border-radius:5px;padding:8px 12px;font-size:12px;margin-bottom:8px;color:#1a5f1a}
</style>
</head>
<body>

<div class="admin-topbar">
  <h1>⚙ AdMet-2026 — Admin Panel</h1>
  <div>
    <a href="/" target="_blank">🌐 View Website</a>
    &nbsp;&nbsp;
    <a href="/admin/logout">🔒 Logout</a>
  </div>
</div>

<div class="admin-body">

<nav class="admin-sidebar">
  <div class="sep">Content</div>
  <a href="#" onclick="showTab('site')" id="tab-link-site">🏛 Site Info</a>
  <a href="#" onclick="showTab('home')" id="tab-link-home">🏠 Home Content</a>
  <a href="#" onclick="showTab('deadlines')" id="tab-link-deadlines">📅 Deadlines</a>
  <a href="#" onclick="showTab('scope')" id="tab-link-scope">🎯 Scope / Topics</a>
  <a href="#" onclick="showTab('workshop')" id="tab-link-workshop">🔬 Workshop</a>
  <a href="#" onclick="showTab('venue')" id="tab-link-venue">📍 Venue</a>
  <a href="#" onclick="showTab('forms')" id="tab-link-forms">📋 Forms &amp; Links</a>
  <a href="#" onclick="showTab('docs')" id="tab-link-docs">📁 Brochure / Circulars</a>
  <div class="sep">Photos</div>
  <a href="#" onclick="showTab('hero')" id="tab-link-hero">🖼 Hero Images</a>
  <a href="#" onclick="showTab('banner')" id="tab-link-banner">🏷 Header Logos</a>
  <a href="#" onclick="showTab('committee')" id="tab-link-committee">👥 Committee</a>
  <a href="#" onclick="showTab('gallery')" id="tab-link-gallery">📷 Gallery</a>
  <a href="#" onclick="showTab('sponsors')" id="tab-link-sponsors">🤝 Sponsors</a>
</nav>

<div class="admin-content">

<!-- SITE INFO -->
<div class="tab-section" id="tab-site">
  <div class="a-card">
    <h2>🏛 Site Information</h2>
    <form method="POST" action="/admin/site">
      <div class="form-row"><label>Short Title</label><input class="ei" name="title" value="${d.site.title}" style="width:200px"></div>
      <div class="form-row"><label>Full Title</label><input class="ei" name="fullTitle" value="${d.site.fullTitle}" style="width:500px"></div>
      <div class="form-row"><label>Subtitle</label><input class="ei" name="subtitle" value="${d.site.subtitle}" style="width:400px"></div>
      <div class="form-row"><label>Dates</label><input class="ei" name="dates" value="${d.site.dates}" style="width:250px"></div>
      <div class="form-row"><label>Edition</label><input class="ei" name="edition" value="${d.site.edition}" style="width:100px"></div>
      <div class="form-row"><label>Organizer</label><input class="ei" name="organizer" value="${d.site.organizer}" style="width:500px"></div>
      <div class="form-row"><label>Primary Email</label><input class="ei" name="email" value="${d.site.email}" style="width:300px"></div>
      <div class="form-row"><label>Alt Email</label><input class="ei" name="altEmail" value="${d.site.altEmail}" style="width:300px"></div>
      <div class="form-row"><label>Phone 1</label><input class="ei" name="phone" value="${d.site.phone}" style="width:200px"></div>
      <div class="form-row"><label>Phone 2</label><input class="ei" name="phone2" value="${d.site.phone2}" style="width:200px"></div>
      <button type="submit" class="btn-save">💾 Save Site Info</button>
    </form>
  </div>
</div>

<!-- HOME CONTENT -->
<div class="tab-section" id="tab-home">
  <div class="a-card">
    <h2>🏠 Home Page Content</h2>
    <form method="POST" action="/admin/home-content">
      <div class="form-row" style="flex-direction:column;align-items:flex-start">
        <label>Intro Paragraph (bold text)</label>
        <textarea class="ei" name="intro" rows="3">${d.homeContent.intro||''}</textarea>
      </div>
      <div class="form-row" style="flex-direction:column;align-items:flex-start">
        <label>Main Body (separate paragraphs with blank line)</label>
        <textarea class="ei" name="body" rows="12">${d.homeContent.body||''}</textarea>
      </div>
      <div class="form-row" style="flex-direction:column;align-items:flex-start">
        <label>Venue Description</label>
        <textarea class="ei" name="venueDescription" rows="4">${d.homeContent.venueDescription||''}</textarea>
      </div>
      <button type="submit" class="btn-save">💾 Save Home Content</button>
    </form>
  </div>
</div>

<!-- DEADLINES -->
<div class="tab-section" id="tab-deadlines">
  <div class="a-card">
    <h2>📅 Important Deadlines</h2>
    <form method="POST" action="/admin/deadlines">
      <table class="a-table" style="margin-bottom:14px">
        <thead><tr><th>Label</th><th>Date</th><th>Status</th></tr></thead>
        <tbody id="deadline-body">${deadlineInputs}</tbody>
      </table>
      <button type="submit" class="btn-save">💾 Save Deadlines</button>
    </form>
  </div>
</div>

<!-- SCOPE -->
<div class="tab-section" id="tab-scope">
  <div class="a-card">
    <h2>🎯 Conference Scope / Topics</h2>
    <form method="POST" action="/admin/scope" id="scope-form">
      <div id="scope-items">${scopeInputs}</div>
      <button type="button" onclick="addScope()" class="btn-add" style="margin:10px 0">+ Add Topic</button>
      <br>
      <button type="submit" class="btn-save">💾 Save Topics</button>
    </form>
  </div>
</div>

<!-- WORKSHOP -->
<div class="tab-section" id="tab-workshop">
  <div class="a-card">
    <h2>🔬 Workshop Details</h2>
    <form method="POST" action="/admin/workshop">
      <div class="form-row"><label>Workshop Title</label><input class="ei" name="title" value="${d.workshop.title||''}" style="width:400px"></div>
      <div class="form-row"><label>Date</label><input class="ei" name="date" value="${d.workshop.date||''}" style="width:250px"></div>
      <div class="form-row"><label>Theme</label><input class="ei" name="theme" value="${d.workshop.theme||''}" style="width:450px"></div>
      <div class="form-row" style="flex-direction:column;align-items:flex-start">
        <label>Description</label>
        <textarea class="ei" name="description" rows="5">${d.workshop.description||''}</textarea>
      </div>
      <button type="submit" class="btn-save">💾 Save Workshop</button>
    </form>
  </div>
</div>

<!-- VENUE -->
<div class="tab-section" id="tab-venue">
  <div class="a-card">
    <h2>📍 Venue Details</h2>
    <form method="POST" action="/admin/venue">
      <div class="form-row"><label>Venue Name</label><input class="ei" name="name" value="${d.venue.name||''}" style="width:450px"></div>
      <div class="form-row"><label>Address</label><input class="ei" name="address" value="${d.venue.address||''}" style="width:450px"></div>
      <div class="form-row"><label>Website</label><input class="ei" name="website" value="${d.venue.website||''}" style="width:350px"></div>
      <button type="submit" class="btn-save">💾 Save Venue</button>
    </form>
  </div>
</div>

<!-- FORMS & LINKS -->
<div class="tab-section" id="tab-forms">
  <div class="a-card">
    <h2>📋 Google Form Links</h2>
    <p style="font-size:13px;color:#666;margin-bottom:16px">Paste the Google Form sharing URLs here. These will be used as redirect links on the Abstract Submission and Registration pages.</p>
    <form method="POST" action="/admin/form-links">
      <div class="form-row" style="flex-direction:column;align-items:flex-start">
        <label>Abstract Submission Form URL</label>
        <input class="ei" name="abstractFormUrl" value="${d.abstractFormUrl||''}" placeholder="https://docs.google.com/forms/d/e/..." style="width:600px">
        ${d.abstractFormUrl ? `<div class="url-display">Current: <a href="${d.abstractFormUrl}" target="_blank">${d.abstractFormUrl}</a></div>` : ''}
      </div>
      <div class="form-row" style="flex-direction:column;align-items:flex-start;margin-top:12px">
        <label>Indian Registration Form URL</label>
        <input class="ei" name="registrationFormIndianUrl" value="${d.registrationFormIndianUrl||''}" placeholder="https://docs.google.com/forms/d/e/..." style="width:600px">
        ${d.registrationFormIndianUrl ? `<div class="url-display">Current: <a href="${d.registrationFormIndianUrl}" target="_blank">${d.registrationFormIndianUrl}</a></div>` : ''}
      </div>
      <div class="form-row" style="flex-direction:column;align-items:flex-start;margin-top:12px">
        <label>Foreign Registration Form URL</label>
        <input class="ei" name="registrationFormForeignUrl" value="${d.registrationFormForeignUrl||''}" placeholder="https://docs.google.com/forms/d/e/..." style="width:600px">
        ${d.registrationFormForeignUrl ? `<div class="url-display">Current: <a href="${d.registrationFormForeignUrl}" target="_blank">${d.registrationFormForeignUrl}</a></div>` : ''}
      </div>
      <div class="form-row" style="flex-direction:column;align-items:flex-start;margin-top:12px">
        <label>Early Bird Registration Note</label>
        <input class="ei" name="earlyBirdNote" value="${(d.registration&&d.registration.earlyBirdNote)||''}" placeholder="e.g. Early bird Registration Extended till September 8, 2026" style="width:600px">
      </div>
      <button type="submit" class="btn-save" style="margin-top:16px">💾 Save Form Links</button>
    </form>
  </div>
</div>

<!-- BROCHURE / CIRCULARS -->
<div class="tab-section" id="tab-docs">
  <div class="a-card">
    <h2>📁 Brochure &amp; Circulars</h2>
    <p style="font-size:13px;color:#666;margin-bottom:16px">Upload PDF files for the brochure and second circular. These will be downloadable from the Home page.</p>

    <h3>Brochure (PDF)</h3>
    ${d.brochure ? `<div class="current-file">✅ Current file: <a href="${d.brochure}" target="_blank">${d.brochure}</a></div>` : '<p style="font-size:13px;color:#999;margin-bottom:8px">No brochure uploaded yet.</p>'}
    <form method="POST" action="/admin/upload/brochure" enctype="multipart/form-data" style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:20px">
      <input type="file" name="doc" accept=".pdf" required class="ei">
      <button type="submit" class="btn-upload">⬆ Upload Brochure PDF</button>
    </form>

    <h3>Second Circular (PDF)</h3>
    ${d.secondCircular ? `<div class="current-file">✅ Current file: <a href="${d.secondCircular}" target="_blank">${d.secondCircular}</a></div>` : '<p style="font-size:13px;color:#999;margin-bottom:8px">No second circular uploaded yet.</p>'}
    <form method="POST" action="/admin/upload/second-circular" enctype="multipart/form-data" style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
      <input type="file" name="doc" accept=".pdf" required class="ei">
      <button type="submit" class="btn-upload">⬆ Upload Second Circular PDF</button>
    </form>
  </div>
</div>

<!-- HERO IMAGES -->
<div class="tab-section" id="tab-hero">
  <div class="a-card">
    <h2>🖼 Hero / Slideshow Images</h2>
    <p style="font-size:13px;color:#666;margin-bottom:14px">These images appear as a slideshow at the top of every page. Recommended size: 1280×480px.</p>
    <form method="POST" action="/admin/upload/hero" enctype="multipart/form-data" style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:16px">
      <input type="file" name="image" accept="image/*" required class="ei">
      <input class="ei" name="caption" placeholder="Caption (optional)" style="width:240px">
      <button type="submit" class="btn-upload">⬆ Upload Hero Image</button>
    </form>
    <table class="a-table">
      <thead><tr><th>Preview</th><th>Caption</th><th>Action</th></tr></thead>
      <tbody>${heroRows}</tbody>
    </table>
  </div>
</div>

<!-- BANNER LOGOS -->
<div class="tab-section" id="tab-banner">
  <div class="a-card">
    <h2>🏷 Header / Banner Logos</h2>
    <p style="font-size:13px;color:#666;margin-bottom:14px">Upload the MSI logo, CSIR-NPL logo, and partner logos that appear in the header banner.</p>
    <form method="POST" action="/admin/upload/banner-logo" enctype="multipart/form-data" style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:16px">
      <input type="file" name="image" accept="image/*" required class="ei">
      <input class="ei" name="alt" placeholder="Logo name (e.g. CSIR-NPL Logo)" style="width:220px">
      <button type="submit" class="btn-upload">⬆ Upload Logo</button>
    </form>
    <table class="a-table">
      <thead><tr><th>Preview</th><th>Name / Alt Text</th><th>Action</th></tr></thead>
      <tbody>${bannerRows}</tbody>
    </table>
  </div>
</div>

<!-- COMMITTEE -->
<div class="tab-section" id="tab-committee">
  <div class="a-card">
    <h2>👥 Organizing Committee Photos &amp; Info</h2>
    <p style="font-size:13px;color:#666;margin-bottom:14px">Upload individual profile photos and edit names/roles. Photo upload is instant.</p>
    <div style="overflow-x:auto">
    <table class="a-table">
      <thead><tr><th>Photo</th><th>Upload Photo</th><th>Name / Role / Title</th><th>Del</th></tr></thead>
      <tbody>${commRows}</tbody>
    </table>
    </div>
    <h3 style="margin-top:20px">Add New Committee Member</h3>
    <form method="POST" action="/admin/committee/add" style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
      <input class="ei" name="name" placeholder="Dr. Full Name" style="width:200px">
      <input class="ei" name="role" placeholder="Role (e.g. Convener)" style="width:180px">
      <input class="ei" name="title" placeholder="Designation / Organisation" style="width:260px">
      <button type="submit" class="btn-add">+ Add Member</button>
    </form>
  </div>
</div>

<!-- GALLERY -->
<div class="tab-section" id="tab-gallery">
  <div class="a-card">
    <h2>📷 Photo Gallery</h2>
    <form method="POST" action="/admin/upload/gallery" enctype="multipart/form-data" style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:16px">
      <input type="file" name="image" accept="image/*" required class="ei">
      <input class="ei" name="caption" placeholder="Photo caption (optional)" style="width:260px">
      <button type="submit" class="btn-upload">⬆ Upload Photo</button>
    </form>
    <div class="gallery-admin-grid">${galleryCards}</div>
  </div>
</div>

<!-- SPONSORS -->
<div class="tab-section" id="tab-sponsors">
  <div class="a-card">
    <h2>🤝 Sponsor Logos</h2>
    <p style="font-size:13px;color:#666;margin-bottom:14px">Upload logos for each sponsor. Sponsor logos also appear in the website footer. File select triggers auto-upload.</p>
    <table class="a-table">
      <thead><tr><th>Level</th><th>Name</th><th>Current Logo</th><th>Upload New Logo</th></tr></thead>
      <tbody>${sponsorRows}</tbody>
    </table>
  </div>
</div>

</div>
</div>

<script>
function showTab(name) {
  document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('show'));
  document.querySelectorAll('.admin-sidebar a').forEach(a => a.classList.remove('active'));
  const el = document.getElementById('tab-' + name);
  if (el) el.classList.add('show');
  const link = document.getElementById('tab-link-' + name);
  if (link) link.classList.add('active');
  localStorage.setItem('admet-admin-tab', name);
  return false;
}

function addScope() {
  const container = document.getElementById('scope-items');
  const div = document.createElement('div');
  div.className = 'scope-row';
  div.innerHTML = '<input class="ei" name="topic" placeholder="New topic..." style="width:calc(100% - 32px)">' +
    '<button type="button" onclick="this.parentElement.remove()" class="btn-del" style="padding:4px 8px">✕</button>';
  container.appendChild(div);
  div.querySelector('input').focus();
}

const params = new URLSearchParams(window.location.search);
if (params.get('saved')) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = '✅ Saved successfully!';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

window.addEventListener('DOMContentLoaded', () => {
  const urlTab = params.get('tab');
  const stored = localStorage.getItem('admet-admin-tab');
  showTab(urlTab || stored || 'hero');
});
</script>
</body>
</html>`;
};
