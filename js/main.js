/**
 * Project Allecc - Main JavaScript
 * Contains functionality shared across all pages
 */

// DOM Elements
const nav = document.querySelector('nav');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

// Navigation scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a nav link
if (navMenu) {
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

/**
 * Animation on scroll functionality
 * Animates elements when they come into view
 */
const animateOnScroll = () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    animatedElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animated');
        }
    });
};

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial animation classes
    document.querySelectorAll('.highlight-card, .news-card, .featured-content, .about-section, .team-member, .award-item, .game-card, .timeline-item').forEach(element => {
        element.classList.add('animate-on-scroll');
    });
    
    // Run animation check on initial load
    animateOnScroll();
    
    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
});

/**
 * Newsletter form submission handler
 * Displays success message on form submission
 */
const handleNewsletterSubmit = () => {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            
            // In a real implementation, you would send this to a server
            // For now, we'll just show a confirmation message
            newsletterForm.innerHTML = `<p class="success-message">Thanks for subscribing with ${email}! You'll receive our next newsletter soon.</p>`;
        });
    }
};

// Initialize newsletter form handler
handleNewsletterSubmit();