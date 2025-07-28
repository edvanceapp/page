// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation link clicks
    const navLinks = document.querySelectorAll('.nav-link, .cta-button');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // If it's an external link or different page, allow normal navigation
            if (href && !href.startsWith('#')) {
                return; // Allow normal navigation
            }
            
            e.preventDefault();
            
            const targetId = href;
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle waitlist form submission
    const waitlistForm = document.getElementById('waitlist-form');
    const successMessage = document.getElementById('success-message');
    
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('email');
            const email = emailInput.value.trim();
            
            if (email) {
                // Here you would typically send the email to your backend
                // For now, we'll just show the success message
                console.log('Email submitted:', email);
                
                // Hide the form and show success message
                waitlistForm.style.display = 'none';
                successMessage.style.display = 'flex';
                
                // Clear the form
                emailInput.value = '';
                
                // Optional: Scroll to show the success message
                setTimeout(() => {
                    successMessage.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 100);
            }
        });
    }

    // Add subtle scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Add intersection observer for smooth animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-block, .hero-content, .hero-visual, .advanced-features, .feature-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add loading state to form submission
    const submitButton = document.querySelector('.submit-button');
    if (submitButton) {
        const originalText = submitButton.textContent;
        
        waitlistForm.addEventListener('submit', function() {
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;
            
            // Reset button after a delay (simulating API call)
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
});

// Handle platform preview tabs
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.preview-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and panels
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            document.getElementById(targetTab + '-panel').classList.add('active');
        });
    });
    
    // Auto-rotate tabs every 4 seconds
    let currentTabIndex = 0;
    setInterval(() => {
        currentTabIndex = (currentTabIndex + 1) % tabs.length;
        const targetTab = tabs[currentTabIndex];
        const targetTabName = targetTab.getAttribute('data-tab');
        
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        
        targetTab.classList.add('active');
        document.getElementById(targetTabName + '-panel').classList.add('active');
    }, 4000);
}); 