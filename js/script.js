// Premium Loading Screen Logic
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const energyFlow = document.getElementById('energy-flow');
    const glowTrail = document.getElementById('glow-trail');
    const particlesContainer = document.getElementById('loader-particles');

    // Create particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'loader-particle';
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particlesContainer.appendChild(particle);
        
        gsap.to(particle, {
            y: '-100vh',
            duration: Math.random() * 3 + 2,
            repeat: -1,
            ease: 'linear',
            delay: Math.random() * 2
        });
    }

    // GSAP Timeline for Loading Animation
    const tl = gsap.timeline();
    const pathLength = energyFlow.getTotalLength();

    gsap.set(energyFlow, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
    gsap.set(glowTrail, { strokeDasharray: "50 950", strokeDashoffset: pathLength, opacity: 0 });

    // Simulate progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        if (progress === 100) {
            clearInterval(progressInterval);
            finishLoading();
        }
    }, 200);

    // Continuous energy flow animation with smoother easing
    tl.to(energyFlow, {
        strokeDashoffset: 0,
        duration: 3,
        ease: "expo.inOut"
    })
    .to(energyFlow, {
        filter: "drop-shadow(0 0 25px rgba(37, 99, 235, 0.8))",
        strokeWidth: 6,
        duration: 1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
    })
    .to(loader, {
        scale: 1.05,
        duration: 3,
        ease: "power2.inOut"
    }, 0)
    .to(glowTrail, {
        opacity: 1,
        duration: 0.8
    }, "-=2")
    .to(glowTrail, {
        strokeDashoffset: 0,
        duration: 4,
        repeat: -1,
        ease: "none"
    }, "-=1");

    function finishLoading() {
        const exitTl = gsap.timeline({
            onComplete: () => {
                loader.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        exitTl.to(loader, {
            opacity: 0,
            y: -50,
            duration: 1.2,
            ease: "expo.inOut"
        })
        .add(() => {
            // Show navbar
            const navbar = document.getElementById('navbar');
            navbar.classList.add('show-nav');
            
            // Staggered reveal of hero elements
            gsap.fromTo(".hero-content .reveal > *", 
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power4.out" }
            );
            
            gsap.fromTo(".hero-visual", 
                { scale: 0.9, opacity: 0, x: 20 },
                { scale: 1, opacity: 1, x: 0, duration: 1.5, ease: "expo.out",
                  onComplete: () => {
                      if(textArray.length) setTimeout(type, 500);
                  }
                },
                "-=0.5"
            );
        }, "-=0.6");
    }

    // Initial state
    document.body.style.overflow = 'hidden';
});

// Set current year
        document.getElementById('year').textContent = new Date().getFullYear();

        // Navbar Scroll Effect
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile Menu Toggle
        const menuBtn = document.getElementById('menuBtn');
        const navLinks = document.getElementById('navLinks');
        const navItems = navLinks.querySelectorAll('a');

        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('bx-menu', 'bx-x');
            } else {
                icon.classList.replace('bx-x', 'bx-menu');
            }
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.querySelector('i').classList.replace('bx-x', 'bx-menu');
            });
        });

        // Typing Effect
        const typedTextSpan = document.querySelector(".typed-text");
        const cursorSpan = document.querySelector(".cursor");

        const textArray = ["Shadow Monarch", "S-Rank Hunter", "Web Developer"];
        const typingDelay = 100;
        const erasingDelay = 50;
        const newTextDelay = 2000;
        let textArrayIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                cursorSpan.classList.remove("typing");
                setTimeout(erase, newTextDelay);
            }
        }

        function erase() {
            if (charIndex > 0) {
                if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                cursorSpan.classList.remove("typing");
                textArrayIndex++;
                if(textArrayIndex >= textArray.length) textArrayIndex = 0;
                setTimeout(type, typingDelay + 1100);
            }
        }

        document.addEventListener("DOMContentLoaded", function() {
            // Typing effect will be triggered after hero reveal
        });

        // Scroll Reveal Animation (Modern Intersection Observer API)
        const revealElements = document.querySelectorAll(".reveal");
        
        const revealOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };
        
        const revealObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target); // Optional: stop observing once revealed
                }
            });
        }, revealOptions);
        
        revealElements.forEach(el => {
            revealObserver.observe(el);
        });

        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('i');
        const htmlElement = document.documentElement;
        
        // Check local storage for theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        htmlElement.setAttribute('data-theme', savedTheme);
        themeIcon.className = savedTheme === 'light' ? 'bx bx-moon' : 'bx bx-sun';
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Add a subtle rotation animation during swap
            themeIcon.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                themeIcon.className = newTheme === 'light' ? 'bx bx-moon' : 'bx bx-sun';
                themeIcon.style.transform = 'none';
            }, 150);
        });

// --- Custom Cursor & Magnetic Hover Logic ---
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

const cursorTrail = document.createElement('div');
cursorTrail.classList.add('custom-cursor-trail');
document.body.appendChild(cursorTrail);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let trailX = mouseX;
let trailY = mouseY;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Immediate follow for main cursor
    cursor.style.transform = `translate3d(${mouseX - 6}px, ${mouseY - 6}px, 0)`;
});

function animateCursor() {
    let distX = mouseX - trailX;
    let distY = mouseY - trailY;
    
    trailX = trailX + (distX * 0.15);
    trailY = trailY + (distY * 0.15);
    
    cursorTrail.style.transform = `translate3d(${trailX - 20}px, ${trailY - 20}px, 0)`;
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Add hover effect for interactable elements
const interactables = document.querySelectorAll('a, button, .theme-toggle, .mobile-menu-btn, .tech-node-card');

interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorTrail.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorTrail.classList.remove('hover');
    });
});

// --- Initialize Vanilla Tilt for 3D Cards ---
document.addEventListener('DOMContentLoaded', () => {
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".project-card"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
            scale: 1.02
        });
        
        VanillaTilt.init(document.querySelectorAll(".service-card"), {
            max: 8,
            speed: 400,
            glare: true,
            "max-glare": 0.1
        });
        
        VanillaTilt.init(document.querySelectorAll(".tech-node-card"), {
            max: 15,
            speed: 300,
            scale: 1.1
        });
    }
});
