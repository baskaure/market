// Curseur personnalisé
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    // Mise à jour de la position du curseur
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Animation fluide du suiveur
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Effets de survol
    document.querySelectorAll('a, button, .magnetic-btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            follower.style.transform = 'scale(1.5)';
            follower.style.borderColor = '#ff0080';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            follower.style.transform = 'scale(1)';
            follower.style.borderColor = '#00ff88';
        });
    });
});

// Système de particules
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        for (let i = 0; i < 100; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: Math.random() > 0.5 ? '#00ff88' : '#0080ff'
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            // Mouvement
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Attraction vers la souris
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                particle.vx += dx * 0.0001;
                particle.vy += dy * 0.0001;
            }
            
            // Rebond sur les bords
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Dessin
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fill();
            
            // Connexions entre particules
            this.particles.slice(index + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 80) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = particle.color;
                    this.ctx.globalAlpha = (80 - distance) / 80 * 0.2;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialisation du système de particules
new ParticleSystem();

// Slider de témoignages amélioré
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.testimonial-slider');
    const slides = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-arrow.prev');
    const nextBtn = document.querySelector('.testimonial-arrow.next');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    let currentIndex = 0;
    let isAnimating = false;

    function updateSlider() {
        if (isAnimating) return;
        isAnimating = true;
        
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Effet de parallaxe sur les cartes
        slides.forEach((slide, index) => {
            const offset = (index - currentIndex) * 20;
            slide.style.transform = `translateZ(${offset}px)`;
        });
        
        setTimeout(() => {
            isAnimating = false;
        }, 600);
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        updateSlider();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentIndex = parseInt(dot.dataset.index);
            updateSlider();
        });
    });
    
    // Auto-play avec pause au survol
    let autoPlay = setInterval(() => {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        updateSlider();
    }, 5000);
    
    slider.addEventListener('mouseenter', () => clearInterval(autoPlay));
    slider.addEventListener('mouseleave', () => {
        autoPlay = setInterval(() => {
            currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
            updateSlider();
        }, 5000);
    });
});

// Scroll révélateur amélioré
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            
            // Effet de compteur pour les statistiques
            if (entry.target.classList.contains('modern-stat')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Animation des compteurs
function animateCounter(element) {
    const numberElement = element.querySelector('.stat-number');
    const targetText = numberElement.textContent;
    const targetNumber = parseInt(targetText.replace(/\D/g, ''));
    
    if (targetNumber) {
        let current = 0;
        const increment = targetNumber / 60;
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetNumber) {
                numberElement.textContent = targetText;
                clearInterval(timer);
            } else {
                const prefix = targetText.replace(/\d/g, '');
                numberElement.textContent = prefix + Math.floor(current);
            }
        }, 16);
    }
}

// Observer tous les éléments animés
document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .modern-stat').forEach(el => {
    observer.observe(el);
});

// Effet magnétique pour les boutons
document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0) scale(1)';
    });
});

// Effet de parallaxe au scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Effet sur le header
    const header = document.querySelector('.header');
    if (scrolled > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.boxShadow = '0 10px 30px rgba(0, 255, 136, 0.1)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.9)';
        header.style.boxShadow = 'none';
    }
});

// Smooth scroll amélioré
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

// Effet de typing pour le titre principal
function typeWriter(element, text, speed = 100) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    setTimeout(type, 1000);
}

// Effet de glitch sur certains éléments
function addGlitchEffect() {
    document.querySelectorAll('.gradient-text').forEach(el => {
        el.classList.add('glitch-effect');
    });
}

// Initialisation des effets
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    addGlitchEffect();
    
    // Animation d'entrée pour les logos
    setTimeout(() => {
        document.querySelectorAll('.logo-item').forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('revealed');
            }, index * 200);
        });
    }, 2000);
});

// Effet de tilt 3D
document.querySelectorAll('[data-tilt]').forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
});

// Effet de vague sur les boutons
document.querySelectorAll('.btn-primary, .btn-white, .glass-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Animation CSS pour l'effet de vague
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .loaded {
        animation: fadeIn 1s ease-in;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .logo-item {
        opacity: 0;
        transform: translateY(30px) rotateX(45deg);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .logo-item.revealed {
        opacity: 1;
        transform: translateY(0) rotateX(0deg);
    }
`;
document.head.appendChild(style);

// Effet de parallaxe avancé
class AdvancedParallax {
    constructor() {
        this.elements = document.querySelectorAll('[data-parallax]');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.updateParallax());
        this.updateParallax();
    }
    
    updateParallax() {
        const scrollTop = window.pageYOffset;
        
        this.elements.forEach(element => {
            const speed = parseFloat(element.dataset.parallax) || 0.5;
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
}

new AdvancedParallax();

// Effet de morphing sur les formes
function morphShapes() {
    const shapes = document.querySelectorAll('.floating-shape');
    shapes.forEach((shape, index) => {
        const delay = index * 2000;
        setInterval(() => {
            const randomRadius = Math.random() * 50 + 25;
            shape.style.borderRadius = `${randomRadius}% ${100-randomRadius}% ${randomRadius}% ${100-randomRadius}%`;
        }, 3000 + delay);
    });
}

morphShapes();

// Effet de glow dynamique
function dynamicGlow() {
    const glowElements = document.querySelectorAll('.card-glow, .step-glow, .feature-bg');
    
    glowElements.forEach(element => {
        setInterval(() => {
            const hue = Math.random() * 360;
            element.style.filter = `hue-rotate(${hue}deg)`;
        }, 2000);
    });
}

dynamicGlow();

// Détection de la performance et optimisation
function optimizeForPerformance() {
    const isLowPerformance = navigator.hardwareConcurrency < 4 || 
                           navigator.deviceMemory < 4 ||
                           /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isLowPerformance) {
        // Réduire les animations sur les appareils moins performants
        document.documentElement.style.setProperty('--animation-duration', '0.3s');
        document.querySelectorAll('.floating-shape').forEach(shape => {
            shape.style.display = 'none';
        });
    }
}

optimizeForPerformance();

// Effet de zoom sur les images au scroll
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.transform = 'scale(1.05)';
            entry.target.style.filter = 'brightness(1.1) contrast(1.1)';
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.team-image, .author-avatars img').forEach(img => {
    imageObserver.observe(img);
});

// Effet de machine à écrire pour les citations
function typewriterEffect(element, text, speed = 50) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Appliquer l'effet de machine à écrire aux citations visibles
const quoteObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const quote = entry.target.querySelector('.testimonial-quote');
            if (quote && !quote.dataset.typed) {
                const originalText = quote.textContent;
                quote.dataset.typed = 'true';
                setTimeout(() => {
                    typewriterEffect(quote, originalText, 30);
                }, 500);
            }
        }
    });
}, { threshold: 0.8 });

document.querySelectorAll('.testimonial-card').forEach(card => {
    quoteObserver.observe(card);
});

// Effet de pulsation sur les éléments importants
function addPulseEffect() {
    const pulseElements = document.querySelectorAll('.trust-badge, .guarantee-badge, .cta-badge');
    
    pulseElements.forEach(element => {
        setInterval(() => {
            element.style.transform = 'scale(1.05)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    });
}

addPulseEffect();

// Gestion des erreurs et fallbacks
window.addEventListener('error', (e) => {
    console.warn('Animation error caught:', e.error);
    // Fallback gracieux en cas d'erreur
});

// Préchargement des images pour des transitions fluides
function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const imageLoader = new Image();
        imageLoader.src = img.src;
    });
}

preloadImages();