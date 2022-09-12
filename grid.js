/*
Funktion zum Überprüfen, ob das übermittelte Feld neben dem leeren Feld liegt oder nicht.

Wenn die übermittelte Kachel benachbart mit der leeren Kachel ist, dann wird diese
mit der leeren Kachel getauscht und das Grid neu erstellt.

----

    Schleife: i ist gleich 0
        Wenn i kleiner als item_limit (z. B. 9)
            erhöhe i und die Quadratwurzel aus item_limit (z. B. 9 -> 3)

            Schleife: i_sub ist gleich i
                Wenn i_sub ist kleiner als col_limit + i
                    erhöhe i um 1
                    füge das aktuelle Item zum Array col_arr mit dem Wert aus dem zufälligen Array hinzu

                        Wenn das aktuelle Item 9 (unsichtbar) ist
                            setze den Wert i geteilt durch col_limit für column

                    Füge alle einzelnen Items pro Zeile zusammen zum result_arr hinzu
    Setze den Wert für row auf die Position des leeren Feldes (9) in der Zeile (column)
*/

function grid_positon(clicked) {
    let item_limit = current_items.length;
    let col_limit = Math.sqrt(item_limit);
    let empty_field_position = current_items.indexOf(item_limit);
    let result_arr = [];
    let neighbours = [];
    let row;
    let column;

    /*
    Schleife, um multidimensionales Array zu erstellen und die
    Position des unsichtbaren Felds in XY-Koordinaten zu erhalten
    */
    for (let i = 0; i < item_limit; i += col_limit) {
        let col_arr = [];
        for (let i_sub = i; i_sub < col_limit + i; i_sub++) {
            col_arr.push(current_items[i_sub]);

            if (current_items[i_sub] == item_limit) {
                column = i / col_limit;
            }
        }
        result_arr.push(col_arr);
    }
    row = result_arr[column].indexOf(item_limit);

    /*
    z. B.

    Wenn
        Zeile ist größer als 0
            und
        ein Feld über dem aktuellen Feld existiert
    Dann
        Füge die Position des Feldes in der aktuellen, zufälligen Reihenfolge
        zum Array neighbours hinzu
    */

    // Item top
    if (column > 0 && result_arr[column - 1][row]) {
        neighbours.push(current_items.indexOf(result_arr[column - 1][row]));
    }

    // Item bottom
    if (column < result_arr.length - 1 && result_arr[column + 1][row]) {
        neighbours.push(current_items.indexOf(result_arr[column + 1][row]));
    }

    // Item left
    if (result_arr[column][row - 1]) {
        neighbours.push(current_items.indexOf(result_arr[column][row - 1]));
    }

    // Item right
    if (result_arr[column][row + 1]) {
        neighbours.push(current_items.indexOf(result_arr[column][row + 1]));
    }


    /*
    Alte Version, nur 3x3:

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

    */


    if (neighbours.includes(clicked)) {
        [current_items[empty_field_position], current_items[clicked]] = [current_items[clicked], current_items[empty_field_position]];
        new_pattern(current_items);
        moveCount(1);
        /* Kacheln switchen */
    }
    else {
        if (clicked != empty_field_position) {
            console.log('Die Kacheln müssen benachbart sein.');
            /* Fehlermeldung */
        }
    }

}