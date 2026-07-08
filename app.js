document.addEventListener('DOMContentLoaded', () => {

    // --- Core Architecture Reactive Application State ---
    let appUserAuthenticated = false;
    let wizardFormConfigured = false;
    let authModeSelection = 'login'; 
    let globalActiveSession = { email: "grower@cultiv8.pk" };

    // --- DOM Selection Mapping Node Registry ---
    const siteHeader = document.getElementById('siteHeader');
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');
    
    const authModal = document.getElementById('authModal');
    const wizardModal = document.getElementById('wizardModal');
    const loginHeaderBtn = document.getElementById('loginHeaderBtn');
    const navDashboardLink = document.getElementById('navDashboardLink');
    const closeAuthModal = document.getElementById('closeAuthModal');
    const heroGetStartedBtn = document.getElementById('heroGetStartedBtn');
    
    const tabLoginBtn = document.getElementById('tabLoginBtn');
    const tabSignupBtn = document.getElementById('tabSignupBtn');
    const authModalForm = document.getElementById('authModalForm');
    const authSubmitActionButton = document.getElementById('authSubmitActionButton');
    
    const wizardModalForm = document.getElementById('wizardModalForm');
    const dashboardSection = document.getElementById('dashboard');
    const dashboardHeadline = document.getElementById('dashboardHeadline');
    const panelPlantName = document.getElementById('panelPlantName');
    const panelPlantType = document.getElementById('panelPlantType');
    const panelPlantStage = document.getElementById('panelPlantStage');
    const reconfigureWizardBtn = document.getElementById('reconfigureWizardBtn');
    
    const healthNumber = document.getElementById('healthNumber');
    const moistureVal = document.getElementById('moistureVal');
    const tempVal = document.getElementById('tempVal');
    const gaugeFill = document.getElementById('gaugeFill');
    const CIRCUMFERENCE_OFFSET_VAL = 540; 

    // Sync Year token
    document.getElementById('year').textContent = new Date().getFullYear();

    // Sticky Scroll Header Trigger
    window.addEventListener('scroll', () => {
        siteHeader.classList.toggle('scrolled', window.scrollY > 40);
    });

    // Mobile Hamburger Nav
    navToggle.addEventListener('click', () => mainNav.classList.toggle('open'));
    mainNav.querySelectorAll('a, button').forEach(el => el.addEventListener('click', () => mainNav.classList.remove('open')));

    // Smooth Cursor Tracking Matrix
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

    // Viewport Intersection Obserer for Reveals
    const revealElements = document.querySelectorAll('.reveal');
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => revealObs.observe(el));

    // Stats Counters Increments
    const numCounters = document.querySelectorAll('.stat-number');
    const countersObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const node = entry.target;
                const limit = parseInt(node.dataset.target, 10);
                let currentVal = 0;
                const tick = () => {
                    currentVal += Math.max(1, Math.round(limit / 30));
                    if (currentVal >= limit) { node.textContent = limit; return; }
                    node.textContent = currentVal;
                    requestAnimationFrame(tick);
                };
                tick();
                countersObs.unobserve(node);
            }
        });
    }, { threshold: 0.3 });
    numCounters.forEach(el => countersObs.observe(el));

    // Modal Control Windows
    const openAuth = () => authModal.classList.add('active');
    const closeAuth = () => authModal.classList.remove('active');
    loginHeaderBtn.addEventListener('click', openAuth);
    closeAuthModal.addEventListener('click', closeAuth);

    heroGetStartedBtn.addEventListener('click', () => {
        if (!appUserAuthenticated) openAuth();
        else if (!wizardFormConfigured) wizardModal.classList.add('active');
        else {
            dashboardSection.classList.remove('hidden');
            dashboardSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    tabLoginBtn.addEventListener('click', () => {
        authModeSelection = 'login'; tabLoginBtn.classList.add('active'); tabSignupBtn.classList.remove('active');
        authSubmitActionButton.innerText = 'Access Digital System';
    });
    tabSignupBtn.addEventListener('click', () => {
        authModeSelection = 'signup'; tabSignupBtn.classList.add('active'); tabLoginBtn.classList.remove('active');
        authSubmitActionButton.innerText = 'Register Core Profile';
    });

    authModalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        appUserAuthenticated = true;
        globalActiveSession.email = document.getElementById('authEmailInput').value;
        loginHeaderBtn.classList.add('hide');
        navDashboardLink.classList.remove('hide');
        closeAuth();
        wizardModal.classList.add('active');
    });

    // Wizard Process Submission
    wizardModalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        panelPlantName.innerText = document.getElementById('wizardPlantName').value;
        panelPlantType.innerText = document.getElementById('wizardPlantType').value;
        panelPlantStage.innerText = document.getElementById('wizardPlantStage').value;
        dashboardHeadline.innerText = `Ecosystem Mapped: ${document.getElementById('wizardPlantName').value}`;

        wizardFormConfigured = true;
        wizardModal.classList.remove('active');
        dashboardSection.classList.remove('hidden');
        initDashboardLoop();
        dashboardSection.scrollIntoView({ behavior: 'smooth' });
    });

    reconfigureWizardBtn.addEventListener('click', () => wizardModal.classList.add('active'));
    navDashboardLink.addEventListener('click', () => {
        dashboardSection.classList.remove('hidden');
        dashboardSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Live Dashboard Automation Engine values simulation matching your mockup app parameters
    function setGaugeProgress(scoreVal) {
        const offset = CIRCUMFERENCE_OFFSET_VAL - (scoreVal / 10) * CIRCUMFERENCE_OFFSET_VAL;
        gaugeFill.style.strokeDashoffset = offset;
        healthNumber.textContent = scoreVal.toFixed(1);
    }

    let loopKey = null;
    function initDashboardLoop() {
        if (loopKey) clearInterval(loopKey);
        setGaugeProgress(8.7);
        moistureVal.textContent = "58%";
        tempVal.textContent = "24.1°C";

        loopKey = setInterval(() => {
            const score = 8.0 + (Math.random() * 1.9);
            const moist = 52 + Math.round(Math.random() * 12);
            const temp = 23 + (Math.random() * 2);

            setGaugeProgress(score);
            moistureVal.textContent = moist + '%';
            tempVal.textContent = temp.toFixed(1) + '°C';
        }, 3500);
    }

    // Secure Support Form Application Launcher redirection
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const opName = document.getElementById('name').value;
        const opMsg = document.getElementById('message').value;

        formStatus.style.color = "var(--accent)";
        formStatus.textContent = "Processing packet... Launching native device email system.";

        setTimeout(() => {
            window.location.href = `mailto:info.aquaguard.pk@gmail.com?subject=Cultiv8 Field Support Request from ${encodeURIComponent(opName)}&body=${encodeURIComponent(opMsg)}`;
            contactForm.reset();
            formStatus.textContent = "Inquiry prepared for delivery to info.aquaguard.pk@gmail.com";
        }, 1200);
    });
});
                
