/**
 * Project Allecc - Documentation Page JavaScript
 * Contains functionality specific to the documentation page
 */

// DOM Elements
const searchBox = document.querySelector('.search-box input');
const menuLinks = document.querySelectorAll('.docs-menu a');
const sections = document.querySelectorAll('.docs-section');

/**
 * Search functionality
 * Filters documentation content based on search input
 */
const initializeSearch = () => {
    if (searchBox) {
        searchBox.addEventListener('keyup', () => {
            const searchTerm = searchBox.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                // If search is empty, show all sections
                sections.forEach(section => {
                    section.style.display = 'block';
                });
                
                // Clear highlight from all text
                clearHighlights();
                return;
            }
            
            // Search through all sections
            sections.forEach(section => {
                const sectionContent = section.textContent.toLowerCase();
                
                if (sectionContent.includes(searchTerm)) {
                    section.style.display = 'block';
                    
                    // Highlight matching text
                    highlightText(section, searchTerm);
                } else {
                    section.style.display = 'none';
                }
            });
        });
    }
};

/**
 * Helper function to highlight matching text in a section
 * @param {HTMLElement} section - The section to highlight text in
 * @param {string} searchTerm - The search term to highlight
 */
const highlightText = (section, searchTerm) => {
    // First clear any existing highlights
    clearHighlights();
    
    // Get all text nodes in the section
    const walker = document.createTreeWalker(
        section,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const textNodes = [];
    let node;
    
    while (node = walker.nextNode()) {
        // Skip nodes in script or style elements
        if (!['SCRIPT', 'STYLE'].includes(node.parentNode.tagName)) {
            textNodes.push(node);
        }
    }
    
    // Highlight matching text in each text node
    textNodes.forEach(textNode => {
        const text = textNode.nodeValue;
        const lowerText = text.toLowerCase();
        const index = lowerText.indexOf(searchTerm);
        
        if (index >= 0) {
            const before = text.slice(0, index);
            const match = text.slice(index, index + searchTerm.length);
            const after = text.slice(index + searchTerm.length);
            
            const span = document.createElement('span');
            span.className = 'search-highlight';
            span.style.backgroundColor = 'rgba(106, 13, 173, 0.2)';
            span.style.padding = '0 2px';
            span.style.borderRadius = '3px';
            span.textContent = match;
            
            const fragment = document.createDocumentFragment();
            fragment.appendChild(document.createTextNode(before));
            fragment.appendChild(span);
            fragment.appendChild(document.createTextNode(after));
            
            textNode.parentNode.replaceChild(fragment, textNode);
        }
    });
};

/**
 * Helper function to clear all highlighted text
 */
const clearHighlights = () => {
    const highlights = document.querySelectorAll('.search-highlight');
    
    highlights.forEach(highlight => {
        const parent = highlight.parentNode;
        const text = document.createTextNode(highlight.textContent);
        parent.replaceChild(text, highlight);
        parent.normalize();
    });
};

/**
 * Navigation functionality
 * Adds smooth scrolling and active state to section links
 */
const initializeNavigation = () => {
    if (menuLinks.length > 0) {
        menuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Get the target section id from href
                const targetId = link.getAttribute('href');
                
                // Only handle internal links (those starting with #)
                if (targetId.startsWith('#')) {
                    e.preventDefault();
                    
                    // Find the target section
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        // Scroll to section
                        targetSection.scrollIntoView({
                            behavior: 'smooth'
                        });
                        
                        // Update active link
                        menuLinks.forEach(menuLink => menuLink.classList.remove('active'));
                        link.classList.add('active');
                    }
                }
            });
        });
    }
};

/**
 * Scroll spy functionality
 * Updates active nav link based on scroll position
 */
const initializeScrollSpy = () => {
    window.addEventListener('scroll', () => {
        // Get current scroll position
        const scrollPosition = window.scrollY;
        
        // Check each section's position
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // Check if we're in this section
            if (scrollPosition >= sectionTop - 100 && 
                scrollPosition < sectionTop + sectionHeight - 100) {
                
                // Get the ID of the current section
                const id = section.getAttribute('id');
                
                // Update active link
                menuLinks.forEach(link => {
                    link.classList.remove('active');
                    
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
};

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeSearch();
    initializeNavigation();
    initializeScrollSpy();
});