module.exports = function gallery(d) {
  const photos = d.gallery.length
    ? d.gallery.map(g => `
        <div class="gallery-item">
          <img src="${g.path}" alt="${g.caption||'AdMet-2026 Photo'}">
          ${g.caption ? `<div class="gallery-caption">${g.caption}</div>` : ''}
        </div>`).join('')
    : `<div class="gallery-empty"><p>📷 No photos yet. Upload photos from the <a href="/admin?tab=gallery">Admin Panel</a>.</p></div>`;

  return `
<div class="page-inner page-content">
  <h1 class="page-heading">Gallery</h1>
  <div class="gallery-grid">${photos}</div>
  <div class="contact-bar-inline">
    <p>For ${d.site.title} related queries: <a href="mailto:${d.site.email}">${d.site.email}</a></p>
  </div>
</div>`;
};
