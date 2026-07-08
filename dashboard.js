document.addEventListener('DOMContentLoaded', () => {
    
    // Retrieve configuration profile entries from local storage space channels
    const cachedName = localStorage.getItem('c8_plantName') || "Row 3 Tomato Block";
    const cachedType = localStorage.getItem('c8_plantType') || "Vegetable Crop Patch Variety";
    const cachedStage = localStorage.getItem('c8_plantStage') || "Active Leafing Vegetative Growth";

    // Set configuration parameters onto application text nodes instantly
    document.getElementById('appNodeTitle').innerText = `${cachedName} Terminal`;
    document.getElementById('targetUserPlantNickname').innerText = cachedName;
    
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

    // Initialize Mockup App interface metrics matching your image view specs perfectly
    renderCircularProgress(58);

    // Live continuous randomized telemetry data variation loop simulation
    setInterval(() => {
        const dynamicMoistureVal = 54 + Math.round(Math.random() * 8);
        const dynamicTempVal = 23.8 + (Math.random() * 1.2);
        const dynamicScoreVal = 8.5 + (Math.random() * 1.1);

        renderCircularProgress(dynamicMoistureVal);
        airTempNode.textContent = dynamicTempVal.toFixed(1) + "°C";
        growthScoreNode.textContent = dynamicScoreVal.toFixed(1) + "/10";
    }, 3200);
});
