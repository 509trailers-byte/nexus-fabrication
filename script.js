// Nexus Fabrication - Main JavaScript

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
    });
    
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
            formMessage.style.color = 'var(--text-secondary)';

            await new Promise(resolve => setTimeout(resolve, 800));

            formMessage.textContent = '✓ Quote request received! We\'ll be in touch within 24 hours.';
            formMessage.style.color = 'var(--accent)';

            console.log('Quote request:', formData);
            quoteForm.reset();

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
            if (navLinks) {
                navLinks.classList.remove('active');
            }
        }
    });
});
