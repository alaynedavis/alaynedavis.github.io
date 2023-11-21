// TODO:
//      - randomWord()
//      - checkWord()
//      - dailyWord();

// --- READ FIRST ---
// Working with APIs hosted on RapidAPI requires you
// to pass in an extra argument into fetch()
// This extra argument is an object containing the method, key, and host name
// These are done for you. Do not change these.
// The only thing you need to do is to make sure you pass the "option" object
// as a second argument into your fetch() request:
// e.g.
//      const response = await fetch("url", options);
// ------------------

// Input: no arguments
// Output: a five-letter string
// Calls the API for a randomly-generated five-letter word and return the string
// API: https://rapidapi.com/sheharyar566/api/random-words5/
// --- IMPORTANT ---
// for some reason this API works a bit differently
// because the developer was too lazy to fix an issue
// instead of calling .json() on the fetch response,
// you should call .text() instead.
// note that this will no longer return you a JSON object
// so double check the data type and determine how to proceed.
async function randomWord(){
    // --- DO NOT CHANGE ---
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd911a175famsh4ee8f949e488da1p1300c2jsn0d2dcb5a1acb',
            'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
        }
    };
    // ---------------------
    
    const endpoint = "https://random-words5.p.rapidapi.com/getRandom";

    const parameters = "?wordLength=5"

    const apiResponses = await fetch(endpoint + parameters, options);
    console.log(apiResponses);

    if(apiResponses.status == 200 && apiResponses.ok == true){
        // get the actual data
        const data = await apiResponses.text();
        console.log(data);
        return data;
    } else {
        console.log("API did not return a healthy response");
        alert("API did not return a healthy response");
    }
}

// Input: a five-letter string
// Output: no return value, but must call specific functions (read below)
// Calls the API to see if the five-letter string is a valid word
// API: https://rapidapi.com/apininjas/api/dictionary-by-api-ninjas/
//
// Call the following functions depending on whether the word is valid or not
//      If the word is a valid five-letter word, call makeGuess()
//      If the word is an invalid five-letter word, send an alert() message and call resetGuess()

// https://rapidapi.com/apininjas/api/dictionary-by-api-ninjas/
async function checkWord(word){
    // --- DO NOT CHANGE ---
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd911a175famsh4ee8f949e488da1p1300c2jsn0d2dcb5a1acb',
            'X-RapidAPI-Host': 'dictionary-by-api-ninjas.p.rapidapi.com'
        }
    };
    // ---------------------
    const endpoint = "https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary";

    const parameters = `?word=${word}`;

    const apiResponses = await fetch(endpoint + parameters, options);
    console.log(apiResponses);

    if(apiResponses.status == 200 && apiResponses.ok == true){
        // get the actual data
        const data = await apiResponses.json();
        console.log(data);
        if(data.valid == true){
            makeGuess();
        } else {
            alert("invalid word");
            resetGuess();
        }
    } else {
        console.log("API did not return a healthy response");
        alert("API did not return a healthy response");
    }

}

// Input: no arguments
// Output: a five-letter string
// Calls the API for the daily Wordle word
// API: https://rapidapi.com/azizbergach/api/wordle-game-api1/

// Calls the API to get the daily word used on the offical Wordle website
// word changes daily.
async function dailyWord(){
    // --- DO NOT CHANGE ---
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd911a175famsh4ee8f949e488da1p1300c2jsn0d2dcb5a1acb',
            'X-RapidAPI-Host': 'wordle-game-api1.p.rapidapi.com'
        }
    };
    // ---------------------

    const endpoint = "https://wordle-game-api1.p.rapidapi.com/word";

    // const parameters = "";

    const apiResponses = await fetch(endpoint, options);
    console.log(apiResponses);

    if(apiResponses.status == 200 && apiResponses.ok == true){
        // get the actual data
        const data = await apiResponses.json();
        console.log(data);
        return data.word;
    } else {
        console.log("API did not return a healthy response");
        alert("API did not return a healthy response");
    }
}



// ---------------- LIBRARY --------------------
// Do not make any edits in this section
// You may reference and use functions in this section
// ---------------- LIBRARY --------------------
let INDEX = 0;
let alph = "qwertyuiopasdfghjklzxcvbnm";

function updateColor(){
    // get target
    const target = getTarget();
    
    // compare for each guess cell
    document.querySelectorAll("th.guess").forEach((elem, i) => {
        if (target.includes(elem.innerHTML)){
            elem.style.backgroundColor = "yellow";
        }
        if (target[i] == elem.innerHTML){
            elem.style.backgroundColor = "green";
        }
    });
}

function updateKeyboardColor(){
    // get each letter in the guess word
    document.querySelectorAll("th.guess").forEach((letter, i) => {
        // do yellows first:
        //  - letter is in the target word
        if (getTarget().includes(letter.innerHTML)){
            // find the correct key to color
            document.querySelectorAll("th.key").forEach((key) => {
                // match the key letter with the guess letter
                // also want to check if the key is not green
                if (letter.innerHTML == key.innerHTML && key.style.backgroundColor != "green"){
                    // color the key yellow
                    key.style.backgroundColor = "yellow";
                    return;
                }
            });
        }

        // do greens next:
        //  - the letter is the same position and text as target
        if (getTarget()[i] == letter.innerHTML){
            // find the correct key to color
            document.querySelectorAll("th.key").forEach((key) => {
                // match th ekey letter with the guess letter
                if (letter.innerHTML == key.innerHTML){
                    // color the key green
                    key.style.backgroundColor = "green";
                    return;
                }
            });
        }
    });
}


