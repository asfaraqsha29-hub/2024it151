// Sunrise Hotel Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    }
    
    // Header Scroll Effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#ffffff';
            header.style.backdropFilter = 'none';
        }
    });
    
    // Form Handling
    const contactForms = document.querySelectorAll('.contact-form, .newsletter-form, .inquiry-form, #testimonialForm');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.border = '1px solid #e74c3c';
                } else {
                    input.style.border = '';
                }
                
                // Email validation
                if (input.type === 'email' && input.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        isValid = false;
                        input.style.border = '1px solid #e74c3c';
                    }
                }
            });
            
            if (isValid) {
                // Show success message
                const formContainer = this.parentElement;
                formContainer.innerHTML = `
                    <div class="form-success" style="text-align: center; padding: 2rem;">
                        <i class="fas fa-check-circle" style="font-size: 3rem; color: #27ae60; margin-bottom: 1rem;"></i>
                        <h3>Thank You!</h3>
                        <p>Your message has been sent successfully. We'll get back to you soon.</p>
                    </div>
                `;
                
                // In a real application, you would send the data to a server here
                console.log('Form submitted successfully');
            } else {
                // Show error message
                const errorElement = this.querySelector('.form-error') || document.createElement('div');
                errorElement.className = 'form-error';
                errorElement.innerHTML = 'Please fill in all required fields correctly.';
                errorElement.style.color = '#e74c3c';
                errorElement.style.marginBottom = '1rem';
                errorElement.style.textAlign = 'center';
                
                if (!this.querySelector('.form-error')) {
                    this.insertBefore(errorElement, this.firstChild);
                }
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Room Image Gallery (for room detail pages)
    const roomGalleries = document.querySelectorAll('.room-gallery');
    
    roomGalleries.forEach(gallery => {
        const mainImage = gallery.querySelector('img');
        const imageSources = [
            'images/room-gallery-1.jpg',
            'images/room-gallery-2.jpg',
            'images/room-gallery-3.jpg'
        ];
        
        // Create thumbnail gallery
        const thumbnailContainer = document.createElement('div');
        thumbnailContainer.className = 'room-thumbnails';
        thumbnailContainer.style.display = 'flex';
        thumbnailContainer.style.gap = '10px';
        thumbnailContainer.style.marginTop = '10px';
        thumbnailContainer.style.flexWrap = 'wrap';
        
        imageSources.forEach((src, index) => {
            const thumb = document.createElement('img');
            thumb.src = src;
            thumb.alt = `Room view ${index + 1}`;
            thumb.style.width = '60px';
            thumb.style.height = '60px';
            thumb.style.objectFit = 'cover';
            thumb.style.cursor = 'pointer';
            thumb.style.borderRadius = '4px';
            thumb.style.opacity = '0.7';
            thumb.style.transition = 'all 0.3s ease';
            
            thumb.addEventListener('mouseenter', function() {
                this.style.opacity = '1';
                this.style.transform = 'scale(1.1)';
            });
            
            thumb.addEventListener('mouseleave', function() {
                if (mainImage.src !== this.src) {
                    this.style.opacity = '0.7';
                    this.style.transform = 'scale(1)';
                }
            });
            
            thumb.addEventListener('click', function() {
                mainImage.src = this.src;
                thumbnailContainer.querySelectorAll('img').forEach(img => {
                    img.style.opacity = '0.7';
                    img.style.transform = 'scale(1)';
                });
                this.style.opacity = '1';
                this.style.transform = 'scale(1.1)';
            });
            
            thumbnailContainer.appendChild(thumb);
        });
        
        gallery.appendChild(thumbnailContainer);
    });
    
    // Testimonial Slider (for testimonials page)
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        let currentTestimonial = 0;
        const testimonials = testimonialSlider.querySelectorAll('.testimonial-item');
        const totalTestimonials = testimonials.length;
        
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
            });
        }
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
            showTestimonial(currentTestimonial);
        }, 5000);
        
        showTestimonial(0);
    }
    
    // Booking Form Date Picker Enhancement
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        // Set min date to today
        const today = new Date().toISOString().split('T')[0];
        input.min = today;
        
        // Add custom styling
        input.addEventListener('focus', function() {
            this.style.borderColor = '#d4af37';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = '';
        });
    });
    
    // Newsletter Subscription Animation
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                    submitBtn.style.background = '#27ae60';
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                        this.reset();
                    }, 2000);
                }, 1500);
            }
        });
    });
    
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const answer = item.querySelector('p');
        answer.style.display = 'none';
        
        item.addEventListener('click', function() {
            const isOpen = answer.style.display === 'block';
            
            // Close all other FAQ items
            faqItems.forEach(faq => {
                if (faq !== item) {
                    faq.querySelector('p').style.display = 'none';
                    faq.style.background = 'var(--white)';
                }
            });
            
            // Toggle current item
            answer.style.display = isOpen ? 'none' : 'block';
            item.style.background = isOpen ? 'var(--white)' : 'var(--background-light)';
        });
    });
    
    // Image Lazy Loading
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    console.log('Sunrise Hotel website loaded successfully!');
});