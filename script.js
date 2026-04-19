/* =============================================
   KARRI DIVYA NAIDU — Portfolio JavaScript
   ============================================= */

/* ---------- NAV SCROLL EFFECT ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ---------- HAMBURGER MENU ---------- */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
// Close on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ---------- SCROLL REVEAL ---------- */
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

/* ---------- TYPEWRITER EFFECT ---------- */
const phrases = [
  'machine learning & AI research.',
  'full-stack web development.',
  'autonomous robotics systems.',
  'healthcare & environmental AI.',
  'optimization algorithms.',
];

const typedEl    = document.getElementById('typed');
let   phraseIdx  = 0;
let   charIdx    = 0;
let   deleting   = false;
let   pauseTimer = null;

function typeStep() {
  const phrase = phrases[phraseIdx];

  if (!deleting) {
    charIdx++;
    typedEl.textContent = phrase.slice(0, charIdx);
    if (charIdx === phrase.length) {
      // finished typing — pause then start deleting
      pauseTimer = setTimeout(() => { deleting = true; typeStep(); }, 1800);
      return;
    }
    setTimeout(typeStep, 55);
  } else {
    charIdx--;
    typedEl.textContent = phrase.slice(0, charIdx);
    if (charIdx === 0) {
      deleting  = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(typeStep, 350);
      return;
    }
    setTimeout(typeStep, 28);
  }
}

// Kick off after a short delay so page has loaded
setTimeout(typeStep, 900);

/* ---------- ACTIVE NAV LINK HIGHLIGHT ---------- */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}`
          ? 'var(--text)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ---------- PROJECT CARD TILT (subtle) ---------- */
document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-4px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});
