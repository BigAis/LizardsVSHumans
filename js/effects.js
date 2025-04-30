/**
 * Project Allecc - Enhanced Effects and Animations
 * Contains additional visual effects for the entire website
 */

// DOM Elements
const body = document.body;
const heroSection = document.querySelector('.hero');
const loadingOverlay = document.createElement('div');

/**
 * Page Loading Animation
 * Shows a loading animation when the page loads
 */
const initializePageLoader = () => {
    // Create loading overlay
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loader"></div>
        <div class="loader-text">Loading</div>
    `;
    
    // Add to DOM
    body.appendChild(loadingOverlay);
    
    // Prevent scrolling during load
    body.style.overflow = 'hidden';
    
    // Hide loader after content loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
            body.style.overflow = '';
            initializePageAnimations();
        }, 800); // Adjust time as needed
    });
};

/**
 * Initialize page animations after loading
 * Triggers animations for page elements
 */
const initializePageAnimations = () => {
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('fade-in-up');
    }
    
    // Animate sequential elements
    const animatedElements = document.querySelectorAll('.highlight-card, .news-card, .team-member, .award-item');
    animatedElements.forEach((element, index) => {
        // Add staggered delay
        element.classList.add('fade-in-up');
        element.style.animationDelay = `${(index + 1) * 0.1}s`;
    });
    
    // Animate game banner if present
    const gameBanner = document.querySelector('.game-banner-content');
    if (gameBanner) {
        gameBanner.classList.add('animated');
    }
};

/**
 * Hero Particles Effect
 * Creates animated particles in the hero section
 */
const createHeroParticles = () => {
    if (heroSection) {
        // Create particles container
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'hero-particles';
        
        // Create particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random size between 2-5px
            const size = Math.random() * 3 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.left = `${Math.random() * 100}%`;
            
            // Random opacity
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            
            // Random animation
            const animationDuration = Math.random() * 20 + 10;
            particle.style.animation = `float ${animationDuration}s infinite ease-in-out`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            
            particlesContainer.appendChild(particle);
        }
        
        // Insert before content to ensure it's behind
        heroSection.insertBefore(particlesContainer, heroSection.firstChild);
    }
};

/**
 * Parallax Scrolling Effect
 * Creates a subtle parallax effect on scroll
 */
const initializeParallax = () => {
    const parallaxElements = document.querySelectorAll('.featured-image, .about-image, .team-image');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        parallaxElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top + scrollPosition;
            const elementVisible = window.innerHeight;
            
            if (elementTop < scrollPosition + elementVisible) {
                const distance = (scrollPosition - elementTop) * 0.1;
                const maxDistance = 30;
                
                // Limit the parallax effect
                const parallaxValue = Math.min(distance, maxDistance);
                
                element.style.transform = `translateY(${parallaxValue}px)`;
            }
        });
    });
};

/**
 * Cursor Effects
 * Adds custom cursor effects
 */
const initializeCursorEffects = () => {
    // Create cursor elements
    const cursor = document.createElement('div');
    const cursorFollower = document.createElement('div');
    
    // Add to DOM
    cursor.classList.add('cursor');
    cursorFollower.classList.add('cursor-follower');
    document.body.appendChild(cursor);
    document.body.appendChild(cursorFollower);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .cursor {
            position: fixed;
            width: 10px;
            height: 10px;
            background-color: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 9999;
        }
        
        .cursor-follower {
            position: fixed;
            width: 30px;
            height: 30px;
            border: 2px solid var(--secondary-color);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            transition: transform 0.1s, border-color 0.3s;
            z-index: 9998;
        }
        
        a:hover ~ .cursor-follower,
        button:hover ~ .cursor-follower {
            transform: translate(-50%, -50%) scale(1.5);
            border-color: var(--tertiary-color);
        }
    `;
    document.head.appendChild(style);
    
    // Track cursor position
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        // Add slight delay to follower
        setTimeout(() => {
            cursorFollower.style.left = `${e.clientX}px`;
            cursorFollower.style.top = `${e.clientY}px`;
        }, 50);
    });
    
    // Hide on mouseout
    document.addEventListener('mouseout', () => {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    });
    
    // Show on mouseover
    document.addEventListener('mouseover', () => {
        cursor.style.display = 'block';
        cursorFollower.style.display = 'block';
    });
};

/**
 * Text Scramble Effect
 * Creates a text scrambling animation for headings
 */
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0; i < this.queue.length; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble-text">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

