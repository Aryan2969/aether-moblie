document.addEventListener('DOMContentLoaded', () => {

    // --- 1. THEME TOGGLE (Light/Dark Mode) ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            body.setAttribute('data-theme', 'light');
            themeToggleBtn.innerText = '🌙 Dark Mode';
        } else {
            body.setAttribute('data-theme', 'dark');
            themeToggleBtn.innerText = '☀️ Light Mode';
        }
    });

    // --- 2. 3D PARALLAX TILT EFFECT ---
    const tiltContainer = document.querySelector('.tilt-element');
    const phoneImg = tiltContainer.querySelector('img');

    tiltContainer.addEventListener('mousemove', (e) => {
        const rect = tiltContainer.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const xPercent = x / (rect.width / 2);
        const yPercent = y / (rect.height / 2);

        const rotateX = yPercent * -15; // Max tilt 15deg
        const rotateY = xPercent * 15;

        phoneImg.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    tiltContainer.addEventListener('mouseleave', () => {
        phoneImg.style.transition = 'transform 0.5s ease';
        phoneImg.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        setTimeout(() => phoneImg.style.transition = 'transform 0.1s ease-out', 500);
    });

    // --- 3. SPECS TABS TOGGLE ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const specContents = document.querySelectorAll('.specs-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            specContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // --- 4. SCROLL REVEAL ANIMATIONS ---
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target); // Only animate once
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => observer.observe(el));
});