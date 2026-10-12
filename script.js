document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const menuBtn = document.getElementById('menu-btn');
  const nav = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const hireBtns = document.querySelectorAll('.hire-btn');
  const yearEl = document.getElementById('year');
  const typedEl = document.getElementById('typed');

  // Preloader Elements
  const preloader = document.getElementById('preloader');
  const loadPercentage = document.getElementById('load-percentage');
  const loaderBar = document.getElementById('loader-bar');

  // Project Modal Elements
  const projectModal = document.getElementById('project-modal');
  const closeModalBtn = document.querySelector('.close-modal-btn');
  const modalProjectImg = document.getElementById('modal-project-img');
  const modalProjectTitle = document.getElementById('modal-project-title');
  const modalProjectTags = document.getElementById('modal-project-tags');
  const modalProjectDescription = document.getElementById(
    'modal-project-description'
  );
  const modalProjectActions = document.getElementById('modal-project-actions');
  const projectCards = document.querySelectorAll('.project-card');

  if (preloader && loadPercentage && loaderBar) {
    let currentCount = 0;
    const interval = 30;
    const finalCount = 100;

    // Total counting duration set to 8 seconds (8000ms)
    const totalCountDuration = 8000;
    const step = Math.ceil(finalCount / (totalCountDuration / interval));

    // Variable to track if window.load event has fired
    let isWindowLoaded = false;
    let isCountingFinished = false; // Flag to check if counting has reached 100%

    // Function to run when counting finishes (after 8 seconds)
    function finishCounting() {
      // Ensure it is 100%
      loadPercentage.textContent = '100%';
      loaderBar.style.width = '100%';
      isCountingFinished = true; // Set flag that counting is done

      // Check if the actual window content is loaded AND the count is finished
      if (isWindowLoaded) {
        // *** 2-second delay after 100% is reached (2000ms) ***
        setTimeout(() => {
          preloader.classList.add('loaded');
          // Re-initialize AOS
          if (window.AOS) {
            window.AOS.init({ once: false, duration: 1200, offset: 100 });
          }
        }, 2000);
      }
      // If window content is not yet loaded, the window.load event handler will take over
    }

    // Function to handle the actual count
    function updateCounter() {
      if (currentCount < finalCount) {
        currentCount = Math.min(finalCount, currentCount + step);
        loadPercentage.textContent = `${currentCount}%`;
        loaderBar.style.width = `${currentCount}%`;

        if (currentCount < finalCount) {
          setTimeout(updateCounter, interval);
        } else {
          // Count reached 100, now call finishCounting
          finishCounting();
        }
      }
    }

    // --- 1. Start Counting Immediately ---
    updateCounter();

    // --- 2. Handle Window Load Event ---
    window.addEventListener('load', () => {
      isWindowLoaded = true;

      // If the counting has already finished by the time window loads
      if (isCountingFinished) {
        // Ensure 100% is displayed
        loadPercentage.textContent = '100%';
        loaderBar.style.width = '100%';

        // *** 2-second delay after 100% is reached (2000ms) ***
        setTimeout(() => {
          preloader.classList.add('loaded');
          if (window.AOS) {
            window.AOS.init({ once: false, duration: 1200, offset: 100 });
          }
        }, 2000);
      }
      // If counting is still running, `finishCounting` will handle the fade out when it hits 100%.
    });
  }
  // ******************************************************************

  // Set current year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu toggle
  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('show');
  });

  // Close nav on link click (mobile)
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      // close mobile nav
      nav.classList.remove('show');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Smooth scroll for internal links (basic fallback, CSS scroll-behavior handles most)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault(); // Prevent default jump
        const offset = 70; // header height
        const top =
          target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Typing effect
  const words = [
    'Frontend Engineer',
    'GenAI Developer',
    'Wordpress Developer',
    'MERN Stack Developer',
  ];
  let wIndex = 0,
    charIndex = 0,
    forward = true;

  function typeLoop() {
    if (!typedEl) return; // Exit if element not found

    const current = words[wIndex];
    if (forward) {
      charIndex++;
      if (charIndex > current.length) {
        forward = false;
        setTimeout(typeLoop, 900);
        return;
      }
    } else {
      charIndex--;
      if (charIndex < 0) {
        forward = true;
        wIndex = (wIndex + 1) % words.length;
        setTimeout(typeLoop, 800);
        return;
      }
    }
    typedEl.textContent = current.slice(0, charIndex);
    setTimeout(typeLoop, forward ? 80 : 40);
  }
  // Start typing effect only if the element exists
  if (typedEl) {
    typeLoop();
  }

  // Scrollspy - update active nav link based on section in view
  const sections = document.querySelectorAll('main section[id]');
  function onScrollSpy() {
    const scrollPos = window.scrollY + 80;
    let currentId = sections[0]?.id || '';
    sections.forEach((sec) => {
      const top = sec.offsetTop;
      if (scrollPos >= top) currentId = sec.id;
    });
    navLinks.forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`);
    });
  }
  window.addEventListener('scroll', onScrollSpy, { passive: true });
  onScrollSpy();

  // "Let's Talk" buttons scroll to contact
  hireBtns.forEach((b) =>
    b.addEventListener('click', (e) => {
      e.preventDefault();
      const contact = document.getElementById('contact');
      if (contact) {
        const offset = 70; // header height
        const top =
          contact.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    })
  );

  // ********** PROJECT MODAL LOGIC **********

  // Data for each project to populate the modal
  const projectsData = {
    jarvis: {
      img: 'material/jarvis.png',
      title: 'Jarvis - AI Virtual Assistant',
      tags: ['React', 'LLM APIs', 'Web APIs'],
      description:
        'A custom AI-powered virtual assistant built with React.js and modern web APIs. Features advanced LLM integration with highly optimized prompt engineering to maintain complex conversation context and ensure accurate, context-aware responses. Architected with a highly responsive front-end interface for seamless, low-latency conversational user experience.',
      github: 'https://github.com/DurveshPatil888/Jarvis-AI',
    },
    'netflix-gpt': {
      img: 'material/netflix GPT.png',
      title: 'Netflix-GPT AI Movie Recommendation',
      tags: ['React', 'GPT API', 'TMDB API'],
      description:
        'An AI-driven movie platform engineered to process 1000+ TMDB API records for dynamic content rendering. Features a chat-based AI recommendation engine generating tailored movie suggestions. Optimized React component re-renders by 30% via state and lifecycle control, and enhanced REST API response efficiency by 15% through streamlined asynchronous JavaScript handling.',
      github: 'https://github.com/DurveshPatil888/Netflix-GPT',
      live: 'https://netflix-gpt-tpu9-hazel.vercel.app/',
    },
    foodify: {
      img: 'material/foodify.png',
      title: 'Foodify Food Ordering App',
      tags: ['React', 'Swiggy API', 'Redux'],
      description:
        'A food ordering application integrated with Swiggy public REST API endpoints and configured with a proxy server to bypass CORS constraints. Enhanced perceived application load performance by 25% using custom Shimmer UI placeholders. Enabled real-time network status monitoring using browser online and offline event listeners. Structured centralized cart state management using Redux, handling 10+ dynamic e-commerce interactions seamlessly.',
      github: 'https://github.com/DurveshPatil888/Foodify',
      live: 'https://foodify-ten-mu.vercel.app/',
    },
  };

  // Function to open the modal
  function openProjectModal(projectId) {
    const project = projectsData[projectId];
    if (project) {
      modalProjectImg.src = project.img;
      modalProjectImg.alt = project.title;
      modalProjectTitle.textContent = project.title;
      modalProjectDescription.textContent = project.description;

      // Clear previous tags and actions
      modalProjectTags.innerHTML = '';
      modalProjectActions.innerHTML = '';

      // Add tags
      project.tags.forEach((tag) => {
        const span = document.createElement('span');
        span.classList.add('modal-tag');
        span.textContent = tag;
        modalProjectTags.appendChild(span);
      });

      // Add actions (GitHub and Live buttons)
      if (project.github) {
        const githubBtn = document.createElement('a');
        githubBtn.href = project.github;
        githubBtn.target = '_blank';
        githubBtn.classList.add('modal-btn');
        githubBtn.innerHTML = '<i class="fab fa-github"></i> Code';
        modalProjectActions.appendChild(githubBtn);
      }
      if (project.live) {
        const liveBtn = document.createElement('a');
        liveBtn.href = project.live;
        liveBtn.target = '_blank';
        liveBtn.classList.add('modal-btn');
        liveBtn.innerHTML = '<i class="fa fa-external-link-alt"></i> Live';
        modalProjectActions.appendChild(liveBtn);
      }

      projectModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open

      // Accessibility: move focus into modal and trap it
      const focusable = projectModal.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusable = focusable[0];
      const lastFocusable = focusable[focusable.length - 1];
      // Remember previously focused element to restore later
      projectModal._previouslyFocused = document.activeElement;
      if (firstFocusable) firstFocusable.focus();

      // Focus trap handler
      function trap(e) {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
              e.preventDefault();
              lastFocusable.focus();
            }
          } else {
            if (document.activeElement === lastFocusable) {
              e.preventDefault();
              firstFocusable.focus();
            }
          }
        }
        if (e.key === 'Escape') {
          closeProjectModal();
        }
      }

      projectModal._trapHandler = trap;
      document.addEventListener('keydown', trap);
    }
  }

  // Function to close the modal
  function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    // Remove focus trap handler and restore focus
    if (projectModal._trapHandler) {
      document.removeEventListener('keydown', projectModal._trapHandler);
      projectModal._trapHandler = null;
    }

    // Restore focus to previously focused element if present
    try {
      const prev = projectModal._previouslyFocused;
      if (prev && typeof prev.focus === 'function') prev.focus();
    } catch (err) {
      /* ignore */
    }
  }

  // Event listeners for project cards
  projectCards.forEach((card) => {
    // Make card keyboard-focusable
    card.setAttribute('tabindex', '0');

    card.addEventListener('click', () => {
      const projectId = card.dataset.projectId;
      openProjectModal(projectId);
    });

    // Open modal on Enter or Space when card is focused
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const projectId = card.dataset.projectId;
        openProjectModal(projectId);
      }
    });
  });

  // Event listener for close button
  closeModalBtn.addEventListener('click', closeProjectModal);

  // Close modal when clicking outside of it
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      closeProjectModal();
    }
  });

  // Close modal on Escape key press
  // (Handled by focus trap attached when modal opens)

  // ********** COPY EMAIL + TOAST **********

  const copyEmailBtn = document.getElementById('copy-email-btn');
  const contactEmail = document.getElementById('contact-email');
  const toast = document.getElementById('toast');

  function showToast(message = 'Copied') {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2200);
  }

  if (copyEmailBtn && contactEmail) {
    copyEmailBtn.addEventListener('click', async (e) => {
      const email = contactEmail.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
        showToast('Email copied to clipboard');
      } catch (err) {
        // Fallback: select and use execCommand
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          showToast('Email copied to clipboard');
        } catch (e) {
          // Last-resort: open mail client
          window.location.href = `mailto:${email}`;
        }
        textarea.remove();
      }
    });
  }

  // *****************************************
});
