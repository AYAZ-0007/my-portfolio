/**
 * Portfolio JavaScript Interactions
 * Author: Ayaz
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initInteractiveImage3D();
  initTypewriter();
  initScrollSpy();
  initContactForm();
});

/* ==========================================================================
   1. Navigation Drawer & 3-Lines Hamburger Icon (Top Left)
   ========================================================================== */
function initNavigation() {
  const menuToggle = document.getElementById('menuToggle');
  const sideNav = document.getElementById('sideNav');
  const navOverlay = document.getElementById('navOverlay');
  const navCloseBtn = document.getElementById('navCloseBtn');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuToggle || !sideNav || !navOverlay) return;

  function openMenu() {
    menuToggle.classList.add('is-active');
    menuToggle.setAttribute('aria-expanded', 'true');
    sideNav.classList.add('is-open');
    sideNav.setAttribute('aria-hidden', 'false');
    navOverlay.classList.add('is-visible');
    navOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeMenu() {
    menuToggle.classList.remove('is-active');
    menuToggle.setAttribute('aria-expanded', 'false');
    sideNav.classList.remove('is-open');
    sideNav.setAttribute('aria-hidden', 'true');
    navOverlay.classList.remove('is-visible');
    navOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Toggle button click
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = sideNav.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close button inside drawer
  if (navCloseBtn) {
    navCloseBtn.addEventListener('click', closeMenu);
  }

  // Overlay click closes menu
  navOverlay.addEventListener('click', closeMenu);

  // Close when clicking any navigation link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sideNav.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   2. Interactive 3D Image with Cursor Parallax & Glare Effect
   ========================================================================== */
function initInteractiveImage3D() {
  const card = document.getElementById('interactiveCard');
  const glare = document.getElementById('cardGlare');
  if (!card) return;

  let bounds;

  function updateBounds() {
    bounds = card.getBoundingClientRect();
  }

  window.addEventListener('resize', updateBounds);
  window.addEventListener('scroll', updateBounds, { passive: true });
  updateBounds();

  // Mouse movement on card produces real-time 3D tilt
  card.addEventListener('mousemove', (e) => {
    if (!bounds) updateBounds();

    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;

    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;

    const percentX = (mouseX - centerX) / centerX;
    const percentY = (mouseY - centerY) / centerY;

    // Max rotation angles (degrees)
    const maxTilt = 18;
    const rotateX = -percentY * maxTilt;
    const rotateY = percentX * maxTilt;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

    // Update glare reflection highlight
    if (glare) {
      glare.style.opacity = '1';
      glare.style.background = `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.28), transparent 60%)`;
    }
  });

  // Reset card smoothly when cursor leaves
  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.5s ease-out, box-shadow 0.3s ease';
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    if (glare) {
      glare.style.opacity = '0';
    }

    setTimeout(() => {
      card.style.transition = '';
    }, 500);
  });

  // Interactive Click: Fun pop / reaction
  card.addEventListener('click', () => {
    card.style.transition = 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(0.95, 0.95, 0.95)';

    setTimeout(() => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1.05, 1.05, 1.05)';
      setTimeout(() => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        setTimeout(() => {
          card.style.transition = '';
        }, 200);
      }, 150);
    }, 150);
  });
}

/* ==========================================================================
   3. Typewriter Effect for Subtitle
   ========================================================================== */
function initTypewriter() {
  const typewriterElem = document.getElementById('typewriterText');
  if (!typewriterElem) return;

  const roles = [
    'Full Stack Developer',
    'Creative Technologist',
    'Open Source Enthusiast',
    'Problem Solver',
    'UI / UX Engineer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typewriterElem.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 40;
    } else {
      typewriterElem.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingDelay = 1800; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingDelay = 400; // Pause before typing next word
    }

    setTimeout(type, typingDelay);
  }

  // Start typewriter after a short initial delay
  setTimeout(type, 800);
}

/* ==========================================================================
   4. ScrollSpy: Highlight Active Section in Navigation
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('data-section') === currentId) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}

/* ==========================================================================
   5. Interactive Contact Form with Validation & Feedback
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');

  if (!form || !feedback || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    // Basic validation
    if (!name || !email || !subject || !message) {
      showFeedback('Please fill out all fields before sending.', 'error');
      return;
    }

    // Email regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFeedback('Please enter a valid email address.', 'error');
      return;
    }

    // Button loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
        <path d="M12 2a10 10 0 0 1 10 10" />
      </svg>
      <span>Sending Message...</span>
    `;

    // Simulated network dispatch
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      showFeedback(`Thank you, ${name}! Your message has been received. I'll get back to you soon.`, 'success');
      form.reset();
    }, 1200);
  });

  function showFeedback(msg, type) {
    feedback.textContent = msg;
    feedback.className = `form-feedback ${type}`;
    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    if (type === 'success') {
      setTimeout(() => {
        feedback.style.display = 'none';
      }, 7000);
    }
  }
}

