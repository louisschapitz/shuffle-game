function grid_positon(clicked) {
    let switch_allowed = [];
    let empty_field_position = current_items.indexOf(9);

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

    //

    let row_limit = all_items.length;
    let col_limit = Math.sqrt(row_limit);

    console.log('row_limit: '+row_limit+' col_limit: '+col_limit);

    for (let i = 0; i < row_limit; i++) {
        // var three = data[i] + data[i + 1] + data[i + 2];

        if (((i + 1) % col_limit) === 0) {
            console.log(i);
        }
    
    }

    //

    if (switch_allowed.includes(clicked)) {
        [current_items[empty_field_position], current_items[clicked]] = [current_items[clicked], current_items[empty_field_position]];
        new_pattern(current_items);
    }

}