module.exports = function scope(d) {
  const topics = d.scope.map(t => `<li>${t}</li>`).join('');
  return `
<div class="page-inner page-content">
  <h1 class="page-heading">Scope</h1>
  <p>The following topics will be covered in ${d.site.title}:</p>
  <ul class="scope-list">${topics}</ul>
  <p class="scope-invite">
    This conference includes invited talks by eminent personalities known internationally in addition to contributory papers for both oral and poster presentations. ${d.site.title} invites original contributed papers from scientists, researchers, engineers, academicians, technologists, students, and industrial personnel on the aforesaid topics for presentation in the conference.
  </p>
  <div class="contact-bar-inline">
    <p>For ${d.site.title} related queries, please contact through Email:
      <a href="mailto:${d.site.email}">${d.site.email}</a>
    </p>
  </div>
</div>`;
};
