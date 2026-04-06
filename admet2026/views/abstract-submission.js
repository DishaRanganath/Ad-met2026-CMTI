module.exports = function abstractSubmission(d) {
  const formUrl = d.abstractFormUrl || '#';
  return `
<div class="page-inner page-content">
  <h1 class="page-heading">Abstract Submission</h1>

  <div class="abstract-intro-box">
    <p>Authors are invited to submit abstracts for oral or poster presentation at ${d.site.title}. Please carefully read the guidelines below before submitting.</p>
  </div>

  <h2 class="sub-heading">ABSTRACT GUIDELINES</h2>
  <div class="guidelines-grid">
    <div class="guideline-card">
      <div class="gc-icon">📝</div>
      <div class="gc-title">Word Limit</div>
      <div class="gc-desc">Abstracts must be <strong>250–400 words</strong> in length. Abstracts shorter than 250 words or longer than 400 words will not be considered.</div>
    </div>
    <div class="guideline-card">
      <div class="gc-icon">🏗</div>
      <div class="gc-title">Structure</div>
      <div class="gc-desc">The abstract must clearly state: <strong>Objective</strong>, <strong>Methodology</strong>, <strong>Key Results</strong>, and <strong>Conclusions</strong>. Unstructured abstracts will be returned for revision.</div>
    </div>
    <div class="guideline-card">
      <div class="gc-icon">🌐</div>
      <div class="gc-title">Language</div>
      <div class="gc-desc">Abstracts must be written in <strong>English</strong>. Ensure correct grammar, spelling, and scientific terminology throughout.</div>
    </div>
    <div class="guideline-card">
      <div class="gc-icon">📋</div>
      <div class="gc-title">Content Requirements</div>
      <div class="gc-desc">Include: Title, Author name(s), Affiliation(s), Contact email of the corresponding author, and Keywords (3–6 keywords).</div>
    </div>
    <div class="guideline-card">
      <div class="gc-icon">🎯</div>
      <div class="gc-title">Scope</div>
      <div class="gc-desc">Abstracts must fall within the <a href="/scope">conference scope</a>. Off-topic abstracts will be rejected without review.</div>
    </div>
    <div class="guideline-card">
      <div class="gc-icon">🔬</div>
      <div class="gc-title">Originality</div>
      <div class="gc-desc">Submitted work must be <strong>original and unpublished</strong>. Work published or under review elsewhere will be disqualified.</div>
    </div>
    <div class="guideline-card">
      <div class="gc-icon">📊</div>
      <div class="gc-title">Presentation Type</div>
      <div class="gc-desc">Authors must indicate their preferred presentation type: <strong>Oral</strong> or <strong>Poster</strong>. The committee reserves the right to reassign presentation type.</div>
    </div>
    <div class="guideline-card">
      <div class="gc-icon">📅</div>
      <div class="gc-title">Notification</div>
      <div class="gc-desc">Accepted abstracts will be notified within <strong>15 days</strong> of the submission deadline. Authors of accepted abstracts will be invited to submit full papers.</div>
    </div>
    <div class="guideline-card">
      <div class="gc-icon">📄</div>
      <div class="gc-title">Full Paper</div>
      <div class="gc-desc">Authors of accepted abstracts will be invited to submit full papers (4–8 pages) for journal publication in a special issue partnered with ${d.site.title}.</div>
    </div>
  </div>

  <div class="abstract-format-box">
    <h3>Format Requirements</h3>
    <ul>
      <li>Font: Times New Roman, 12pt for body; 14pt Bold for title</li>
      <li>Line spacing: 1.5</li>
      <li>Margins: 2.5 cm on all sides</li>
      <li>File format: <strong>PDF or MS Word (.docx)</strong></li>
      <li>File name format: <code>FirstAuthorLastName_AdMet2026.pdf</code></li>
      <li>References: Not required in the abstract; optional if absolutely necessary (max 3)</li>
      <li>Figures/Tables: Not allowed in the abstract</li>
    </ul>
  </div>

  <div class="submit-abstract-section">
    <h2 class="sub-heading">SUBMIT YOUR ABSTRACT</h2>
    <p style="margin-bottom:20px">Last date for abstract submission: <strong>${d.deadlines.find(dl=>dl.label.toLowerCase().includes('abstract'))?.date || 'August 18, 2026'}</strong></p>
    <a href="${formUrl}" target="_blank" class="submit-abstract-btn">
       Click Here to Submit Abstract 
    </a>
    <p class="abstract-note">By submitting, you confirm that the abstract is original, all co-authors have consented to submission, and the work has not been previously published.</p>
  </div>

  <div class="contact-bar-inline">
    <p>For ${d.site.title} related queries: <a href="mailto:${d.site.email}">${d.site.email}</a> | <a href="mailto:${d.site.altEmail}">${d.site.altEmail}</a></p>
  </div>
</div>`;
};
