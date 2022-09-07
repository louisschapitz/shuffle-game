const game_container = document.querySelector('.game');
const items_container = document.querySelector('.game__board');
const start_button = document.querySelector('.game__btn--start');
const restart_button = document.querySelector('.game__btn--restart');
const btn_difficulty = document.querySelector('.game__btn--difficulty');
let game_status = 0;
let current_items;
let all_items = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const difficulty_states = ["easy2", "medium", "hard", "easy"];
let difficulty_value = 0;
let row_limit = 3;

function all_items_refresh(row_limit) {
    all_items = [];
    for (let i = 1; i <= row_limit ** 2; i++) {
        all_items.push(i);
    }

    let grid = "";

    for (let i = 1; i <= row_limit; i++) {
        grid += '1fr ';
    }

    items_container.style.gridTemplateColumns = grid;
    items_container.style.gridTemplateRows = grid;

    new_pattern(all_items);
}

function random_items() {
    current_items = all_items.slice().sort((a, b) => 0.5 - Math.random());
    return current_items; // current_items = [1, 2, 3, 4, 5, 9, 7, 8, 6]; // Easy
}

btn_difficulty.addEventListener('click', () => {
    if (game_status == 0) {
        let difficulty_value_text = difficulty_states[difficulty_value];
        btn_difficulty.innerText = difficulty_value_text;
        difficulty_value = (difficulty_value + 1) % difficulty_states.length;

        if (difficulty_value == 1) {
            game_container.classList.add('game--img');
            btn_difficulty.classList.add('game__btn--easy2');
            row_limit = 3;
        }
        else {
            game_container.classList.remove('game--img');
            btn_difficulty.classList.remove('game__btn--easy2');
            row_limit = 3;
        }

        if (difficulty_value == 2) {
            row_limit = 4;
        }

        if (difficulty_value == 3) {
            row_limit = 5;
        }

        all_items_refresh(row_limit);

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

function formatTime(given_seconds) {
    let dateObj = new Date(given_seconds * 1000);
    let hours = dateObj.getUTCHours();
    let minutes = dateObj.getUTCMinutes();
    let seconds = dateObj.getSeconds();

    let timeString = hours.toString().padStart(2, '0') + ':' +
        minutes.toString().padStart(2, '0') + ':' +
        seconds.toString().padStart(2, '0');

    return timeString;
}

const game_timer = document.querySelector('.game__timer');
let game_seconds = 0;

function timer(status) {

    let refresh = () => {
        if (game_status == 1) {
            game_seconds++;
            game_timer.innerText = formatTime(game_seconds);
        }
        else {
            clearInterval(ticker);
            game_seconds = 0;
            game_timer.innerText = formatTime(game_seconds);
        }
    };

    let ticker = setInterval(refresh, 1000);

    refresh();

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
        timer(1);

        console.log(all_items);
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
        timer(0);
    }
});

game_container.addEventListener('click', e => {

    if (game_status === 1) {

        if (e.target.classList.contains('game__item')) {
            let clicked = current_items.indexOf(Number(e.target.innerText));
            grid_positon(clicked);
            correctMarker();

            if (all_items.toString() === current_items.toString()) {

                items_container.classList.add('game__board--win');
                let win_time = game_seconds;
                game_status = 0;

                setTimeout(() => {
                    alert(`Gewonnen! Zeit: ${formatTime(win_time)}`);
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


