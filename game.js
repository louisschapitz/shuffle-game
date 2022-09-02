const btn_difficulty = document.querySelector(".game__btn--difficulty");
let states = ["medium", "hard", "easy"];
let difficulty_value = 0;

btn_difficulty.addEventListener('click', () => {
    btn_difficulty.innerText = states[difficulty_value];
    difficulty_value = (difficulty_value + 1) % states.length;
});


const items_container = document.querySelector('.game__board');

function new_pattern(items) {
    items_container.innerHTML = "";
    items.forEach(item => {
        items_container.innerHTML += `<div class="game__item game__item--${item}">${item}</div>`;
    });
}

function start() {
    const max_items = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const random_items = max_items.sort((a, b) => 0.5 - Math.random());

    new_pattern(random_items);

    items_container.addEventListener('click', (e) => {

        if (e.target.classList.contains('game__item')) {

            let empty_field_position = random_items.indexOf(9);
            let clicked = random_items.indexOf(Number(e.target.innerText));
            let switch_allowed = [];

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

            // console.log(`clicked: ${clicked}, empty_field_position: ${empty_field_position}`);

            if (switch_allowed.includes(clicked)) {
                [random_items[empty_field_position], random_items[clicked]] = [random_items[clicked], random_items[empty_field_position]];
                new_pattern(random_items);
            }

        }
    });

}

const start_button = document.querySelector('.game__btn--start');

start_button.addEventListener('click', start);