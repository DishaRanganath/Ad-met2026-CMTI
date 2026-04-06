// committees.js
module.exports = function committees(d) {
  const roles = d.committeeRoles.map(m => {
    const initials = m.name.replace(/Dr\.\s?|Prof\.\s?/g,'').split(' ').map(w=>w[0]||'').join('').slice(0,2).toUpperCase();
    const photoHtml = m.photo
      ? `<img src="${m.photo}" alt="${m.name}" class="comm-photo-full">`
      : `<div class="comm-avatar-lg">${initials||'?'}</div>`;
    return `<div class="comm-card">
      ${photoHtml}
      <div class="comm-card-name">${m.name}</div>
      <div class="comm-card-role">${m.role}</div>
      <div class="comm-card-title">${m.title||''}</div>
    </div>`;
  }).join('');

  const iac = d.internationalAdvisory.map(m => `<li>${m}</li>`).join('');
  const nac = d.nationalAdvisory.map(m => `<li>${m}</li>`).join('');

  return `
<div class="page-inner page-content">
  <h1 class="page-heading">Committees</h1>

  <h2 class="sub-heading">CONFERENCE PATRON</h2>
  <div class="patron-name">${(d.committeeRoles[0]||{}).name || '[Patron Name]'}</div>

  <h2 class="sub-heading">Organizing Committee</h2>
  <div class="comm-grid">${roles}</div>

  <h2 class="sub-heading">International Advisory Committee</h2>
  <ul class="advisory-list">${iac}</ul>

  <h2 class="sub-heading">National Advisory Committee</h2>
  <ul class="advisory-list">${nac}</ul>

  <div class="contact-bar-inline">
    <p>For ${d.site.title} related queries, please contact through Email:
      <a href="mailto:${d.site.email}">${d.site.email}</a>
    </p>
  </div>
</div>`;
};
