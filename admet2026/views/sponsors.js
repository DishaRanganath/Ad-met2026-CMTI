module.exports = function sponsors(d) {
  const cards = d.sponsors.map((s, i) => {
    const img = s.logo
      ? `<img src="${s.logo}" alt="${s.name}" class="sponsor-img">`
      : `<div class="sponsor-logo-placeholder">🏢</div>`;
    return `<div class="sponsor-card">
      <div class="sponsor-level">${s.level}</div>
      ${img}
      ${s.name ? `<div class="sponsor-name">${s.name}</div>` : ''}
    </div>`;
  }).join('');

  return `
<div class="page-inner page-content">
  <h1 class="page-heading">Sponsors</h1>
  <p>We gratefully acknowledge the generous support of our sponsors and technical partners. Sponsorship and exhibition opportunities are available — please contact us for the sponsorship brochure.</p>
  <div class="sponsors-grid">${cards}</div>
  <div class="contact-bar-inline">
    <p>For sponsorship enquiries: <a href="mailto:${d.site.email}">${d.site.email}</a></p>
  </div>
</div>`;
};
