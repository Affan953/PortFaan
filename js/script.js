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
            if(textArray.length) setTimeout(type, newTextDelay + 250);
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
