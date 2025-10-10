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

  // ********** CORRECTED PRELOADER LOGIC (8 SEC COUNT + 2 SEC DELAY) **********
  if (preloader && loadPercentage && loaderBar) {
    let currentCount = 0;
    const interval = 30; // ms per update
    const finalCount = 100;

    // *** Total counting duration set to 8 seconds (8000ms) ***
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
    'Frontend Developer',
    'Wordpress Developer',
    'Elementor Specialist',
    'Freelancer',
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
    'beauty-zone': {
      img: 'BeautyZone.jpg',
      title: 'Beauty Zone Website',
      tags: ['HTML', 'CSS', 'Responsive'],
      description:
        'A sleek and responsive beauty salon website crafted with pure HTML and CSS. It features a modern design, clear service presentation, and a user-friendly interface optimized for all devices.',
      github: 'https://github.com/DurveshPatil888/Beauty-Zone',
      live: 'https://durveshpatil888.github.io/Beauty-Zone/',
    },
    'wine-shop': {
      img: 'WineShop .jpg',
      title: 'Wine Shop (WordPress)',
      tags: ['WordPress', 'Elementor', 'E-commerce'],
      description:
        'A sophisticated e-commerce website for a wine shop, built on WordPress. Utilizes Elementor for custom page layouts and seamless product showcasing, offering a rich user experience.',
      github: 'https://github.com/DurveshPatil888', // Replace with actual repo if available
      // No live link provided, so it will not show in modal
    },
    'tic-tac-toe': {
      img: 'TicTacToe.jpg',
      title: 'Tic-Tac-Toe Game',
      tags: ['HTML', 'CSS', 'JavaScript', 'Game'],
      description:
        'A classic Tic-Tac-Toe game developed using HTML, CSS, and JavaScript. It provides an interactive and engaging user experience directly in the browser.',
      github: 'https://github.com/DurveshPatil888/tic-tac-toe',
      live: 'https://durveshpatil888.github.io/tic-tac-toe/',
    },
    'whack-a-mole': {
      img: 'WhackaMoleGame.jpg',
      title: 'Whack a Mole Game',
      tags: ['HTML', 'CSS', 'JavaScript', 'Game'],
      description:
        'An exciting and interactive Whack-a-Mole game, developed with HTML, CSS, and JavaScript. Perfect for demonstrating dynamic DOM manipulation and event handling.',
      github: 'https://github.com/DurveshPatil888/whack-a-mole-game',
      live: 'https://durveshpatil888.github.io/whack-a-mole-game/',
    },
    'rock-paper-scissors': {
      img: 'RockPaperScissors.jpg',
      title: 'Rock Paper Scissors',
      tags: ['HTML', 'CSS', 'JavaScript', 'Game'],
      description:
        'A simple yet engaging Rock-Paper-Scissors game implemented using HTML, CSS, and JavaScript. Features a clear user interface and straightforward game logic for a quick play.',
      github: 'https://github.com/DurveshPatil888/Rock-Paper-Scissors',
      live: 'https://durveshpatil888.github.io/Rock-Paper-Scissors/',
    },
    'weather-app': {
      img: 'WeatherApp.jpg',
      title: 'Weather App',
      tags: ['HTML', 'CSS', 'JavaScript', 'API Integration'],
      description:
        'A dynamic weather application built with HTML, CSS, and JavaScript. It fetches real-time weather data for any specified city, providing current conditions and forecasts.',
      github: 'https://github.com/DurveshPatil888/Weather-app',
      live: 'https://durveshpatil888.github.io/Weather-app/',
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
    }
  }

  // Function to close the modal
  function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }

  // Event listeners for project cards
  projectCards.forEach((card) => {
    card.addEventListener('click', () => {
      const projectId = card.dataset.projectId;
      openProjectModal(projectId);
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
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // *****************************************
});
