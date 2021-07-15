const config = {
    "background": "https://i.ibb.co/QbdJM21/g4.jpg",
    "objects": [
        {
            "top": 158,
            "left": 205,
            "width": 40,
            "height": 93,
            "url": "https://i.ibb.co/y4Rqzr2/zont1.png"
        },
        {
            "top": 225,
            "left": 78,
            "width": 40,
            "height": 66,
            "url": "https://i.ibb.co/fCvR3qF/zont2.png"
        },
        {
            "top": 330,
            "left": 0,
            "width": 100,
            "height": 36,
            "url": "https://i.ibb.co/FY32Y3s/zont3.png"
        },
        {
            "top": 170,
            "left": 130,
            "width": 60,
            "height": 170,
            "url": "https://i.ibb.co/kJwfgH4/zont4.png"
        },
        {
            "top": 326,
            "left": 100,
            "width": 70,
            "height": 118,
            "url": "https://i.ibb.co/0hxxWTv/zont5.png"
        }
    ],
    "minFoundObjects": 3
}

const startGame = (background, app) => {
    background.src = config.background;

    let count = 0;
    const counter = document.createElement('div');
    counter.classList.add('counter');
    counter.innerHTML = `${count}/5`;
    app.appendChild(counter);

    const button = document.createElement('img');
    button.id = 'button';
    button.src = 'https://i.ibb.co/Gp8vSYC/knopka.png';
    button.classList.add('button-hidden');
    app.appendChild(button);

    config.objects.forEach(object => {
        const img = document.createElement('img');
        img.classList.add('umbrella');
        setObjectParams(img, object);
        app.appendChild(img);
    })
    selectObject(count, counter)
}

const startAd = () => {
    const app = document.getElementById('app');
    app.innerHTML = `<img id="background" class="background" src="https://i.ibb.co/b1705jK/g1.jpg" alt="background"/>`;
    const background = document.getElementById('background');
    background.addEventListener('click', () => startGame(background, app));
}

const setObjectParams = (img, object) => {
    img.src = object.url;
    img.style.left = object.left + 'px';
    img.style.top = object.top + 'px';
    img.style.width = object.width + 'px';
    img.style.height = object.height + 'px';
}

const selectObject = (count, counter) => {
    const allUmbrellas = document.querySelectorAll('.umbrella');
    const button = document.getElementById('button');
    allUmbrellas.forEach(u => {
        u.addEventListener('click', () => {
            count = count + 1;
            counter.innerHTML = `${count}/${config.objects.length}`;
            u.classList.add('selected');

            if (count === config.minFoundObjects) {
                button.classList.add('button');
            }

            button.addEventListener('click', () => startAd())
        });
    })

}

startAd();