/**
 * Project Allecc - Contact Page JavaScript
 * Contains functionality specific to the contact page
 */

// DOM Elements
const contactForm = document.getElementById('contactForm');
const faqItems = document.querySelectorAll('.faq-item');

/**
 * Contact form submission handler
 * Processes form submission and displays success message
 */
const initializeContactForm = () => {
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send this data to a server
            // For now, we'll just collect the form data and show a success message
            
            const formElements = this.elements;
            let formData = {};
            
            for (let i = 0; i < formElements.length; i++) {
                const element = formElements[i];
                if (element.name && element.value) {
                    if (element.type === 'checkbox') {
                        formData[element.name] = element.checked;
                    } else {
                        formData[element.name] = element.value;
                    }
                }
            }
            
            console.log('Form data:', formData);
            
            // Reset form and show success message
            this.innerHTML = `
                <div style="text-align: center; padding: 40px 20px;">
                    <div style="font-size: 3rem; color: var(--primary-color); margin-bottom: 20px;">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h2 style="margin-bottom: 15px; color: var(--primary-color);">Message Sent!</h2>
                    <p style="margin-bottom: 30px; color: var(--gray-color);">Thank you for reaching out. We'll get back to you as soon as possible.</p>
                    <button onclick="location.reload()" class="btn btn-primary">Send Another Message</button>
                </div>
            `;
        });
    }
};

/**
 * FAQ toggle functionality
 * Shows/hides FAQ answers when questions are clicked
 */
const initializeFAQ = () => {
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Toggle active class on clicked item
                item.classList.toggle('active');
                
                // Close other FAQ items (optional - for accordion behavior)
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        });
    }
};

/**
 * Form validation functionality
 * Validates form inputs before submission
 */
const initializeFormValidation = () => {
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            // Add blur event to check validation when user leaves field
            input.addEventListener('blur', () => {
                validateInput(input);
            });
            
            // Add input event to remove error when user starts typing
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    input.classList.remove('error');
                    
                    // Remove error message if it exists
                    const errorMessage = input.parentElement.querySelector('.error-message');
                    if (errorMessage) {
                        errorMessage.remove();
                    }
                }
            });
        });
        
        // Add validation before form submission
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            
            // If form is not valid, prevent submission
            if (!isValid) {
                e.preventDefault();
            }
        });
    }
};

/**
 * Helper function to validate a single input
 * @param {HTMLElement} input - The input element to validate
 * @returns {boolean} - Whether the input is valid
 */
const validateInput = (input) => {
    let isValid = true;
    let errorMessage = '';
    
    // Check if input is empty
    if (input.value.trim() === '') {
        isValid = false;
        errorMessage = 'This field is required';
    } 
    // Email validation
    else if (input.type === 'email' && !validateEmail(input.value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    }
    
    // If invalid, add error class and message
    if (!isValid) {
        input.classList.add('error');
        
        // Add error message if it doesn't exist
        let existingError = input.parentElement.querySelector('.error-message');
        if (!existingError) {
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = errorMessage;
            errorElement.style.color = 'red';
            errorElement.style.fontSize = '0.85rem';
            errorElement.style.marginTop = '5px';
            
            input.parentElement.appendChild(errorElement);
        }
    } else {
        input.classList.remove('error');
        
        // Remove error message if it exists
        const errorElement = input.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    return isValid;
};

/**
 * Helper function to validate email format
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
};

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeContactForm();
    initializeFAQ();
    initializeFormValidation();
});