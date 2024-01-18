const beansInput = document.querySelector('.beans');
const ratioInput = document.querySelector('.ratio');
const waterInput = document.querySelector('.water');
const yieldInput = document.querySelector('.coffee-yield');

const calculateWater = (beans, ratio) => {
    const water = beans * ratio;
    const yield = water * 0.9;

    return { water, yield };
};

const userInput = (event) => {
    const beans = beansInput.valueAsNumber || 0;
    const ratio = ratioInput.valueAsNumber || 0;

    const { water, yield } = calculateWater(beans, ratio);

    if (event.target === beansInput) {
        waterInput.value = water;
    }

    yieldInput.value = yield;
};

beansInput.addEventListener('input', userInput);
ratioInput.addEventListener('input', userInput);
