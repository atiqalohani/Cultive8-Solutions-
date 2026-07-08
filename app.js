document.addEventListener('DOMContentLoaded', () => {
    // Application State Variables
    let isUserAuthenticated = false;
    let activeAuthTab = 'login';
    let globalUserData = null;

    // DOM Selections Elements
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
    
    // Wizard Form & Dashboard components
    const wizardForm = document.getElementById('wizardForm');
    const dashboardSection = document.getElementById('dashboardSection');
    const userGreeting = document.getElementById('userGreeting');
    const dbPlantName = document.getElementById('dbPlantName');
    const dbPlantType = document.getElementById('dbPlantType');
    const dbPlantStage = document.getElementById('dbPlantStage');
    const addDeviceBtn = document.getElementById('addDeviceBtn');

    // Contact Form Component Elements
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    // --- Modal View Management Handlers ---
    const openAuthenticationModal = () => {
        authModal.classList.add('active');
    };

    const closeAuthenticationModal = () => {
        authModal.classList.remove('active');
    };

    loginBtn.addEventListener('click', openAuthenticationModal);
    heroGetStarted.addEventListener('click', () => {
        if (!isUserAuthenticated) {
            openAuthenticationModal();
        } else {
            wizardModal.classList.add('active');
        }
    });

    closeAuth.addEventListener('click', closeAuthenticationModal);

    // Dynamic Tab Swapping inside Identity Modal
    tabLogin.addEventListener('click', () => {
        activeAuthTab = 'login';
        tabLogin.classList.add('active');
        tabSignup.classList.remove('active');
        authSubmitBtn.innerText = 'Access Ecosystem';
    });

    tabSignup.addEventListener('click', () => {
        activeAuthTab = 'signup';
        tabSignup.classList.add('active');
        tabLogin.classList.remove('active');
        authSubmitBtn.innerText = 'Establish Free Account';
    });

    // --- Mock Backend Communication Engine ---
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('authEmail').value;
        const passwordInput = document.getElementById('authPassword').value;

        // Build structured request profile
        const payload = { email: emailInput, password: passwordInput };
        const routeEndpoint = activeAuthTab === 'login' ? '/api/auth/login' : '/api/auth/signup';

        try {
            const response = await fetch(routeEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const parseResult = await response.json();

            if (response.ok && parseResult.success) {
                isUserAuthenticated = true;
                globalUserData = { email: emailInput };
                
                // Refactor navbar layout structure UI
                loginBtn.classList.add('hide');
                dashboardNavBtn.classList.remove('hide');
                closeAuthenticationModal();

                // Advance system step directly to operational hardware questionnaire 
                wizardModal.classList.add('active');
            } else {
                alert(`Authentication Exception: ${parseResult.message}`);
            }
        } catch (err) {
            console.error("Network interface error occurred during processing:", err);
            alert("Backend communication fault. Check if node server is active.");
        }
    });

    // --- Onboarding Pipeline Configuration ---
    wizardForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Capture biological environment values
        const parsedPlantName = document.getElementById('plantName').value;
        const parsedPlantType = document.getElementById('plantType').value;
        const parsedPlantStage = document.getElementById('plantStage').value;

        // Propagate changes cleanly onto UI text elements
        dbPlantName.innerText = parsedPlantName;
        dbPlantType.innerText = parsedPlantType;
        dbPlantStage.innerText = parsedPlantStage;

        userGreeting.innerText = `Ecosystem node reporting healthy for operator accounts: [ ${globalUserData.email} ]`;

        // Clear view state structures
        wizardModal.classList.remove('active');
        dashboardSection.classList.remove('hidden');
        
        // Smooth slide movement transition execution focus targeting dashboard node container
        dashboardSection.scrollIntoView({ behavior: 'smooth' });
    });

    addDeviceBtn.addEventListener('click', () => {
        wizardModal.classList.add('active');
    });

    dashboardNavBtn.addEventListener('click', () => {
        dashboardSection.classList.remove('hidden');
        dashboardSection.scrollIntoView({ behavior: 'smooth' });
    });

    // --- Enterprise Mail Form Handling API integration ---
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const clientName = document.getElementById('contactName').value;
        const clientEmail = document.getElementById('contactEmail').value;
        const bodyContent = document.getElementById('contactMessage').value;

        formFeedback.className = "form-feedback hidden";

        try {
            const apiResponse = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: clientName, email: clientEmail, message: bodyContent })
            });

            const apiData = await apiResponse.json();

            if (apiResponse.ok && apiData.success) {
                formFeedback.innerText = "Inquiry successfully dispatched to info.aquaguard.pk@gmail.com";
                formFeedback.classList.remove('hidden');
                formFeedback.classList.add('success');
                contactForm.reset();
            } else {
                throw new Error(apiData.message || "Execution engine failure.");
            }

        } catch (error) {
            formFeedback.innerText = `Routing Fault: ${error.message}. Resorting to device level email app client loop fallback structure...`;
            formFeedback.classList.remove('hidden');
            formFeedback.classList.add('error');

            // Hard fallback: Execute window level direct URI scheme handler standard format instantly.
            setTimeout(() => {
                window.location.href = `mailto:info.aquaguard.pk@gmail.com?subject=AquaGuard System Inquiry from ${encodeURIComponent(clientName)}&body=${encodeURIComponent(bodyContent)} (Sent via backup protocol)`;
            }, 2500);
        }
    });

    // Mobile Navigation Drawer Toggle Logic simple layout structure
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelector('.nav-links');
    mobileMenu.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.backgroundColor = '#ffffff';
        navLinks.style.padding = '20px';
    });
});
