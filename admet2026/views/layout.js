module.exports = function layout(d, activePage, content) {
  const nav = [
    { href: '/', label: 'Home', key: 'home' },
    { href: '/paper-submission', label: 'Paper Submission', key: 'paper-submission' },
    { href: '/committees', label: 'Committees', key: 'committees' },
    { href: '/scope', label: 'Scope', key: 'scope' },
    {
      href: '/registration', label: 'Registration', key: 'registration',
      children: [
        { href: '/registration', label: 'Indian Participants' },
        { href: '/registration/foreign', label: 'Foreign Participants' }
      ]
    },
    { href: '/abstract-submission', label: 'Abstract Submission', key: 'abstract-submission' },
    { href: '/workshop', label: 'Workshop', key: 'workshop' },
    { href: '/sponsors', label: 'Sponsors', key: 'sponsors' },
    { href: '/gallery', label: 'Gallery', key: 'gallery' },
    { href: '/venue', label: 'Venue', key: 'venue' },
  ];

  const logoBannerPart = d.bannerLogos.length
    ? d.bannerLogos.map(l => `<img src="${l.path}" alt="${l.alt}" class="partner-logo-img" title="${l.alt}">`).join('')
    : `<div class="partner-logo-placeholder">CSIR-NPL<br>India</div><div class="partner-logo-placeholder">Metrology<br>Society of India</div>`;

  const navItems = nav.map(n => {
    const isActive = activePage === n.key || activePage.startsWith(n.key + '-');
    if (n.children) {
      return `<li class="has-dropdown">
        <a href="${n.href}" class="${isActive ? 'active' : ''}">${n.label} <span class="arrow">▾</span></a>
        <ul class="dropdown">
          ${n.children.map(c => `<li><a href="${c.href}">${c.label}</a></li>`).join('')}
        </ul>
      </li>`;
    }
    return `<li><a href="${n.href}" class="${isActive ? 'active' : ''}">${n.label}</a></li>`;
  }).join('');

  // Hero images for banner (or fallback placeholder)
  const heroBanner = d.heroImages.length
   ? `<div class="hero-slideshow" style="position:relative;">
    ${d.heroImages.map((img, i) => `<img src="${img.path}" alt="${img.caption || 'AdMet-2026'}" class="hero-slide ${i===0?'active':''}">`).join('')}
    ${d.heroImages.length > 1 ? `<button class="slide-btn prev" onclick="changeSlide(-1)">&#10094;</button><button class="slide-btn next" onclick="changeSlide(1)">&#10095;</button>` : ''}
    <div class="hero-overlay-text" style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,0.65));padding:32px 40px 28px;">
      <h2 class="hero-conf-title">13th Conference on Advances in Metrology (AdMet-2026)</h2>
      <h2 class="hero-conf-title">and Pre-AdMet Workshop</h2>
      <h2 class="hero-conf-title hero-conf-dates">(6-8 October 2026)</h2>
    </div>
  </div>`
    : `<div class="hero-placeholder">
        <div class="hero-overlay-text">
          <h2 class="hero-conf-title">${d.site.edition} Conference on Advances in Metrology (${d.site.title})</h2>
          <h2 class="hero-conf-title">${d.site.subtitle}</h2>
          <h2 class="hero-conf-title hero-conf-dates">(${d.site.dates})</h2>
        </div>
      </div>`;

  // Sponsor logos for footer
  const footerSponsors = d.sponsors.filter(s => s.logo).map(s =>
    `<img src="${s.logo}" alt="${s.name}" class="footer-sponsor-img" title="${s.name} – ${s.level}">`
  ).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${d.site.title} – ${d.site.fullTitle}</title>
<link rel="stylesheet" href="/css/style.css"/>
<link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet"/>
</head>
<body>

<!-- TOP STRIP -->
<div class="top-strip">
  <span class="ts-left">${d.site.organizer}</span>
  <span class="ts-right">
    ✉ <a href="mailto:${d.site.email}">${d.site.email}</a>
    &nbsp;|&nbsp; ✉ <a href="mailto:${d.site.altEmail}">${d.site.altEmail}</a>
  </span>
</div>

<!-- HEADER BANNER -->
<header class="site-header">
  <div class="header-inner">
    <div class="header-logo-area">
      ${d.bannerLogos.length
        ? d.bannerLogos.slice(0,1).map(l => `<img src="${l.path}" alt="${l.alt}" class="main-logo">`).join('')
        : `<div class="logo-box-text">MSI</div>`}
    </div>
    <div class="header-title-area">
      <h1 class="site-title">${d.site.title}: ${d.site.fullTitle}</h1>
      <p class="site-subtitle">${d.site.subtitle} <span class="date-chip">(${d.site.dates})</span></p>
      <p class="site-org">Flagship Event of: ${d.site.organizer}</p>
    </div>
    <div class="header-partners">
      ${logoBannerPart}
    </div>
  </div>
</header>

<!-- NAVIGATION -->
<nav class="main-nav">
  <ul class="nav-list">${navItems}</ul>
</nav>

<!-- PAGE CONTENT -->
<main>
${heroBanner}
${content}
</main>

<!-- FOOTER -->
<footer class="site-footer">
  ${footerSponsors ? `<div class="footer-sponsors"><div class="footer-inner"><p class="footer-sponsors-label">Our Sponsors &amp; Partners</p><div class="footer-sponsor-logos">${footerSponsors}</div></div></div>` : ''}
  <div class="footer-main">
    <div class="footer-inner footer-cols">
      <div class="footer-col">
        <div class="footer-brand">AdMet-2026</div>
        <p class="footer-tagline">13th Conference on Advances in Metrology</p>
        <p>6–8 October 2026 | Bangalore, India</p>
      </div>
      <div class="footer-col">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="/paper-submission">Paper Submission</a></li>
          <li><a href="/abstract-submission">Abstract Submission</a></li>
          <li><a href="/registration">Registration</a></li>
          <li><a href="/committees">Committees</a></li>
          <li><a href="/venue">Venue</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact Us</h4>
        <p>✉ <a href="mailto:${d.site.email}">${d.site.email}</a></p>
        <p>✉ <a href="mailto:${d.site.altEmail}">${d.site.altEmail}</a></p>
        <p>CMTI,Bangalore India</p>
      </div>
    </div>
  </div>
  <div class="footer-bottom-bar">
    <div class="footer-inner footer-bottom">
      <span>© 2026 ${d.site.organizer}</span>
      <span class="footer-sep">|</span>
      <a href="/admin">Admin Panel</a>
    </div>
  </div>
</footer>

<script src="/js/main.js"></script>
</body>
</html>`;
};
