module.exports = function home(d) {
  const deadlineRows = d.deadlines.map(dl => `
    <tr>
      <td>${dl.label}</td>
      <td class="date-val">${dl.date}</td>
      <td><span class="status-badge status-${dl.status.toLowerCase().replace(/\s/g,'-')}">${dl.status}</span></td>
    </tr>`).join('');

  const brochureBtn = d.brochure
    ? `<a href="${d.brochure}" class="ql-btn ql-outline" target="_blank"> View Brochure</a>`
    : `<a href="#" class="ql-btn ql-outline ql-disabled" title="Brochure will be uploaded soon"> View Brochure</a>`;

  const circularBtn = d.secondCircular
    ? `<a href="${d.secondCircular}" class="ql-btn ql-outline" target="_blank"> Second Circular</a>`
    : `<a href="#" class="ql-btn ql-outline ql-disabled" title="Second Circular will be uploaded soon"> Second Circular</a>`;

  return `
<!-- HOME HERO TEXT -->
<section class="home-intro-section">
  <div class="page-inner home-grid">
    <div class="home-main">

      <div class="conf-title-block">
        <h2 class="cth">13th Conference on Advances in Metrology (AdMet-2026)</h2>
        <h2 class="cth">and Pre-AdMet Workshop</h2>
        <h2 class="cth cth-date">(${d.site.dates})</h2>
       
      </div>

      <div class="home-logos-row">
        ${d.bannerLogos.length
          ? d.bannerLogos.map(l => `<img src="${l.path}" alt="${l.alt}" class="home-org-logo">`).join('')
          : `<div class="home-org-logo-placeholder">CSIR-NPL<br><small>National Physical Laboratory</small></div>
             <div class="home-org-logo-placeholder">MSI<br><small>Metrology Society of India</small></div>`
        }
      </div>

      <div class="deadline-box">
        <h3 class="box-title">EXTENDED DATES / DEADLINES</h3>
        <table class="deadline-table">
          <tbody>${deadlineRows}</tbody>
        </table>
        <div class="quick-links">
          <a href="/paper-submission" class="ql-btn">📄 Paper Submission</a>
          ${circularBtn}
          ${brochureBtn}
        </div>
      </div>

      <div class="home-body-text">
        ${d.homeContent.intro ? `<p class="intro-bold">${d.homeContent.intro}</p>` : ''}
        ${(d.homeContent.body||'').split('\n\n').map(p => p.trim() ? `<p>${p.trim()}</p>` : '').join('')}
      </div>

    </div>
    <aside class="home-sidebar">
      <div class="sidebar-card">
        <div class="sc-header">Quick Info</div>
        <div class="sc-body">
          <div class="sc-row"><span class="sc-icon">📅</span><div><strong>Dates</strong><br>${d.site.dates}</div></div>
          <div class="sc-row"><span class="sc-icon">📍</span><div><strong>Venue</strong><br>${d.venue.name}, ${d.venue.address}</div></div>
          <div class="sc-row"><span class="sc-icon">🏛</span><div><strong>Flagship Event of</strong><br>${d.site.organizer}</div></div>
          <div class="sc-row"><span class="sc-icon">✉</span><div><strong>Email</strong><br><a href="mailto:${d.site.email}">${d.site.email}</a></div></div>
          <div class="sc-row"><span class="sc-icon">✉</span><div><strong>Alt Email</strong><br><a href="mailto:${d.site.altEmail}">${d.site.altEmail}</a></div></div>
        </div>
      </div>
      <div class="sidebar-card" style="margin-top:16px">
        <div class="sc-header">Register Now</div>
        <div class="sc-body">
          <p style="font-size:13px;margin-bottom:12px;">${d.registration.earlyBirdNote||''}</p>
          <a href="/registration" class="ql-btn" style="display:block;text-align:center;margin-bottom:8px">🇮🇳 Indian Registration</a>
          <a href="/registration/foreign" class="ql-btn ql-outline" style="display:block;text-align:center">🌍 Foreign Registration</a>
        </div>
      </div>
    </aside>
  </div>
</section>

<!-- VENUE HIGHLIGHTS SECTION -->
<section class="venue-highlights-section">
  <div class="page-inner">
    <p class="home-venue-intro">${d.homeContent.venueDescription||''}</p>
    <div class="venue-highlights-grid">
      ${(d.homeContent.venueHighlights||[]).map(v => `
        <div class="venue-highlight-card">
          <div class="vh-icon">📍</div>
          <div>
            <strong>${v.name}</strong>
            <p>${v.desc}</p>
          </div>
        </div>`).join('')}
    </div>
  </div>
</section>

<!-- CONTACT FOOTER BAR -->
<div class="contact-bar">
  <div class="page-inner">
    <p>For ${d.site.title} related queries, please contact through Email:
      <a href="mailto:${d.site.email}">${d.site.email}</a>
      or <a href="mailto:${d.site.altEmail}">${d.site.altEmail}</a>
    </p>
  </div>
</div>
`;
};