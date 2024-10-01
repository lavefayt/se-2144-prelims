let calculatorOn = true;
let resultCalculated = false;

function clearDisplay() {
    const display = document.getElementById("input-display");
    const history = document.getElementById("history-expressions");

    if (calculatorOn) {
        display.value = "0";  
        history.value = "";    
        resultCalculated = false;  
    } else {
        turnOnCalculator();   
    }
}

function appendToDisplay(value) {
    if (!calculatorOn) return; 
    const display = document.getElementById("input-display");

    if (resultCalculated && !isOperator(value)) {
        display.value = "";   
    }
    resultCalculated = false;  

    if (display.value === "0" && value !== ".") {
        display.value = value;
    } else {
        display.value += value;  
    }
}

function isOperator(value) {
    return ['+', '-', '*', '/', '÷', '×'].includes(value);
}

function calculate() {
    if (!calculatorOn) return; 
    const display = document.getElementById("input-display");
    const history = document.getElementById("history-expressions");

    try {
        // Calculate the result
        const result = eval(display.value.replace(/×/g, '*').replace(/÷/g, '/'));
        
        history.value = display.value + " = " + result;
        
        display.value = result;

        resultCalculated = true;  
    } catch (e) {
        display.value = "Error";  
        resultCalculated = true;  
    }
}

function backspace() {
    if (!calculatorOn) return;  
    const display = document.getElementById("input-display");
    display.value = display.value.slice(0, -1) || "0";  // 
}

// Function to turn off the calculator (clear the display value but don't hide the screen)
function turnOffCalculator() {
    const display = document.getElementById("input-display");
    display.value = "";  
    calculatorOn = false;  
}

function turnOnCalculator() {
    const display = document.getElementById("input-display");
    display.value = "0";  
    calculatorOn = true;  
}

function showHello() {
    if (!calculatorOn) return;  
    const languages = ["Hello", "Kamusta", "Hola", "Meow", "Bonjour", "Hallo", "Ciao", "こんにちは", "안녕하세요"]; 
    const randomHello = languages[Math.floor(Math.random() * languages.length)];
    const display = document.getElementById("input-display");
    display.value = randomHello;  
}

// Adding event listeners for the buttons
document.getElementById("bye").addEventListener("click", turnOffCalculator);
document.getElementById("hello").addEventListener("click", showHello);
document.getElementById("AC").addEventListener("click", clearDisplay);
