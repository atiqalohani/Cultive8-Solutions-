document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Gather configuration profile entries from local storage channels
    const cachedName = localStorage.getItem('c8_plantName') || "Row 3 Tomato Block";
    const cachedType = localStorage.getItem('c8_plantType') || "Vegetable Crop Patch Variety";
    const cachedStage = localStorage.getItem('c8_plantStage') || "Active Leafing Vegetative Growth";

    // Push inputs cleanly onto active presentation placeholder text nodes
    document.getElementById('appNodeTitle').innerText = `${cachedName} Hub`;
    document.getElementById('targetUserPlantNickname').innerText = cachedName;
    document.getElementById('metaPlantTitle').innerText = cachedName;
    document.getElementById('metaPlantCategory').innerText = cachedType;
    document.getElementById('metaPlantHorizon').innerText = cachedStage;
    
    // Circular Progress Ring Gauge Mapping Strategy
    const moistureCircle = document.getElementById('moistureCircle');
    const moisturePercentTxt = document.getElementById('moisturePercentTxt');
    const airTempNode = document.getElementById('airTempNode');
    const growthScoreNode = document.getElementById('growthScoreNode');

    function renderCircularProgress(moisturePercentValue) {
        const radius = 40;
        const circumference = 2 * Math.PI * radius; // 251.2
        const strokeDashoffset = circumference - (moisturePercentValue / 100) * circumference;
        moistureCircle.style.strokeDashoffset = strokeDashoffset;
        moisturePercentTxt.textContent = moisturePercentValue + "%";
    }

    renderCircularProgress(58);

    // 2. NEW FEATURE: Dynamic Navigation Router Tab Switching Controller
    const navItems = document.querySelectorAll('.nav-app-item');
    const tabContents = document.querySelectorAll('.dashboard-tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active style classes from tab buttons
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Hide all tab components container modules
            const targetTabID = item.getAttribute('data-target-tab');
            tabContents.forEach(content => content.classList.add('hidden'));
            
            // Show targeted module layout view container
            document.getElementById(targetTabID).classList.remove('hidden');
        });
    });

    // 3. NEW FEATURE: Functional Interactive Manual Overrides ("Irrigate Now" button click)
    const irrigateBtn = document.getElementById('irrigateActionBtn');
    const pumpStatusTxt = document.getElementById('pumpStatusTxt');
    const pumpSubTxt = document.getElementById('pumpSubTxt');

    irrigateBtn.addEventListener('click', () => {
        irrigateBtn.disabled = true;
        irrigateBtn.innerText = "Processing...";
        pumpStatusTxt.innerText = "Pump Status: Overridden";
        pumpSubTxt.innerText = "(Forced Remote Solenoid Purge Initiated)";
        pumpSubTxt.style.color = "#4F772D";

        setTimeout(() => {
            // Gradually return parameters cleanly back to steady automated cycle loop
            irrigateBtn.disabled = false;
            irrigateBtn.innerText = "Irrigate Now";
            pumpStatusTxt.innerText = "Pump Status: Active";
            pumpSubTxt.innerText = "(Irrigation Running)";
            pumpSubTxt.style.color = "";
            renderCircularProgress(64); // Simulate successful soil moisture increase
        }, 4000);
    });

    // Telemetry variation loop matching your app profile parameters
    setInterval(() => {
        if (!irrigateBtn.disabled) {
            const dynamicMoistureVal = 55 + Math.round(Math.random() * 6);
            const dynamicTempVal = 23.9 + (Math.random() * 0.8);
            const dynamicScoreVal = 8.6 + (Math.random() * 0.4);

            renderCircularProgress(dynamicMoistureVal);
            airTempNode.textContent = dynamicTempVal.toFixed(1) + "°C";
            growthScoreNode.textContent = dynamicScoreVal.toFixed(1) + "/10";
        }
    }, 3500);
});
        
