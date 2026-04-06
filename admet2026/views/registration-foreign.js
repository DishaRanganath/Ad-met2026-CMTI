module.exports = function registrationForeign(d) {
  const r = d.registration;
  const formUrl = d.registrationFormForeignUrl || '#';

  const foreignRows = r.foreignFees.map(f => `
    <tr>
      <td>${f.category}</td>
      <td>${f.type}</td>
      <td>${f.early}</td>
      <td>${f.regular}</td>
    </tr>`).join('');

  return `
<div class="page-inner page-content">
  <h1 class="page-heading">Registration – Foreign Participants</h1>

  ${r.earlyBirdNote ? `<div class="earlybird-banner">🎉 ${r.earlyBirdNote}</div>` : ''}

  <div class="reg-event-info">
    <p><strong>Event Timing:</strong> ${d.site.dates} &nbsp;|&nbsp; <strong>Event Address:</strong> ${r.eventAddress}</p>
    <p><strong>Contact:</strong> <a href="mailto:${d.site.email}">${d.site.email}</a> or <a href="mailto:${d.site.altEmail}">${d.site.altEmail}</a></p>
  </div>

  <h2 class="sub-heading">REGISTRATION FEES – FOREIGN DELEGATES</h2>
  <table class="reg-table">
    <thead>
      <tr>
        <th>Category</th>
        <th>Participant Type</th>
        <th>Up to Sep 8, 2026 (Early Bird)</th>
        <th>After Sep 8, 2026 (Regular)</th>
      </tr>
    </thead>
    <tbody>${foreignRows}</tbody>
  </table>

  <p class="reg-note">* Registration fee includes: ${r.includes}</p>
  <p class="reg-note">* Accompanying person: USD 150 per person per night</p>

  <h2 class="sub-heading">PAYMENT DETAILS</h2>
  <div class="payment-box">
    <p>Foreign delegates can pay via <strong>Bank Transfer / SWIFT / NEFT</strong>:</p>
    <table class="bank-table">
      <tr><th>Bank Name</th><td>${r.payment.bank}</td></tr>
      <tr><th>Name of A/c</th><td>${r.payment.account_name}</td></tr>
      <tr><th>A/c No.</th><td>${r.payment.account_no}</td></tr>
      <tr><th>IFSC Code</th><td>${r.payment.ifsc}</td></tr>
      <tr><th>SWIFT Code</th><td>${r.payment.swift}</td></tr>
    </table>
    <p class="reg-note" style="margin-top:12px">Please upload your payment receipt with your name in PDF or JPEG format (e.g. JohnSmith.pdf)</p>
  </div>

  <div style="margin:32px 0;text-align:center">
    <a href="${formUrl}" target="_blank" class="submit-abstract-btn" style="font-size:16px;padding:16px 40px">
      CLICK HERE FOR FOREIGN REGISTRATION 
    </a>
    <p style="margin-top:12px;font-size:13px;color:#555">You will be redirected to a Google Form to complete your registration</p>
  </div>

  <div style="margin-top:16px;text-align:center">
    <a href="/registration" class="ql-btn ql-outline">🇮🇳 Indian Participants Registration →</a>
  </div>

  <div class="contact-bar-inline">
    <p>For ${d.site.title} related queries, please contact through Email:
      <a href="mailto:${d.site.email}">${d.site.email}</a> or
      <a href="mailto:${d.site.altEmail}">${d.site.altEmail}</a>
    </p>
  </div>
</div>`;
};
