import config from "./config.js";

const startAd = () => {
    const app = document.getElementById('app');
    app.innerHTML = `<img id="background" class="background" src="https://i.ibb.co/b1705jK/g1.jpg" alt="background"/>`;
    const background = document.getElementById('background');
    const startGameHandler = () => {
        startGameAd(background, app);
        background.removeEventListener('click', startGameHandler, false);
    };
    background.addEventListener('click', startGameHandler);
}

const startGameAd = (background, app) => {
    background.src = config.background;

    const positionCalculator = {
        ratioX: app.offsetWidth / config.backgroundSize.width,
        ratioY: app.offsetHeight / config.backgroundSize.height,
        calculateX: function (inputX) {
            return inputX * this.ratioX
        },
        calculateY: function (inputY) {
            return inputY * this.ratioY;
        }
    }

    let count = 0;
    const counter = document.createElement('div');
    setCounterParams(counter, positionCalculator);
    counter.innerHTML = `${count}/${config.objects.length}`;
    app.appendChild(counter);

    const button = document.createElement('img');
    button.id = 'button';
    button.src = 'https://i.ibb.co/Gp8vSYC/knopka.png';
    setButtonParams(button, positionCalculator);
    app.appendChild(button);

    config.objects.forEach(object => {
        const img = document.createElement('img');
        img.classList.add('object');
        setObjectParams(img, object, positionCalculator);
        app.appendChild(img);
    });
    selectObject(count, counter);
}

const setObjectParams = (img, object, positionCalculator) => {
    img.src = object.url;
    img.style.left = positionCalculator.calculateX(object.left) + 'px';
    img.style.top = positionCalculator.calculateY(object.top) + 'px';
    img.style.width = positionCalculator.calculateX(object.width) +  'px';
    img.style.height = positionCalculator.calculateY(object.height) + 'px';
}

const setCounterParams = (counter, positionCalculator) => {
    counter.style.position = 'absolute';
    counter.style.left = positionCalculator.calculateX(config.counter.left) + 'px';
    counter.style.top = positionCalculator.calculateY(config.counter.top) + 'px';
    counter.style.fontSize = positionCalculator.calculateY(config.counter.fontSize) + 'px';
}

const setButtonParams = (button, positionCalculator) => {
    button.classList.add('button-hidden');
    button.style.top = positionCalculator.calculateY(config.button.top) + 'px';
    button.style.left = positionCalculator.calculateX(config.button.left) + 'px';
    button.style.width = positionCalculator.calculateX(config.button.width) + 'px';
    button.style.height = positionCalculator.calculateY(config.button.height) + 'px';
}

const selectObject = (count, counter) => {
    const allObjects = document.querySelectorAll('.object');
    const button = document.getElementById('button');
    allObjects.forEach(u => {
        u.addEventListener('click', () => {
            count = count + 1;
            counter.innerHTML = `${count}/${config.objects.length}`;
            u.classList.add('object-hidden');
            u.style.top = 0 + 'px';

            if (count === config.minFoundObjects) {
                button.classList.add('button');
            }
        });

    })
    button.addEventListener('click', () => startAd());
}

startAd();
