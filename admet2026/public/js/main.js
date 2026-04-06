// ── Slideshow ──────────────────────────────────────────────
let slideIndex = 0;
function changeSlide(direction) {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;
  slides[slideIndex].classList.remove('active');
  slideIndex = (slideIndex + direction + slides.length) % slides.length;
  slides[slideIndex].classList.add('active');
}
// Auto-advance slideshow every 5s
(function() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 1) setInterval(() => changeSlide(1), 5000);
})();

// ── Mobile nav toggle ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Close dropdown on outside click
  document.addEventListener('click', e => {
    if (!e.target.closest('.has-dropdown')) {
      document.querySelectorAll('.dropdown').forEach(d => d.style.display = '');
    }
  });

  // Smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
});
