/**
 * Project Allecc - Game Detail Page JavaScript
 * Contains functionality specific to individual game pages
 */

// DOM Elements
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

/**
 * Tabs functionality
 * Switches between content tabs when clicked
 */
const initializeTabs = () => {
    if (tabButtons.length > 0) {
        // Set default active tab
        tabButtons[0].classList.add('active');
        tabContents[0].classList.add('active');
        
        // Add click event to each tab button
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and content
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Find corresponding content and make it active
                const target = button.getAttribute('data-target');
                const targetContent = document.querySelector(target);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
};

/**
 * Image gallery functionality
 * Shows larger version of screenshots when clicked
 */
const initializeGallery = () => {
    const mediaItems = document.querySelectorAll('.media-item');
    
    mediaItems.forEach(item => {
        item.addEventListener('click', () => {
            // In a full implementation, this would open a lightbox
            // For now, we'll just add a simple scale effect
            const img = item.querySelector('img');
            img.style.transform = 'scale(1.05)';
            setTimeout(() => {
                img.style.transform = '';
            }, 300);
        });
    });
};

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeTabs();
    initializeGallery();
});