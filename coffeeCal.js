const beansInput = document.querySelector('.beans');
const ratioInput = document.querySelector('.ratio');
const waterInput = document.querySelector('.water');
const yieldInput = document.querySelector('.coffee-yield');

// Výpočet množstí beans (ratio T/F, ? pro podmínku, vrátí 0 když je T, když F tak provede výpoočet)
const calculateBeans = (water, ratio) => ratio === 0 ? 0 : water / ratio;
// Výpočet množství ratio
const calculateRatio = (water, beans) => beans === 0 ? 0 : water / beans;
// Výpočet množství water
const calculateWater = (beans, ratio) => beans * ratio;
// Výpočet množství yield (90%)
const calculateYield = (water) => water * 0.9;

let currentInput = beansInput;
let previousInput = beansInput;

const userInput = (event) => {
    // Načtení hodnot z polí pro beans, ratio a vody
    let beans = beansInput.valueAsNumber || 0;       
    let ratio = ratioInput.valueAsNumber || 0;
    let water = waterInput.valueAsNumber || 0;
    
    if (currentInput !== event.target) {
        previousInput = currentInput;
        currentInput = event.target;
    }  

    if ((currentInput === beansInput && previousInput === ratioInput) || (currentInput === ratioInput && previousInput === beansInput)) {
        water = calculateWater(beans, ratio);
        // Aktualizuje hodnoty vody
        waterInput.value = water;
    } else if ((currentInput === waterInput && previousInput === ratioInput) || (currentInput === ratioInput && previousInput === waterInput)) { 
        beans = calculateBeans(water, ratio);
        // Aktualizuje hodnoty beans
        beansInput.value = beans;
    } else {
        ratio = calculateRatio(water, beans);
        // Aktualizuje hodnoty ratio
        ratioInput.value = ratio;
    }

    // Aktualizace yield
    const yieldResult = calculateYield(water);
    yieldInput.value = yieldResult;
}

beansInput.addEventListener('input', userInput);
waterInput.addEventListener('input', userInput);
ratioInput.addEventListener('input', userInput);
