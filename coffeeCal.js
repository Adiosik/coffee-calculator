const beansInput = document.querySelector('.beans');
const ratioInput = document.querySelector('.ratio');
const waterInput = document.querySelector('.water');
const yieldInput = document.querySelector('.coffee-yield');

// Funkce pro zaokrouhlování na dvě desetinná místa
const roundToTwoDecimals = (value) => Math.round(value * 100) / 100;
// Výpočet množstí beans (ratio T/F, ? pro podmínku, vrátí 0 když je T, když F tak provede výpočet)
const calculateBeans = (water, ratio) => ratio === 0 ? 0 : roundToTwoDecimals(water / ratio);
// Výpočet množství ratio
const calculateRatio = (water, beans) => beans === 0 ? 0 : roundToTwoDecimals(water / beans);
// Výpočet množství water
const calculateWater = (beans, ratio) => roundToTwoDecimals(beans * ratio);
// Výpočet množství water z yieldu
const calculateWaterFromYield = (yield) => roundToTwoDecimals(yield / 0.9);
// Výpočet množství yield (90%)
const calculateYield = (water) => roundToTwoDecimals(water * 0.9);

let currentInput = beansInput;
let previousInput = beansInput;

const onUserInput = (event) => {
    // Načtení hodnot z polí pro beans, ratio a vody
    let beans = beansInput.valueAsNumber || 0;       
    let ratio = ratioInput.valueAsNumber || 0;
    let water = waterInput.valueAsNumber || 0;

    waterSlider.value = water;
    beansSlider.value = beans;
    ratioSlider.value = ratio;
    // Ověření zda se změnil aktuální vstup
    if (currentInput !== event.target) {
        previousInput = currentInput;
        currentInput = event.target;
    }  
    // Pokud je aktuální vstup beans nebo předchozí vstup ratio nebo opačně, vypočítá se množství water a pokud je aktuální vstup water nebo předchozí vstup ratio, vypočítá se množství beans. Jinak se vypočítá poměr na základě množství vody a beans
    if ((currentInput === beansInput && previousInput === ratioInput) || (currentInput === ratioInput && previousInput === beansInput)) {
        water = calculateWater(beans, ratio);
        waterInput.value = water;
        waterSlider.value = water;
    } else if ((currentInput === waterInput && previousInput === ratioInput) || (currentInput === ratioInput && previousInput === waterInput)) { 
        beans = calculateBeans(water, ratio);
        beansInput.value = beans;
        beansSlider.value = beans;
    } else {
        ratio = calculateRatio(water, beans);
        ratioInput.value = ratio;
        ratioSlider.value = ratio;
    }

    // Aktualizace yield
    const yieldResult = calculateYield(water);
    yieldInput.value = yieldResult;
    yieldSlider.value = yieldResult;
}

const onYieldInput = () => {
    let yield = yieldInput.valueAsNumber || 0;
    yieldSlider.value = yield;
    // Aktualizace water
    const water = calculateWaterFromYield(yield);
    waterInput.value = water;
    waterSlider.value = water;

    let beans = beansInput.valueAsNumber || 0;       
    let ratio = ratioInput.valueAsNumber || 0;

    // Ověření zda se změnil aktuální vstup
    if (currentInput !== waterInput) {
        previousInput = currentInput;
        currentInput = waterInput;
    }
    // Pokud je aktuální vstup ratio nebo předchozí vstup byl ratio, vypočítá se množství beans. Jinak se vypočítá poměr na základě množství vody a beans
    if (currentInput === ratioInput || previousInput === ratioInput) {
        beans = calculateBeans(water, ratio);
        beansInput.value = beans;
        beansSlider.value = beans;
    } else {
        ratio = calculateRatio(water, beans);
        ratioInput.value = ratio;
        ratioSlider.value = ratio;
    }
}

beansInput.addEventListener('input', onUserInput);
waterInput.addEventListener('input', onUserInput);
ratioInput.addEventListener('input', onUserInput);
yieldInput.addEventListener('input', onYieldInput);

// TIMER //
const timerInput = document.querySelector(".timer");
const countdownInput = document.querySelector(".countdown");
const startButton = document.querySelector(".start");
const stopButton = document.querySelector(".stop");
const resetButton = document.querySelector(".reset");
const progressBar = document.querySelector(".progress-bar");

let countdownInterval;
let countdownTime;

const writeCountdownTimeIntoInput = () => {
    const minutes = Math.floor(countdownTime / 60);
    // modulo, zbytek po dělení
    const seconds = countdownTime % 60; 
    // přidání nuly na začátek, pokud je délka řetězce menší než 2
    countdownInput.value = `${minutes}:${(seconds).toString().padStart(2, "0")}`;

    progressBar.style.width = `${countdownTime / ((timerInput.valueAsNumber || 0) * 60)*100}%`
}

const everySecond = () => {
    countdownTime--
    writeCountdownTimeIntoInput();
    if (countdownTime === 0) {
        stop();
    }
}

const start = () => {
    stop();
    countdownInterval = setInterval(everySecond, 1000);
}

const stop = () => {
    clearInterval(countdownInterval);
}

const reset = () => {
    stop();
    countdownTime = (timerInput.valueAsNumber || 0) * 60;
    writeCountdownTimeIntoInput(); 
}

timerInput.addEventListener("input", reset);
startButton.addEventListener("click", start);
stopButton.addEventListener("click", stop);
resetButton.addEventListener("click", reset);

reset();

// SLIDERS //
const beansSlider = document.querySelector(".beans-slider");
const waterSlider = document.querySelector(".water-slider");
const ratioSlider = document.querySelector(".ratio-slider");
const yieldSlider = document.querySelector(".yield-slider");

const onBeansSliderInput = () => {
    const beans = beansSlider.value;
    beansInput.value = beans;
    onUserInput({target: beansInput});
}

const onWaterSliderInput = () => {
    const water = waterSlider.value;
    waterInput.value = water;
    onUserInput({target: waterInput});

}

const onRatioSliderInput = () => {
    const ratio = ratioSlider.value;
    ratioInput.value = ratio;
    onUserInput({target: ratioInput});

}

const onYieldSliderInput = () => {
    const yield = yieldSlider.value;
    yieldInput.value = yield;
    onYieldInput();
}

beansSlider.addEventListener('input', onBeansSliderInput);
waterSlider.addEventListener('input', onWaterSliderInput);
ratioSlider.addEventListener('input', onRatioSliderInput);
yieldSlider.addEventListener('input', onYieldSliderInput);
