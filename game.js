// Difficulty

const difficulty_input = document.querySelector(".difficulty input");
const difficulty_output = document.querySelector(".difficulty .output");

const difficulty_names = ["easy", "medium", "hard"];

const difficulty = () => {
    document.querySelector(".difficulty .output").innerText = difficulty_names[difficulty_input.value];
};

difficulty();
difficulty_input.addEventListener('input', difficulty);

// Difficulty

const items_container = document.querySelector('.game-container .items');

function start() {
    const max_items = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const random_items = max_items.sort((a, b) => 0.5 - Math.random());

    items_container.innerHTML = "";
    random_items.forEach(item => {
        items_container.innerHTML += `<div class="item item-${item}">${item}</div>`;
    });

    items_container.addEventListener('click', (e) => {
        let empty_field_position = random_items.indexOf(9);

        if (e.target.classList.contains('item')) {

            let clicked = e.target.innerText;
            let switch_allowed = [];
            
            if (empty_field_position === 0) {
                console.log(random_items[1], random_items[3]);
            }

            if (empty_field_position === 1) {
                console.log(random_items[0], random_items[2], random_items[4]);
            }

            if (empty_field_position === 2) {
                console.log(random_items[1], random_items[5]);
            }
            
            if (empty_field_position === 3) {
                console.log(random_items[0], random_items[4], random_items[6]);
            }


        }
    });



}
start();



