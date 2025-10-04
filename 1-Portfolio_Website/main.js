// Rotating Text Animation: cycles through roles with fade effect
const roles = ["FrontEnd Developer", "YouTuber", "Ui Designer", "Graphics Designer"];
let currentRoleIndex = 0;

function rotateRole() {
    const roleElement = document.getElementById("role");
    roleElement.classList.add("fade-out");

    setTimeout(() => {
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        roleElement.textContent = roles[currentRoleIndex];
        roleElement.classList.remove("fade-out");
        roleElement.classList.add("fade-in");

        setTimeout(() => {
            roleElement.classList.remove("fade-in");
        }, 500);
    }, 500);
}

setInterval(rotateRole, 3000);

// Portfolio Slider: handles slide display and navigation
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function changeSlide(direction) {
    currentSlideIndex += direction;

    if (currentSlideIndex >= slides.length) currentSlideIndex = 0;
    else if (currentSlideIndex < 0) currentSlideIndex = slides.length - 1;

    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

setInterval(() => changeSlide(1), 5000);

// Scroll Reveal Animation: triggers animations on elements entering viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');

            if (entry.target.id === 'about') {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.width = bar.getAttribute('data-width');
                    }, index * 300);
                });
            }

            if (entry.target.id === 'services') {
                const serviceCards = entry.target.querySelectorAll('.service-card');
                serviceCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '0';
                        card.style.transition = 'all 0.6s ease';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    }, index * 200);
                });
            }

            if (entry.target.classList.contains('education-section') || entry.target.classList.contains('experience-section')) {
                const timelineItems = entry.target.querySelectorAll('.timeline-item');
                timelineItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(30px)';
                        item.style.transition = 'all 0.6s ease';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    }, index * 300);
                });
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
});

// Smooth scrolling for anchor navigation with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// Enhanced Form Submission: validation, loading animation, and notifications
document.querySelector('.contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const button = this.querySelector('.btn-submit');
    const buttonText = button.querySelector('.btn-text');
    const spinner = button.querySelector('.loading-spinner');
    const name = this.querySelector('input[placeholder="Your Name"]').value;
    const email = this.querySelector('input[placeholder="Your Email"]').value;
    const message = this.querySelector('textarea').value;

    if (!name || !email || !message) {
        this.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => { this.style.animation = ''; }, 500);
        showNotification('Please fill in all required fields.', 'error');
        return;
    }

    button.style.pointerEvents = 'none';
    buttonText.style.opacity = '0';
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none';
        buttonText.textContent = 'Message Sent!';
        buttonText.style.opacity = '1';
        button.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
        showNotification('Thank you for your message! I will get back to you soon.', 'success');

        setTimeout(() => {
            buttonText.textContent = 'Send Message';
            button.style.background = 'linear-gradient(135deg, #00d4ff, #0099cc)';
            button.style.pointerEvents = 'auto';
            this.reset();
        }, 3000);
    }, 2000);
});

// Notification system: displays temporary success or error messages
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    `;

    notification.style.background = type === 'success'
        ? 'linear-gradient(135deg, #28a745, #20c997)'
        : 'linear-gradient(135deg, #dc3545, #c82333)';

    document.body.appendChild(notification);

    setTimeout(() => { notification.style.transform = 'translateX(0)'; }, 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 5000);
}

// Add CSS keyframes and fade classes dynamically
const shakeKeyframes = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    .fade-out { opacity: 0; }
    .fade-in { opacity: 1; }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = shakeKeyframes;
document.head.appendChild(styleSheet);

// Navbar active link highlighting based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav-desktop .nav-link');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

// Parallax effect on hero section on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    const parallaxSpeed = 0.5;

    if (heroSection && scrolled < window.innerHeight) {
        heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// Hover effect on service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        if (!this.classList.contains('active')) {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        }
    });
    card.addEventListener('mouseleave', function () {
        if (!this.classList.contains('active')) {
            this.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// Click ripple effect for buttons and social icons
document.querySelectorAll('.btn-download, .btn-submit, .social-icon').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Ripple animation keyframes
const rippleKeyframes = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
const rippleStyleSheet = document.createElement('style');
rippleStyleSheet.textContent = rippleKeyframes;
document.head.appendChild(rippleStyleSheet);

// Initialize animations and skill bars on page load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    document.querySelectorAll('.service-icon').forEach((icon, index) => {
        setTimeout(() => {
            icon.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`;
        }, 1000);
    });

    document.querySelectorAll('.skill-progress').forEach(bar => {
        bar.style.width = '0';
    });
});

// Update current year dynamically
document.getElementById('current-year').textContent = new Date().getFullYear();

// Expose slider functions globally
window.changeSlide = changeSlide;
window.currentSlide = currentSlide;
