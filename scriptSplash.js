const input = document.querySelector('input');
const button = document.querySelector('.splash button');
let ar = [];
const paragraf = document.querySelector('.splash p');
let rules;
let counter = 0;
let interval;
const splash = document.querySelector('.splash');

function printRules() {
    let name = input.value;
    if (name != '') {
        rules = `Hello ${name} Wellcome to our game`;
        input.remove();
        button.remove();
        interval = setInterval(iteration, 150);
    }
}

function iteration() {
    ar.push(rules[counter]);
    paragraf.innerHTML = ar.join('');
    counter++;
    if (counter > rules.length) {
        clearInterval(interval);
        let a = document.createElement('a');
        a.innerHTML = 'Start Game';
        a.setAttribute('href', 'index.html');
        splash.appendChild(a);
    }
}

button.addEventListener('click', printRules);
