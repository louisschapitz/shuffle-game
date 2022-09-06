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
    current_items = [1, 2, 3, 4, 5, 9, 7, 8, 6];
    return current_items;
}

const states = ["medium", "hard", "easy"]; // 4x4 | 5x5 | 3x3
let difficulty_value = 0;
btn_difficulty.addEventListener('click', () => {
    if (game_status == 0) {
        btn_difficulty.innerText = states[difficulty_value];
        difficulty_value = (difficulty_value + 1) % states.length;
    
        if (difficulty_value > 0) {
            game_container.classList.add('game--img');
        }
        else {
            game_container.classList.remove('game--img');
        }
    }
});

function new_pattern(items) {
    items_container.innerHTML = "";
    items.forEach(item => {
        items_container.innerHTML += `<div class="game__item game__item--${item}">${item}</div>`;
    });
}

start_button.addEventListener('click', () => {
    if (start_button.classList.contains('game__btn--disabled')) {
        return;
    }
    else {
        game_status = 1;
        new_pattern(random_items());
        start_button.classList.toggle('game__btn--disabled');
        restart_button.classList.toggle('game__btn--disabled');
        items_container.classList.toggle('game__board--disabled');
        btn_difficulty.classList.toggle('game__btn--disabled');
    }
});

restart_button.addEventListener('click', () => {
    if (restart_button.classList.contains('game__btn--disabled')) {
        return;
    }
    else {
        game_status = 1;
        new_pattern(all_items);
        start_button.classList.toggle('game__btn--disabled');
        restart_button.classList.toggle('game__btn--disabled');
        items_container.classList.toggle('game__board--disabled');
        btn_difficulty.classList.toggle('game__btn--disabled');
    }
});

game_container.addEventListener('click', e => {

    if (game_status === 1) {

        if (e.target.classList.contains('game__item')) {

            let empty_field_position = current_items.indexOf(9);
            let clicked = current_items.indexOf(Number(e.target.innerText));
            let switch_allowed = [];

            // console.log('clicked: ' + clicked + ' - empty_field_position: ' + empty_field_position);

            if (empty_field_position === 0) {
                switch_allowed.push(1, 3);
            }
            if (empty_field_position === 1) {
                switch_allowed.push(0, 2, 4);
            }
            if (empty_field_position === 2) {
                switch_allowed.push(1, 5);
            }
            if (empty_field_position === 3) {
                switch_allowed.push(0, 4, 6);
            }
            if (empty_field_position === 4) {
                switch_allowed.push(1, 3, 5, 7);
            }
            if (empty_field_position === 5) {
                switch_allowed.push(2, 4, 8);
            }
            if (empty_field_position === 6) {
                switch_allowed.push(3, 7);
            }
            if (empty_field_position === 7) {
                switch_allowed.push(6, 4, 8);
            }
            if (empty_field_position === 8) {
                switch_allowed.push(5, 7);
            }
            if (switch_allowed.includes(clicked)) {
                [current_items[empty_field_position], current_items[clicked]] = [current_items[clicked], current_items[empty_field_position]];
                new_pattern(current_items);
            }

            /*
            current_items.forEach(item => {
                if (item[i] == all_items[i]) {
                    item[i].classList.add('game__item--correct');
                }
            });
            */
           
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