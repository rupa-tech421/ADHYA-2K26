// DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {

    // --- Hero Intro Animation V2 (Cinematic) ---
    const introOverlay = document.getElementById('intro-animation');
    if (introOverlay) {
        document.body.style.overflow = 'hidden';

        // Elements
        const shockwave = document.querySelector('.intro-shockwave');
        const gridContainer = document.querySelector('.intro-grid-container');
        const title = document.querySelector('.intro-title');
        const content = document.querySelector('.intro-content');
        const flashOverlay = document.querySelector('.intro-flash-overlay');
        const tagline = document.querySelector('.intro-tagline');

        // Helper: Split Text for subtle glitter later
        const splitText = (selector) => {
            const el = document.querySelector(selector);
            if (!el) return;
            const text = el.innerText;
            el.innerHTML = '';
            text.split('').forEach(char => {
                const span = document.createElement('span');
                span.innerText = char;
                span.classList.add('intro-char');
                el.appendChild(span);
            });
        };
        splitText('#intro-text-1');
        splitText('#intro-text-2');

        // Particle System V2
        const particlesContainer = document.getElementById('intro-particles');
        if (particlesContainer) {
            for (let i = 0; i < 40; i++) {
                const particle = document.createElement('div');
                particle.classList.add('intro-particle');

                // Random 3D positioning
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                const delay = Math.random() * 2;

                particle.style.left = `${x}%`;
                particle.style.top = `${y}%`;
                particle.style.width = Math.random() * 3 + 'px';
                particle.style.height = particle.style.width;
                particle.style.animationDelay = `${delay}s`;

                particlesContainer.appendChild(particle);
            }
        }

        // --- TIMELINE SEQUENCE ---

        // 1. Shockwave Pulse (0.5s)
        setTimeout(() => {
            if (shockwave) shockwave.classList.add('pulse');
        }, 500);

        // 2. Grid Explosion (1.0s)
        setTimeout(() => {
            if (gridContainer) gridContainer.classList.add('active');
        }, 1000);

        // 3. THE SLAM & FLASH (1.5s)
        setTimeout(() => {
            if (title) title.classList.add('slam');
            if (flashOverlay) flashOverlay.classList.add('flash');

            // Screen Shake Effect
            if (content) content.classList.add('shake');

            // Add glitches to random characters
            const chars = document.querySelectorAll('.intro-char');
            chars.forEach(char => {
                if (Math.random() > 0.8) char.classList.add('glitch-active');
            });
        }, 1500);

        // 4. Tagline & Stabilize (2.5s)
        setTimeout(() => {
            if (tagline) tagline.classList.add('reveal');
            if (title) title.classList.add('stabilize');
        }, 2500);

        // 5. Exit (6.0s)
        setTimeout(() => {
            introOverlay.classList.add('fade-out');
            document.body.style.overflow = 'visible';
        }, 6000);

        // 6. Cleanup
        setTimeout(() => {
            introOverlay.style.display = 'none';
        }, 7500);
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Progress Bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const scrollProgress = document.getElementById("scroll-progress");
        if (scrollProgress) scrollProgress.style.width = scrolled + "%";
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // --- Countdown Timer ---
    // Target Date: Feb 7, 2026 (Using 2026 to show future countdown as requested for visual demo)
    // If you want actual fest date 2025, change year to 2025.
    const targetDate = new Date('February 7, 2026 10:00:00').getTime();

    const countdownTimer = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdownTimer);
            document.getElementById('countdown').classList.add('hidden');
            document.querySelector('.countdown-label').classList.add('hidden');
            document.getElementById('event-live-msg').classList.remove('hidden');
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days < 10 ? '0' + days : days;
        document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;

    }, 1000);

    // --- Active Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Modal Logic ---
    const modal = document.getElementById('modal');
    const registerBtn = document.getElementById('register-btn');
    const closeBtn = document.querySelector('.close-btn');



    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    }

    // Close on click outside
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.classList.remove('show');
        }
    });

    // --- Simple Parallax Effect for Hero ---
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth - e.pageX * 2) / 100;
            const y = (window.innerHeight - e.pageY * 2) / 100;

            // Move orbs slightly
            const orbs = document.querySelectorAll('.glow-orb');
            orbs.forEach(orb => {
                orb.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }
});
function openForm() {
    document.getElementById("registrationForm").style.display = "block";
}
