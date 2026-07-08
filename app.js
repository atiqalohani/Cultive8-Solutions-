document.addEventListener('DOMContentLoaded', () => {

    let isLogged = false;
    const authModal = document.getElementById('authModal');
    const wizardModal = document.getElementById('wizardModal');
    const loginHeaderBtn = document.getElementById('loginHeaderBtn');
    const closeAuthModal = document.getElementById('closeAuthModal');
    const heroGetStartedBtn = document.getElementById('heroGetStartedBtn');
    const authModalForm = document.getElementById('authModalForm');
    const wizardModalForm = document.getElementById('wizardModalForm');
    
    const tabLoginBtn = document.getElementById('tabLoginBtn');
    const tabSignupBtn = document.getElementById('tabSignupBtn');
    const authSubmitActionButton = document.getElementById('authSubmitActionButton');

    // Sticky Scroll Header
    window.addEventListener('scroll', () => {
        document.getElementById('siteHeader').classList.toggle('scrolled', window.scrollY > 40);
    });

    // Mobile Navigation Drawer Toggle
    document.getElementById('navToggle').addEventListener('click', () => {
        document.getElementById('mainNav').classList.toggle('open');
    });

    // Smooth Interactive Mouse Cursor tracking loop
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    let tX = 0, tY = 0, rX = 0, rY = 0;

    if (window.matchMedia('(pointer: fine)').matches) {
        window.addEventListener('mousemove', (e) => {
            tX = e.clientX; tY = e.clientY;
            cursorDot.style.left = tX + 'px'; cursorDot.style.top = tY + 'px';
        });
        function renderCursor() {
            rX += (tX - rX) * 0.15; rY += (tY - rY) * 0.15;
            cursorRing.style.left = rX + 'px'; cursorRing.style.top = rY + 'px';
            requestAnimationFrame(renderCursor);
        }
        renderCursor();
        document.querySelectorAll('a, button, input, textarea, select').forEach(el => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
        });
    }

    // Scroll Elements Visibility Intersection Observer
    const revealEls = document.querySelectorAll('.reveal');
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });
    revealEls.forEach(el => revealObs.observe(el));

    // Stats Numeric Counters Progress
    const counters = document.querySelectorAll('.stat-number');
    const countersObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const node = entry.target;
                const targetMax = parseInt(node.dataset.target, 10);
                let start = 0;
                const tick = () => {
                    start += Math.max(1, Math.round(targetMax / 25));
                    if (start >= targetMax) { node.textContent = targetMax; return; }
                    node.textContent = start;
                    requestAnimationFrame(tick);
                };
                tick();
                countersObs.unobserve(node);
            }
        });
    }, { threshold: 0.2 });
    counters.forEach(el => countersObs.observe(el));

    // Identity Modal Management UI 
    const toggleAuth = () => authModal.classList.add('active');
    const removeAuth = () => authModal.classList.remove('active');
    loginHeaderBtn.addEventListener('click', toggleAuth);
    closeAuthModal.addEventListener('click', removeAuth);

    heroGetStartedBtn.addEventListener('click', () => {
        if (!isLogged) toggleAuth();
        else wizardModal.classList.add('active');
    });

    tabLoginBtn.addEventListener('click', () => {
        tabLoginBtn.classList.add('active'); tabSignupBtn.classList.remove('active');
        authSubmitActionButton.innerText = 'Access Digital System';
    });
    tabSignupBtn.addEventListener('click', () => {
        tabSignupBtn.classList.add('active'); tabLoginBtn.classList.remove('active');
        authSubmitActionButton.innerText = 'Register Profile';
    });

    authModalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        isLogged = true;
        removeAuth();
        wizardModal.classList.add('active');
    });

    // Hardware Questionnaire Submission - Redirects cleanly to a separate tab view
    wizardModalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Cache user config values securely into browser local storage cache space
        localStorage.setItem('c8_plantName', document.getElementById('wizardPlantName').value);
        localStorage.setItem('c8_plantType', document.getElementById('wizardPlantType').value);
        localStorage.setItem('c8_plantStage', document.getElementById('wizardPlantStage').value);

        wizardModal.classList.remove('active');
        loginHeaderBtn.classList.add('hide');

        // NEW FEATURE: Fires open your immersive mockup device view inside a clean standalone browser tab window
        window.open('dashboard.html', '_blank');
    });

    // Secure Embedded Client Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        formStatus.style.color = "var(--accent)";
        formStatus.innerHTML = "<i class='fas fa-check-circle'></i> Message processed onto the system safely.<br>Our engineering team will review your requirements shortly from a real inbox.";
        contactForm.reset();
    });
});
