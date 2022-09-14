/*
JavaScript Shuffle Game (Sliding Puzzle)
4 Schwierigkeitsstufen
>> Lemundo - 2022 <<

Beschreibung:
Das Ziel des Minispiels ist es, die Kacheln schnellstmöglich mit möglichst wenigen Versuchen
in die korrekte Reihenfolge zu bringen. Auf dem Spielfeld ist ein Feld jeweils leer.
Mit einem Klick auf ein benachbartes Feld kann das Feld verschoben werden.
Sobald sich eine Kachel an ihrer richtigen Position befindet, ändert sich ihre Farbe.
*/

// Variablen bzw. Konstanten - Deklarierung
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
const game_timer = document.querySelector('.game__timer');
let game_seconds = 0;
const game_moves = document.querySelector('.game__count');
let move_count = 0;
let gameMessage = document.querySelector('.game__message');
let playerName = localStorage.getItem('playerName');

/*
Spielernamen abfragen, wenn noch kein Name gespeichert ist
- Begrüßungsnachricht ein- und ausblenden
*/
if (playerName === null || playerName === "") {
    while (playerName === null || playerName === "") {
        playerName = prompt("What's your name?");
        localStorage.setItem('playerName', playerName);
    }
}
else {
    gameMessage.innerText = `Willkommen zurück, ${playerName}!`;
    gameMessage.classList.add('active');

    setTimeout(() => {
        gameMessage.innerText = "";
        gameMessage.classList.remove('active');
    }, 2000);
}

// Funktion zum Einsetzen des HTML-Codes für jede Kachel in den Item-Container, und ausblenden des letzten Felds
function new_pattern(items) {
    items_container.innerHTML = "";
    items.forEach(item => {
        items_container.innerHTML += `<div class="game__item game__item--${item}">${item}</div>`;
    });
    document.querySelector(`.game__item--${all_items.length}`).classList.add('game__item--hidden');
}

// Funktion, um den Array all_items neu in zufälliger Reihenfolge in der Variable current_items zu speichern
// slice() gibt die kompletten Array-Elemente von X bis Y aus
function random_items() {
    current_items = all_items.slice().sort((a, b) => 0.5 - Math.random());

    // Debug, Easy order
    current_items = [1, 2, 3, 4, 5, 9, 7, 8, 6];
    // current_items = [1, 2, 3, 9, 5, 6, 7, 8, 4, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

    return current_items;
}

/*
Funktion, um den Array all_items mit den Werten von 1 bis zum Quadrat vom Spaltenlimit zu überschreiben
Grid CSS-Eigenschaftswert für Spaltenlimit in fr erstellen
*/
function all_items_refresh(row_limit) {
    all_items = [];
    for (let i = 1; i <= row_limit ** 2; i++) {
        all_items.push(i);
    }

    let grid = "";

    for (let i = 0; i < row_limit; i++) {
        grid += '1fr ';
    }

    items_container.style.gridTemplateColumns = grid;
    items_container.style.gridTemplateRows = grid;

    new_pattern(all_items);
}

/*
Sobald der Button (difficulty) geklickt wurde und das Spiel inaktiv ist:
- Wird der Button-Text mit dem Wert der Schwierigkeit überschrieben
- Bei Schwierigkeit 1, werden die CSS-Klassen game--img und game__btn--easy2 hinzugefügt, um das Design zu ändern
- Am Ende der Funktion wird die Funktion all_items_refresh mit dem Parameter für die max. Spalten pro Zeile aufgerufen
*/
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

// Funktion, um allen Kacheln die CSS-Klasse game__item--correct hinzuzufügen, die sich an der richtigen Stelle befinden
function correctMarker() {
    for (let i = 0; i < current_items.length; i++) {
        if (current_items[i] == all_items[i]) {
            document.querySelector('.game__item--' + current_items[i]).classList.add('game__item--correct');
        }
    }
}

// Funktion, zum Umschalten der CSS-Klassen ...
function btnVisibility() {
    start_button.classList.toggle('game__btn--disabled');
    restart_button.classList.toggle('game__btn--disabled');
    items_container.classList.toggle('game__board--disabled');
    btn_difficulty.classList.toggle('game__btn--disabled');
}

// Funktion, um die Sekunden (Parameter) in das Format HH:MM:SS umzuwandeln
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

/*
Funktion zum Starten und automatischen Stoppen des Timers:
- Die Hauptfunktion ist in der refresh Variable gespeichert
    - Wenn das Spiel läuft, wird der Wert der Variable game_seconds um 1 erhöht und die Funktion mit game_seconds als Parameter aufgerufen
    - Wenn das Spiel nicht mehr läuft, wird die Intervall-Funktion beendet und die Zeit auf 0 zurückgesetzt
- Die Intervall-Funktion wird in der Variable ticker gespeichert
    - Die Intervall-Funkion ruft alle 1000ms die refresh Funktion auf
- Die Hauptfunktion wird direkt aufgerufen, da sonst eine Verzögerung beim Neustarten des Spiels von 1000ms auftritt
*/
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

/*
Funktion zum Zurück(Setzen) des Zählers, Anzahl der Versuche
*/
function moveCount(status) {

    if (status == 1) {
        move_count++;
    }
    else {
        move_count = 0;
    }
    game_moves.innerText = move_count;

}

/*
(Neu-)Start Funktionen, bei Klick
- Spielstatus wird (de)aktiviert
- Funktion new_pattern wird aufgerufen, Grid neu generieren
(- Die Funktion correctMarker wird aufgerufen, um alle Kacheln, die sich an der richtigen Position befinden, farbig zu markieren)
- Funktion btnVisibility wird aufgerufen, Buttons de(aktivieren)
- Timer wird de(aktiviert)
*/
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
        moveCount(0);
    }
});

/*
Kernfunktion (Klick auf das Spielfeld)
Wenn das Spiel läuft und das Ziel eine Kachel ist:
    - Die Stelle, an der sich die Kachel im Spielfeld befindet, wird in der Variable clicked gespeichert
    - Die Funktion grid_positon wird mit dem Parameter clicked aufgerufen => Prüfung, ob Felder benachbart sind => Verschieben
    - Die Funktion correctMarker wird aufgerufen, um alle Kacheln, die sich an der richtigen Position befinden, farbig zu markieren
    Wenn alle Kacheln sich an der richtigen Position befinden:
        - Der items_container erhält die CSS-Klasse game__board--win
        - Aktuelle Timerzeit wird in der Variable win_time gespeichert
            Nach 1000ms:
             - Meldung "Gewonnen!" mit der Spielzeit win_time wird angezeigt
             - CSS-Klassen werden umgeschaltet
*/
game_container.addEventListener('click', e => {

    if (game_status === 1) {

        if (e.target.classList.contains('game__item')) {
            let clicked = current_items.indexOf(Number(e.target.innerText));
            grid_positon(clicked);
            correctMarker();

            if (all_items.toString() === current_items.toString()) {

                items_container.classList.add('game__board--win');
                let win_time = game_seconds;
                let win_count = move_count;
                game_status = 0;
                moveCount(0);

                setTimeout(() => {
                    alert(`Gewonnen! Zeit: ${formatTime(win_time)} - Versuche: ${win_count}`);

                    /*
                    addDoc(colRef, {
                        player: playerName,
                        mode: difficulty_value,
                        moves: win_count,
                        time: win_time
                    });
                    */

                    testf();

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