function resetKeyboardColor(){
    document.querySelectorAll("th.key").forEach((key) => {
        key.style.backgroundColor = "white";
    });
}

function addGuessRow(){
    // create a new row
    const newRow = document.createElement("tr");

    // get each guess letter
    // this still exists, but just gets returned to XXXXX immediately
    // so it's not seen on the webpage, but the logic is retained
    document.querySelectorAll("th.guess").forEach((letter) => {
        // create a new <th>
        const newH = document.createElement("th");
        
        // initialize newH with the same innerHTML and color
        newH.innerHTML = letter.innerHTML;
        newH.style.backgroundColor = letter.style.backgroundColor;
        
        // add newH to the newRow
        newRow.appendChild(newH);
    });

    // add newRow (now populated with all the <th>) to table
    document.getElementById("guessTable").appendChild(newRow);
}

function resetGuessRows(){
    // delete every child from the guessTable
    const tab = document.getElementById("guessTable");

    // as long as there are still children in the table
    while (tab.firstChild){
        // remove the child
        tab.removeChild(tab.firstChild);
    }
}

function setKeys(){
    document.querySelectorAll("th.key").forEach((elem) =>{
        elem.addEventListener("click", ()=>{
            if (INDEX < 5){
                document.querySelectorAll("th.guess")[INDEX++].innerHTML = elem.innerHTML.trim();
            }
        });
    });

    document.querySelectorAll("th.key").forEach((elem, i) =>{
            document.addEventListener("keydown", (event) =>{
            if (event.key == alph[i]){
                if (INDEX < 5){
                    document.querySelectorAll("th.guess")[INDEX++].innerHTML = elem.innerHTML.trim();
                }
            }
        });
    });
}

// Reset Button Functionality
async function resetClick(){
    INDEX = 0;
    setTarget(await randomWord());
    document.querySelectorAll("th.guess").forEach((elem) => {
        elem.style.backgroundColor = "white";
        elem.innerHTML = "X";
    });

    resetKeyboardColor();
    resetGuessRows();
    
    // reconnect guess button
    document.getElementById("guessBtn").addEventListener("click", guessClick);
}

// Clears guess back to XXXXX and white background
function resetGuess(){
    document.querySelectorAll("th.guess").forEach((elem) => {
        elem.style.backgroundColor = "white";
        elem.innerHTML = "X";
    })
    INDEX = 0;
}

// Sets the guess table row text to guessString
function setGuess(guessWord){
    document.querySelectorAll("th.guess").forEach((elem, i) => {elem.innerHTML = guessWord[i];});
}

// Sets the target table row text to targetString
function setTarget(target){
    document.querySelectorAll("th.target").forEach((elem, i) => {elem.innerHTML = String(target[i]).toUpperCase()});
}

// Returns current text in guess table row (string)
function getGuess(){
    guess = "";
    document.querySelectorAll("th.guess").forEach((elem) => {guess += elem.innerHTML});
    return guess;
}

// Returns current text in target table row (string)
function getTarget(){
    target = "";
    document.querySelectorAll("th.target").forEach((elem) => {target += elem.innerHTML;});
    return target;
}

// Checks win condition
function checkWin(){
    if (getGuess() == getTarget()){
        setTimeout(function(){
            alert("You got the word!");
        }, 100);
        document.getElementById("guessBtn").removeEventListener("click", guessClick);
    }
}

// Create keyboard dynamically
function createKeyboard(){
    const TOP = 10;
    const MID = 9;
    const BOT = 7;

    const topRow = document.createElement("tr");
    for (let i = 0; i < TOP; ++i){
        const cell = document.createElement("th");
        cell.className = "key";
        cell.innerHTML = alph[i].toUpperCase();
        topRow.appendChild(cell);
    }
    document.getElementById("topTab").appendChild(topRow);

    const midRow = document.createElement("tr");
    for (let i = TOP; i < TOP + MID; ++i){
        const cell = document.createElement("th");
        cell.className = "key";
        cell.innerHTML = alph[i].toUpperCase();
        midRow.appendChild(cell);
    }
    document.getElementById("midTab").appendChild(midRow);


    const botRow = document.createElement("tr");
    for (let i = TOP + MID; i < TOP + MID + BOT; ++i){
        const cell = document.createElement("th");
        cell.className = "key";
        cell.innerHTML = alph[i].toUpperCase();
        botRow.appendChild(cell);
    }
    document.getElementById("botTab").appendChild(botRow);
}

// Checks win condition
function checkWin(){
    if (getGuess() == getTarget()){
        setTimeout(function(){
            alert("You got the word!");
        }, 100);
        document.getElementById("guessBtn").removeEventListener("click", guessClick);
    }
    else{
        addGuessRow();
        resetGuess();
    }
}

function guessClick(){
    checkWord(getGuess().toLowerCase());
}

function makeGuess(){
    // set word, update color, check win condition
    updateColor();

    // must happen after new word is loaded
    updateKeyboardColor();

    // Check win condition
    checkWin();
}

async function todayBtn(){
    setTarget(await dailyWord());

}

async function init(){
    // connect buttons
    document.getElementById("guessBtn").addEventListener("click", guessClick);
    document.getElementById("resetBtn").addEventListener("click", resetClick);
    document.getElementById("todayBtn").addEventListener("click", todayBtn);

    setTarget("XXXXX");

    // load word
    setTarget(await randomWord());

    // create keyboard
    createKeyboard();

    // set key functionality
    setKeys();

    // set enter functionality
    document.addEventListener("keydown", (event) =>{
        if (event.key == "Enter"){
            guessClick();
        }
    });
}

init();
