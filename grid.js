/*
Funktion zum Überprüfen, ob das übermittelte Feld neben dem leeren Feld liegt oder nicht.

Wenn die übermittelte Kachel benachbart mit der leeren Kachel ist, dann wird diese
mit der leeren Kachel getauscht und das Grid neu erstellt.

- Version 1.0 nur 3x3-Feld
- Effizientere Version für 4x4 / 5x5 im Aufbau
*/
function grid_positon(clicked) {
    let switch_allowed = [];
    let empty_field_position = current_items.indexOf(9);

    if (difficulty_value == 0 || difficulty_value == 1) {
        if (empty_field_position === 0) {
            switch_allowed.push(1, 3);
        }
        else if (empty_field_position === 1) {
            switch_allowed.push(0, 2, 4);
        }
        else if (empty_field_position === 2) {
            switch_allowed.push(1, 5);
        }
        else if (empty_field_position === 3) {
            switch_allowed.push(0, 4, 6);
        }
        else if (empty_field_position === 4) {
            switch_allowed.push(1, 3, 5, 7);
        }
        else if (empty_field_position === 5) {
            switch_allowed.push(2, 4, 8);
        }
        else if (empty_field_position === 6) {
            switch_allowed.push(3, 7);
        }
        else if (empty_field_position === 7) {
            switch_allowed.push(6, 4, 8);
        }
        else if (empty_field_position === 8) {
            switch_allowed.push(5, 7);
        }
    }
    else {


        // console.log(all_items);
        // row_limit

        let test_arr = all_items;
        let row_array = [];
        let new_arr = [];

        for (let i = 0; i < 4 ** 2; i += 4) {
            let sub_arr = [];
            sub_arr.push(test_arr[i], test_arr[i + 1], test_arr[i + 2], test_arr[i + 3]);
            new_arr.push(sub_arr);
        }

        // console.log(new_arr.indexOf(clicked));

        for (let y = 0; y < new_arr.length; y++) {

            console.log(new_arr[y]);


        }



    }

    /*

    let row_limit = all_items.length;
    let col_limit = Math.sqrt(row_limit);

    console.log('row_limit: '+row_limit+' col_limit: '+col_limit);

    for (let i = 0; i < row_limit; i++) {
        // var three = data[i] + data[i + 1] + data[i + 2];

        if (((i + 1) % col_limit) === 0) {
            console.log(i);
        }
    
    }

    */

    if (switch_allowed.includes(clicked)) {
        [current_items[empty_field_position], current_items[clicked]] = [current_items[clicked], current_items[empty_field_position]];
        new_pattern(current_items);
        moveCount(1);
        /* Kacheln switchen */
    }
    else {
        if (clicked != empty_field_position) {
            console.log('Die Kacheln müssen benachbart sein.');
        }
        return;
    }

}