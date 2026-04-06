module.exports = function paperSubmission(d) {
  return `
<div class="page-inner page-content">
  <h1 class="page-heading">Paper Submission</h1>

  <div class="abstract-intro-box">
    <p>The selected quality research papers will be published in a special issue on <strong>"Advances in Metrology"</strong> of an indexed journal partnered with ${d.site.title}. Authors must submit full papers of about <strong>4–8 pages</strong> for this special issue.</p>
  </div>

  <h2 class="sub-heading">PAPER SUBMISSION GUIDELINES</h2>
  <ul class="paper-list">
    <li>Authors have to submit full papers of about <strong>4–8 pages</strong> for the special journal issue. After the review process, the special issue is expected to be available by early 2027.</li>
    <li>Author must mention in the cover note that the paper is submitted for the special issue and that it represents the complete and extended version of the work presented at ${d.site.title}.</li>
    <li>All accepted papers will be published in the special issue after the standard peer-review process.</li>
    <li>Format of papers and other guidelines for paper submission will be updated here. Please check back soon.</li>
    <li><h3>(<a href="#" target="_blank">Click here to go to the submission portal</a>)</h3></li>
    <li>Check the journal website for more details on formatting and submission.</li>
  </ul>

  <h2 class="sub-heading">ABOUT MAPAN – JOURNAL OF METROLOGY SOCIETY OF INDIA</h2>
  <div class="mapan-box">
    <div class="mapan-logo-area">
      <div class="mapan-logo-text">MAPAN</div>
      <p class="mapan-subtitle">Journal of Metrology Society of India</p>
    </div>
    <div class="mapan-info">
      <p><strong>MAPAN</strong> (Journal of Metrology Society of India) is the official peer-reviewed journal of the Metrology Society of India (MSI), published by Springer Nature. It covers all aspects of metrology including measurement science, calibration, standards, and instrumentation.</p>
      <ul class="mapan-facts">
        <li> <strong>Publisher:</strong> Springer Nature</li>
        <li><strong>ISSN (Print):</strong> 0970-3950 &nbsp;|&nbsp; <strong>ISSN (Online):</strong> 0974-9853</li>
        <li> <strong>Indexed in:</strong> Scopus, Emerging Sources Citation Index (ESCI), DOAJ, and other major databases</li>
        <li> <strong>Focus:</strong> Dimensional, Optical, Thermal, Electrical, Chemical, Environmental &amp; Quantum Metrology</li>
        <li><strong>Published by:</strong> Central Manufacturing Technology Institute (CMTI)</li>
      </ul>
      <p style="margin-top:12px"><a href="https://link.springer.com/journal/12647" target="_blank" class="ql-btn ql-outline">Visit MAPAN Journal Website →</a></p>
    </div>
  </div>

  <div class="contact-bar-inline">
    <p>For ${d.site.title} related queries, please contact through Email:
      <a href="mailto:${d.site.email}">${d.site.email}</a> or
      <a href="mailto:${d.site.altEmail}">${d.site.altEmail}</a>
    </p>
  </div>
</div>`;
};
