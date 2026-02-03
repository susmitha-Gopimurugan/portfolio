// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Typing animation
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

window.addEventListener('load', () => {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    const originalText = subtitle.textContent;
    setTimeout(() => {
        typeWriter(subtitle, originalText, 80);
    }, 1000);
});

// Animate statistics counters
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    updateCounter();
}

// Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');

            if (entry.target.classList.contains('about-stats')) {
                const counters = entry.target.querySelectorAll('.stat h3');
                counters.forEach(counter => {
                    const target = parseInt(counter.textContent);
                    animateCounter(counter, target);
                });
            }
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.skill-category, .project-card, .timeline-item, .about-stats'
    );
    animateElements.forEach(el => observer.observe(el));
});

// Skill hover effect
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.1) rotate(5deg)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// ✅ FIXED Project cards tilt effect (LINKS NOW WORK)
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.project-card').forEach(card => {

        card.addEventListener('mousemove', e => {

            // 🔑 allow clicks on links
            if (e.target.closest('.project-link')) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateX = (y - rect.height / 2) / 10;
            const rotateY = (rect.width / 2 - x) / 10;

            card.style.transform =
                `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform =
                'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
});

// Parallax effect
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${window.pageYOffset * 0.5}px)`;
    }
});

// Keyboard navigation
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Page load animation
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
