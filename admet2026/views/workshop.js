module.exports = function workshop(d) {
  const w = d.workshop;
  return `
<div class="page-inner page-content">
  <h1 class="page-heading">Workshop</h1>
  <h2 class="sub-heading">${w.title}</h2>
  ${w.date ? `<p><strong>Date:</strong> ${w.date}</p>` : ''}
  ${w.theme ? `<p><strong>Theme:</strong> "${w.theme}"</p>` : ''}
  <p class="workshop-desc">${w.description}</p>

  <div class="contact-bar-inline">
    <p>For ${d.site.title} related queries: <a href="mailto:${d.site.email}">${d.site.email}</a> | <a href="mailto:${d.site.altEmail}">${d.site.altEmail}</a></p>
  </div>
</div>`;
};
