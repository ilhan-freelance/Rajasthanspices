// ========================================
// Rajasthan Trading & Manufactures - Main JS
// ========================================

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('mainNav');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
}

// Close nav on link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveNav() {
  const scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}
window.addEventListener('scroll', setActiveNav);

// Scroll animations (Intersection Observer)
const animateElements = document.querySelectorAll(
  '.about-feature, .product-card, .why-item, .service-card, .market-item'
);

animateElements.forEach(el => el.classList.add('animate-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

animateElements.forEach(el => observer.observe(el));

// Header shadow on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
  } else {
    header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
  }
});

// Form submission
const enquiryForm = document.getElementById('enquiryForm');
if (enquiryForm) {
  enquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('formName').value;
    const company = document.getElementById('formCompany').value;
    const phone = document.getElementById('formPhone').value;
    const product = document.getElementById('formProduct').value;
    const qty = document.getElementById('formQty').value;
    const message = document.getElementById('formMessage').value;
    const country = document.getElementById('formCountry').value;

    // Build WhatsApp message
    const waMessage = `Hello! I'm ${name} from ${company} (${country}).%0A%0AProduct Required: ${product}%0AQuantity: ${qty}%0APhone: ${phone}%0A%0A${message}`;
    
    window.open(`https://wa.me/919829377723?text=${waMessage}`, '_blank');
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = header.offsetHeight;
      const targetPos = target.offsetTop - headerHeight - 10;
      window.scrollTo({
        top: targetPos,
        behavior: 'smooth'
      });
    }
  });
});
