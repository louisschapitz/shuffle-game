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
            
            if ([0, 2, 6, 8].includes(empty_field_position)) {
                console.log("2 Kontakte");
            }

            if ([1, 3, 5, 7].includes(empty_field_position)) {
                console.log("3 Kontakte");
            }
            
            if (empty_field_position == 4) {
                console.log("4 Kontakte");
            }
            
            



        }
    });



}
start();



