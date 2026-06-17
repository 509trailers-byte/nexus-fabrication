// Nexus Fabrication - Main JavaScript

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
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

            // For now, just show success message
            // In production, this would post to a backend API (Supabase)
            await new Promise(resolve => setTimeout(resolve, 500));

            formMessage.textContent = 'Quote request received! We\'ll be in touch within 24 hours.';
            formMessage.style.color = 'var(--accent-blue)';

            // Log to console for demonstration
            console.log('Quote request:', formData);

            // Clear form
            quoteForm.reset();

            // Clear message after 5 seconds
            setTimeout(() => {
                formMessage.textContent = '';
            }, 5000);

        } catch (error) {
            formMessage.textContent = 'Error sending request. Please call (360) 562-0477.';
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
                navLinks.style.display = 'none';
            }
        }
    });
});

// Fade in sections on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
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
        }
    });
});
