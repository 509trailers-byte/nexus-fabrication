// Nexus Fabrication - Main JavaScript (Enhanced)

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navLinks.classList.remove('active');
        }
    });
}

// Form handling
const quoteForm = document.getElementById('quoteForm');
const formMessage = document.getElementById('formMessage');

if (quoteForm) {
    quoteForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            description: document.getElementById('description').value,
            timestamp: new Date().toISOString()
        };

        try {
            formMessage.textContent = 'Sending...';
            formMessage.style.color = 'var(--text-muted)';

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 800));

            formMessage.textContent = '✓ Quote request received! We\'ll be in touch within 24 hours.';
            formMessage.style.color = 'var(--accent-blue)';

            console.log('Quote request:', formData);

            // Clear form
            quoteForm.reset();

            // Clear message after 6 seconds
            setTimeout(() => {
                formMessage.textContent = '';
            }, 6000);

        } catch (error) {
            formMessage.textContent = '✕ Error sending request. Please call (360) 562-0477.';
            formMessage.style.color = '#ff6b6b';
            console.error('Form error:', error);
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile nav if open
            if (navLinks) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Fade in sections on scroll with stagger
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `slideUp 0.8s ease-out ${index * 0.1}s forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    observer.observe(section);
});

// Add active nav link styling on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
            link.style.color = 'var(--accent-blue)';
        } else {
            link.style.color = 'var(--text-light)';
        }
    });
});

// Service cards stagger animation
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.animation = `slideUp 0.6s ease-out ${0.2 + index * 0.15}s backwards`;
});
