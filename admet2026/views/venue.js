module.exports = function venue(d) {
  const v = d.venue;
  const airports = (v.airports || []).map(a => `<li>${a}</li>`).join('');
  return `
<div class="page-inner page-content">
  <h1 class="page-heading">Venue</h1>

  <h2 class="sub-heading">Address</h2>
  <h3 class="venue-name">${v.name}</h3>
  <p class="venue-addr">${v.address}</p>
  ${v.website ? `<p><a href="${v.website}" target="_blank">${v.website}</a></p>` : ''}

  <h2 class="sub-heading">Major Airports</h2>
  <ul class="scope-list">${airports}</ul>

  <h2 class="sub-heading">How to Reach</h2>
  <p>
    Bengaluru is well connected by air, rail, and road to all major cities across India and international destinations. 
    The venue, Central Manufacturing Technology Institute (CMTI), is located in Tumakuru Road, Bengaluru, 
    and is easily accessible from Kempegowda International Airport (~35 km), Bengaluru City Railway Station (~10 km), 
    and Majestic Bus Stand (~10 km).
  </p>

  <div class="map-wrapper">
    <iframe
      src="https://www.google.com/maps?q=Central+Manufacturing+Technology+Institute+Bengaluru&output=embed"
      width="100%" height="400" style="border:0;border-radius:8px;" allowfullscreen="" loading="lazy">
    </iframe>
  </div>

  <p style="margin-top:16px">
    <a href="https://www.karnatakatourism.org/" target="_blank" class="ql-btn">
      DISCOVER MORE ABOUT BENGALURU – CLICK HERE
    </a>
  </p>

  <div class="contact-bar-inline">
    <p>For ${d.site.title} related queries: <a href="mailto:${d.site.email}">${d.site.email}</a></p>
  </div>
</div>`;
};