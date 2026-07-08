document.addEventListener('DOMContentLoaded', () => {
    let authStateVerified = false;
    let authTabMode = 'login';
    let userSessionCache = { email: "grower@cultiv8.pk" };

    // DOM Selections
    const authModal = document.getElementById('authModal');
    const wizardModal = document.getElementById('wizardModal');
    const loginBtn = document.getElementById('loginBtn');
    const dashboardNavBtn = document.getElementById('dashboardNavBtn');
    const closeAuth = document.getElementById('closeAuth');
    const tabLogin = document.getElementById('tabLogin');
    const tabSignup = document.getElementById('tabSignup');
    const authForm = document.getElementById('authForm');
    const authSubmitBtn = document.getElementById('authSubmitBtn');
    const heroGetStarted = document.getElementById('heroGetStarted');
    
    const wizardForm = document.getElementById('wizardForm');
    const dashboardSection = document.getElementById('dashboardSection');
    const userGreeting = document.getElementById('userGreeting');
    const dbPlantName = document.getElementById('dbPlantName');
    const dbPlantType = document.getElementById('dbPlantType');
    const dbPlantStage = document.getElementById('dbPlantStage');
    const addDeviceBtn = document.getElementById('addDeviceBtn');
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    // --- Modal View Handlers ---
    const showAuth = () => authModal.classList.add('active');
    const hideAuth = () => authModal.classList.remove('active');

    loginBtn.addEventListener('click', showAuth);
    closeAuth.addEventListener('click', hideAuth);

    heroGetStarted.addEventListener('click', () => {
        if (!authStateVerified) { showAuth(); } 
        else { wizardModal.classList.add('active'); }
    });

    tabLogin.addEventListener('click', () => {
        authTabMode = 'login';
        tabLogin.classList.add('active');
        tabSignup.classList.remove('active');
        authSubmitBtn.innerText = 'Access Dashboard Control';
    });

    tabSignup.addEventListener('click', () => {
        authTabMode = 'signup';
        tabSignup.classList.add('active');
        tabLogin.classList.remove('active');
        authSubmitBtn.innerText = 'Create Free Operator Profile';
    });

    // --- Browser Auth Simulation ---
    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const targetedEmail = document.getElementById('authEmail').value;
        
        authStateVerified = true;
        userSessionCache = { email: targetedEmail };

        loginBtn.classList.add('hide');
        dashboardNavBtn.classList.remove('hide');
        hideAuth();
        
        // Advance smoothly to pairing question card wizard
        wizardModal.classList.add('active');
    });

    // --- Dynamic Wizard Form Onboarding ---
    wizardForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputName = document.getElementById('plantName').value;
        const inputType = document.getElementById('plantType').value;
        const inputStage = document.getElementById('plantStage').value;

        // Change values in active dashboard UI panel live
        dbPlantName.innerText = inputName;
        dbPlantType.innerText = inputType;
        dbPlantStage.innerText = inputStage;

        userGreeting.innerText = `Connected Node Account: [ ${userSessionCache.email} ]`;

        wizardModal.classList.remove('active');
        dashboardSection.classList.remove('hidden');
        dashboardSection.scrollIntoView({ behavior: 'smooth' });
    });

    addDeviceBtn.addEventListener('click', () => wizardModal.classList.add('active'));
    dashboardNavBtn.addEventListener('click', () => {
        dashboardSection.classList.remove('hidden');
        dashboardSection.scrollIntoView({ behavior: 'smooth' });
    });

    // --- Direct Email Mailto Integration ---
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const senderName = document.getElementById('contactName').value;
        const msgBody = document.getElementById('contactMessage').value;

        formFeedback.className = "form-feedback success";
        formFeedback.innerText = "Configured... Opening your system mailing app client directly now.";
        formFeedback.classList.remove('hidden');

        // Fires open target mail client app link structure immediately
        setTimeout(() => {
            window.location.href = `mailto:info.aquaguard.pk@gmail.com?subject=Cultiv8 Assistance Inquiry from ${encodeURIComponent(senderName)}&body=${encodeURIComponent(msgBody)}`;
        }, 1000);
    });

    // Mobile Navigation Toggle Simple logic rules layout
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelector('.nav-links');
    mobileMenu.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = '#ffffff';
        navLinks.style.padding = '20px';
    });
});
                                    
