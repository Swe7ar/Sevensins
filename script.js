document.addEventListener('DOMContentLoaded', () => {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorGlow = document.querySelector('.cursor-glow');
    const langBtn = document.getElementById('langBtn');
    const body = document.body;

    // --- Custom Cursor Implementation ---
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Immediate update for the dot
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
        cursorDot.style.transform = 'translate(-50%, -50%)';
    });

    // Smooth trailing effect for the glow
    function animateCursor() {
        let dx = mouseX - glowX;
        let dy = mouseY - glowY;

        glowX += dx * 0.15; // Adjust this for trailing speed
        glowY += dy * 0.15;

        cursorGlow.style.left = `${glowX}px`;
        cursorGlow.style.top = `${glowY}px`;
        cursorGlow.style.transform = 'translate(-50%, -50%)';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // --- Language Switcher Implementation ---
    let currentLang = 'en';
    const translations = {
        en: {
            btn: 'العربية',
            dir: 'ltr',
            lang: 'en'
        },
        ar: {
            btn: 'English',
            dir: 'rtl',
            lang: 'ar'
        }
    };

    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'ar' : 'en';

        // Update layout direction and font
        body.dir = translations[currentLang].dir;
        body.classList.toggle('rtl');

        // Update language attribute on HTML tag
        document.documentElement.lang = translations[currentLang].lang;

        // Update button text
        langBtn.innerText = translations[currentLang].btn;

        // Update all elements with data-en and data-ar attributes
        document.querySelectorAll('[data-en]').forEach(el => {
            el.innerText = el.getAttribute(`data-${currentLang}`);
        });
    });
});
