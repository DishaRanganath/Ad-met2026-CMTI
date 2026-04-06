module.exports = function registration(d) {
  const r = d.registration;
  const formUrl = d.registrationFormIndianUrl || '#';

  const indianTables = r.indianFees.map(section => {
    const rows = section.rows.map(row => `
      <tr>
        <td>${row.type}</td>
        <td>₹ ${row.early}</td>
        <td>₹ ${row.regular}</td>
        <td>₹ ${row.earlyNoAccom}</td>
        <td>₹ ${row.regularNoAccom}</td>
      </tr>`).join('');
    return `
      <h3 class="reg-cat-heading">${section.category}</h3>
      <table class="reg-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Up to Sep 18, 2026 (Early)</th>
            <th>After Sep 18, 2026 (Regular)</th>
            <th>w/o Accom (Early)</th>
            <th>w/o Accom (Regular)</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>`;
  }).join('');

  return `
<div class="page-inner page-content">
  <h1 class="page-heading">Registration</h1>

  ${r.earlyBirdNote ? `<div class="earlybird-banner">🎉 ${r.earlyBirdNote}</div>` : ''}

  <div class="reg-event-info">
    <p><strong>Event Timing:</strong> ${d.site.dates} &nbsp;|&nbsp; <strong>Event Address:</strong> ${r.eventAddress}</p>
    <p><strong>Contact:</strong> <a href="mailto:${d.site.email}">${d.site.email}</a> or <a href="mailto:${d.site.altEmail}">${d.site.altEmail}</a></p>
  </div>

  <h2 class="sub-heading">REGISTRATION FEES*</h2>

  <h3 class="reg-flag-heading">🇮🇳 Indian Delegates</h3>
  ${indianTables}

  <p class="reg-note">${r.currency_note}</p>
  <p class="reg-note"><strong>The registration fee includes:</strong> ${r.includes}</p>
  <p class="reg-note"># Without accommodation &nbsp;&nbsp; ## Accompanying person: Per person INR 3,500/- per night (+ GST)</p>

  <h2 class="sub-heading">LANGUAGE OF CONFERENCE</h2>
  <p>${r.language}</p>

  <h2 class="sub-heading">DATE AND VENUE</h2>
  <p>${d.site.title} Conference is scheduled from <strong>${d.site.dates}</strong>. Venue: <strong>${d.venue.name}, ${d.venue.address}</strong></p>

  <h2 class="sub-heading">PAYMENT DETAILS</h2>
  <div class="payment-box">
    <p>Demand Draft / Cheque may be issued in favour of <strong>"${r.payment.payable_to}"</strong> payable at New Delhi.</p>
    <p>Payment can also be made through Bank Transfer or NEFT or UPI in the account of MSI in Canara Bank as per detail below:</p>
    <table class="bank-table">
      <tr><th>Bank Name</th><td>${r.payment.bank}</td></tr>
      <tr><th>Name of A/c</th><td>${r.payment.account_name}</td></tr>
      <tr><th>A/c No.</th><td>${r.payment.account_no}</td></tr>
      <tr><th>IFSC Code</th><td>${r.payment.ifsc}</td></tr>
      <tr><th>SWIFT Code</th><td>${r.payment.swift}</td></tr>
      <tr><th>UPI ID</th><td>${r.payment.upi}</td></tr>
    </table>
    <p class="reg-note" style="margin-top:12px">Please upload your receipt with your name in PDF or JPEG format (e.g. name.pdf)</p>
    <p class="reg-note">Please Refer AdMet website for payment details. 18% GST must be paid in addition to the registration fee.</p>
  </div>

  <div style="margin:32px 0;text-align:center">
    <a href="${formUrl}" target="_blank" class="submit-abstract-btn" style="font-size:16px;padding:16px 40px">
      🇮🇳 CLICK HERE FOR INDIAN REGISTRATION
    </a>
    <p style="margin-top:12px;font-size:13px;color:#555">You will be redirected to a Google Form to complete your registration</p>
  </div>

  <div style="margin-top:16px;text-align:center">
    <a href="/registration/foreign" class="ql-btn ql-outline">🌍 Foreign Participants Registration →</a>
  </div>

  <div class="contact-bar-inline">
    <p>For ${d.site.title} related queries, please contact through Email:
      <a href="mailto:${d.site.email}">${d.site.email}</a> or
      <a href="mailto:${d.site.altEmail}">${d.site.altEmail}</a>
    </p>
  </div>
</div>`;
};
