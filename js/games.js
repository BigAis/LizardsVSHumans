/**
 * Project Allecc - Games Page JavaScript
 * Contains functionality specific to the games listing page
 */

// DOM Elements
const filterButtons = document.querySelectorAll('.filter-button');
const gameCards = document.querySelectorAll('.game-card');
const searchInput = document.querySelector('.search-input input');
const searchButton = document.querySelector('.search-input button');

/**
 * Game filtering functionality
 * Filters games based on selected category
 */
const initializeFiltering = () => {
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter category
                const filter = button.textContent.toLowerCase();
                
                // Show/hide games based on filter
                gameCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                    } else {
                        // Check if card has the selected category tag
                        const tags = card.querySelectorAll('.game-tags span');
                        const hasTag = Array.from(tags).some(tag => 
                            tag.textContent.toLowerCase() === filter
                        );
                        
                        // Check if card has the selected status badge
                        const badge = card.querySelector('.game-badge');
                        const hasStatus = badge && 
                            badge.textContent.toLowerCase() === filter;
                        
                        if (hasTag || hasStatus) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
};

/**
 * Search functionality
 * Filters games based on search input
 */
const initializeSearch = () => {
    if (searchInput && searchButton) {
        // Search function
        const performSearch = () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                // If search is empty, show all games
                gameCards.forEach(card => {
                    card.style.display = 'block';
                });
                return;
            }
            
            // Filter games based on search term
            gameCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                const tags = Array.from(card.querySelectorAll('.game-tags span'))
                    .map(tag => tag.textContent.toLowerCase());
                
                // Check if search term matches any content in the card
                if (title.includes(searchTerm) || 
                    description.includes(searchTerm) || 
                    tags.some(tag => tag.includes(searchTerm))) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        };
        
        // Add event listeners
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
};

/**
 * Pagination functionality
 * Handles page navigation
 */
const initializePagination = () => {
    const pageLinks = document.querySelectorAll('.page-link');
    
    if (pageLinks.length > 0) {
        pageLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all page links
                pageLinks.forEach(pageLink => pageLink.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');
                
                // In a real implementation, this would load the next page of games
                // For now, just scroll to top of games container
                document.querySelector('.games-container').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }
};

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeFiltering();
    initializeSearch();
    initializePagination();
});