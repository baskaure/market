        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Scroll reveal animation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        // Apply scroll reveal to all elements
        document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right').forEach(el => {
            observer.observe(el);
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        });

        // Add hover effects to interactive elements
        document.querySelectorAll('.step-card, .feature-card, .stat').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Parallax effect for hero background
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Add loading animation
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            
            // Animate counters in stats
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = counter.textContent;
                const numericValue = parseInt(target.replace(/\D/g, ''));
                const prefix = target.replace(/\d/g, '');
                
                if (numericValue) {
                    let current = 0;
                    const increment = numericValue / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= numericValue) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = prefix + Math.floor(current);
                        }
                    }, 30);
                }
            });
        });

        // Add click effects to buttons
        document.querySelectorAll('.btn-primary, .btn-secondary, .btn-white, .btn-outline').forEach(btn => {
            btn.addEventListener('click', function(e) {
                // Create ripple effect
                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    width: 10px;
                    height: 10px;
                    pointer-events: none;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    left: ${e.offsetX}px;
                    top: ${e.offsetY}px;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add CSS for ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .loaded {
                animation: fadeIn 0.5s ease-in;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        // Add typing effect to main title (optional enhancement)
        const title = document.querySelector('.hero-content h1');
        if (title) {
            const text = title.textContent;
            title.textContent = '';
            let i = 0;
            
            setTimeout(() => {
                const typeWriter = setInterval(() => {
                    title.textContent += text.charAt(i);
                    i++;
                    if (i >= text.length) {
                        clearInterval(typeWriter);
                    }
                }, 50);
            }, 1000);
        }

        // Performance optimization: Intersection Observer for animations
        const performantObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.willChange = 'transform, opacity';
                    entry.target.classList.add('revealed');
                    performantObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        // Re-observe elements for better performance
        setTimeout(() => {
            document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right').forEach(el => {
                performantObserver.observe(el);
            });
        }, 100);
const logoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            logoObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.logos-grid .logo-item').forEach(item => {
    logoObserver.observe(item);
});


document.querySelector('.logo a').addEventListener('click', function(e){
    e.preventDefault(); // empêche le href par défaut
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
