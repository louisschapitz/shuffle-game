const game_container = document.querySelector('.game');
const items_container = document.querySelector('.game__board');
const start_button = document.querySelector('.game__btn--start');
const restart_button = document.querySelector('.game__btn--restart');
const btn_difficulty = document.querySelector('.game__btn--difficulty');
let game_status = 0;

const all_items = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let current_items;
function random_items() {
    current_items = all_items.slice().sort((a, b) => 0.5 - Math.random());
    // current_items = [1, 2, 3, 4, 5, 9, 7, 8, 6]; // Easy
    return current_items;
}

const states = ["medium", "hard", "easy"]; // 4x4 | 5x5 | 3x3
let difficulty_value = 0;
btn_difficulty.addEventListener('click', () => {
    if (game_status == 0) {
        let difficulty_value_text = states[difficulty_value];
        btn_difficulty.innerText = difficulty_value_text;
        difficulty_value = (difficulty_value + 1) % states.length;

        if (difficulty_value == 2) {
            game_container.classList.add('game--img');
            btn_difficulty.classList.add('game__btn--hard');
        }
        else {
            game_container.classList.remove('game--img');
            btn_difficulty.classList.remove('game__btn--hard');
        }
    }
});

function new_pattern(items) {
    items_container.innerHTML = "";
    items.forEach(item => {
        items_container.innerHTML += `<div class="game__item game__item--${item}">${item}</div>`;
    });
}

function correctMarker() {
    for (let i = 0; i < current_items.length; i++) {
        if (current_items[i] == all_items[i]) {
            document.querySelector('.game__item--' + current_items[i]).classList.add('game__item--correct');
        }
    }
}

function btnVisibility() {
    start_button.classList.toggle('game__btn--disabled');
    restart_button.classList.toggle('game__btn--disabled');
    items_container.classList.toggle('game__board--disabled');
    btn_difficulty.classList.toggle('game__btn--disabled');
}

/*
function timer(status) {
    let before_time = new Date().getSeconds();

    function reload() {
        if (status == 1) {
            let current_time = new Date().getSeconds();
            game_timer.innerText = current_time - before_time;

            console.log('test');

            setTimeout('reload' , 1000);
        } 
    }

    reload();

}
*/

const game_timer = document.querySelector('.game__timer');
function timerStart(status) {
    if (status == 1) {

        let i = 0;

        setInterval(() => {
            if (game_status == 1) {
                i++;
                game_timer.innerText = i/3600;
            }
        }, 1000);
    }
}

start_button.addEventListener('click', () => {
    if (start_button.classList.contains('game__btn--disabled')) {
        return;
    }
    else {
        game_status = 1;
        new_pattern(random_items());
        correctMarker();
        btnVisibility();
        timerStart(1);
    }
});

restart_button.addEventListener('click', () => {
    if (restart_button.classList.contains('game__btn--disabled')) {
        return;
    }
    else {
        game_status = 0;
        new_pattern(all_items);
        btnVisibility();
    }
});

game_container.addEventListener('click', e => {

    if (game_status === 1) {

        if (e.target.classList.contains('game__item')) {
            let clicked = current_items.indexOf(Number(e.target.innerText));
            grid_positon(clicked);
            correctMarker();

            if (all_items.toString() === current_items.toString()) {

                game_status = 0;
                items_container.classList.add('game__board--win');

                setTimeout(() => {
                    alert('Gewonnen!');
                    items_container.classList.toggle('game__board--disabled');
                    start_button.classList.toggle('game__btn--disabled');
                    restart_button.classList.toggle('game__btn--disabled');
                    items_container.classList.remove('game__board--win');
                    btn_difficulty.classList.toggle('game__btn--disabled');
                }, 1000);

            }

        }
    }
});