/**
 * Initialize text scramble effect
 */
const initializeTextScramble = () => {
    // Add the necessary style
    const style = document.createElement('style');
    style.textContent = `
        .scramble-text {
            color: var(--secondary-color);
        }
    `;
    document.head.appendChild(style);
    
    // Apply to main headings
    const headings = document.querySelectorAll('h1, h2.section-header');
    
    headings.forEach(heading => {
        // Store original text
        const originalText = heading.textContent;
        
        // Create scramble instance
        const scrambler = new TextScramble(heading);
        
        // Detect when element comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    scrambler.setText(originalText);
                    observer.unobserve(heading);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(heading);
    });
};

/**
 * Interactive Backgrounds
 * Creates interactive background effects
 */
const initializeInteractiveBackgrounds = () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        section.addEventListener('mousemove', (e) => {
            // Calculate mouse position relative to section
            const rect = section.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Get section dimensions
            const width = rect.width;
            const height = rect.height;
            
            // Calculate percentage position
            const xPercent = x / width;
            const yPercent = y / height;
            
            // Create gradient effect following mouse
            section.style.background = `radial-gradient(
                circle at ${xPercent * 100}% ${yPercent * 100}%,
                rgba(255, 255, 255, 0.03),
                transparent
            )`;
        });
    });
};

/**
 * Page Transition Effect
 * Adds smooth transitions between pages
 */
const initializePageTransitions = () => {
    // Create transition overlay
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'page-transition';
    document.body.appendChild(transitionOverlay);
    
    // Add event listeners to all internal links
    document.querySelectorAll('a').forEach(link => {
        // Only apply to internal links that aren't anchors
        if (
            link.hostname === window.location.hostname && 
            link.pathname !== window.location.pathname &&
            !link.hash &&
            !link.getAttribute('target')
        ) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const destination = link.href;
                
                // Trigger transition animation
                transitionOverlay.classList.add('active');
                
                // Navigate after animation completes
                setTimeout(() => {
                    window.location.href = destination;
                }, 500);
            });
        }
    });
};

/**
 * Mouse trail effect
 * Creates a particle trail following the mouse
 */
const initializeMouseTrail = () => {
    // Create mouse trail container
    const trailContainer = document.createElement('canvas');
    trailContainer.id = 'mouse-trail';
    trailContainer.style.position = 'fixed';
    trailContainer.style.top = '0';
    trailContainer.style.left = '0';
    trailContainer.style.pointerEvents = 'none';
    trailContainer.style.zIndex = '9997';
    trailContainer.width = window.innerWidth;
    trailContainer.height = window.innerHeight;
    document.body.appendChild(trailContainer);
    
    // Get canvas context
    const ctx = trailContainer.getContext('2d');
    
    // Create particles array
    let particles = [];
    const maxParticles = 50;
    
    // Mouse position
    let mouse = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    };
    
    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        
        // Create new particle at mouse position
        particles.push({
            x: mouse.x,
            y: mouse.y,
            size: Math.random() * 3 + 1,
            color: `hsl(${Math.random() * 60 + 260}, 100%, 50%)`,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
            life: 20
        });
        
        // Limit particles array length
        if (particles.length > maxParticles) {
            particles.shift();
        }
    });
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, trailContainer.width, trailContainer.height);
        
        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            
            // Update particle position
            p.x += p.speedX;
            p.y += p.speedY;
            p.life--;
            
            // Remove dead particles
            if (p.life <= 0) {
                particles.splice(i, 1);
                i--;
                continue;
            }
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life / 20;
            ctx.fill();
        }
        
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Update canvas size on window resize
    window.addEventListener('resize', () => {
        trailContainer.width = window.innerWidth;
        trailContainer.height = window.innerHeight;
    });
};

/**
 * Tilt effect for cards
 * Creates a 3D tilt effect for cards on hover
 */
const initializeTiltEffect = () => {
    const cards = document.querySelectorAll('.game-card, .team-member, .award-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            card.style.transition = 'none';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s ease';
        });
    });
};

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
    initializePageLoader();
    createHeroParticles();
    initializeParallax();
    initializeTextScramble();
    initializeInteractiveBackgrounds();
    initializePageTransitions();
    initializeTiltEffect();
    
    // Only initialize these effects on desktops
    if (window.innerWidth > 1024) {
        initializeCursorEffects();
        initializeMouseTrail();
    }
});