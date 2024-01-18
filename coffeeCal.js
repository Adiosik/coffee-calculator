const beansInput = document.querySelector('.beans');
const ratioInput = document.querySelector('.ratio');
const waterInput = document.querySelector('.water');
const yieldInput = document.querySelector('.coffee-yield');

// Výpočet množstí beans (ratio T/F, ? pro podmínku, vrátí 0 když je T, když F tak provede výpoočet)
// .toFixed(2) pro zaokrohlení n a dvě desetiny
const calculateBeans = (water, ratio) => ratio === 0 ? 0 : (water / ratio).toFixed(2);
// Výpočet množství ratio
const calculateRatio = (water, beans) => beans === 0 ? 0 : (water / beans).toFixed(2);
// Výpočet množství water
const calculateWater = (beans, ratio) => (beans * ratio).toFixed(2);
// Výpočet množství water z yieldu
const calculateWaterFromYield = (yield) => (yield / 0.9).toFixed(2);
// Výpočet množství yield (90%)
const calculateYield = (water) => (water * 0.9).toFixed(2);

let currentInput = beansInput;
let previousInput = beansInput;

const onUserInput = (event) => {
    // Načtení hodnot z polí pro beans, ratio a vody
    let beans = beansInput.valueAsNumber || 0;       
    let ratio = ratioInput.valueAsNumber || 0;
    let water = waterInput.valueAsNumber || 0;
    // Ověření zda se změnil aktuální vstup
    if (currentInput !== event.target) {
        previousInput = currentInput;
        currentInput = event.target;
    }  
    // Pokud je aktuální vstup beans nebo předchozí vstup ratio nebo opačně, vypočítá se množství water a pokud je aktuální vstup water nebo předchozí vstup ratio, vypočítá se množství beans. Jinak se vypočítá poměr na základě množství vody a beans
    if ((currentInput === beansInput && previousInput === ratioInput) || (currentInput === ratioInput && previousInput === beansInput)) {
        water = calculateWater(beans, ratio);
        waterInput.value = water;
    } else if ((currentInput === waterInput && previousInput === ratioInput) || (currentInput === ratioInput && previousInput === waterInput)) { 
        beans = calculateBeans(water, ratio);
        beansInput.value = beans;
    } else {
        ratio = calculateRatio(water, beans);
        ratioInput.value = ratio;
    }

    // Aktualizace yield
    const yieldResult = calculateYield(water);
    yieldInput.value = yieldResult;
}

const onYieldInput = () => {
    let yield = yieldInput.valueAsNumber || 0;
    // Aktualizace water
    const water = calculateWaterFromYield(yield);
    waterInput.value = water;

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
    } else {
        ratio = calculateRatio(water, beans);
        ratioInput.value = ratio;
    }
}

beansInput.addEventListener('input', onUserInput);
waterInput.addEventListener('input', onUserInput);
ratioInput.addEventListener('input', onUserInput);
yieldInput.addEventListener('input', onYieldInput);