let calculatorOn = true;
let resultCalculated = false;
let lastInputWasOperator = false;  

const display = document.getElementById("input-display");
const history = document.getElementById("history-expressions");
const languages = ["Hello", "Kamusta", "Hola", "Meow", "Bonjour", "Hallo", "Ciao", "こんにちは", "안녕하세요"]; 

function clearDisplay() {
    if (calculatorOn) {
        display.value = "0";  
        history.value = "";    
        resultCalculated = false;  
        lastInputWasOperator = false;  
    } else {
        turnOnCalculator(); 
    }
}

function appendToDisplay(value) {
    if (!calculatorOn) return; 

    if (isOperator(value)) {
        if (lastInputWasOperator) {
            return;  
        }
        lastInputWasOperator = true;  

        if (resultCalculated) {
            resultCalculated = false;  
        }
    } else {
        lastInputWasOperator = false;  
    }

    if (resultCalculated && !isOperator(value)) {
        display.value = "";  
        resultCalculated = false;
    }

    const lastOperatorIndex = Math.max(display.value.lastIndexOf('+'), display.value.lastIndexOf('-'), display.value.lastIndexOf('*'), display.value.lastIndexOf('÷'), display.value.lastIndexOf('/'));
    const currentPart = display.value.slice(lastOperatorIndex + 1);  

    if (currentPart.includes(".") && value === ".") {
        return;  
    }
    if (currentPart === "" && value === ".") {
        display.value += "0.";  
        return;
    }
    if (display.value === "0") {
        if (value === ".") {
            display.value = "0."; 
        } else {
            display.value = value;  
        }
    } 
    else if (display.value === "0" && value === "0") {
        return;  
    }
    else {
        display.value += value; 
    }

    // Limit display length to 20 characters
    if (display.value.length >= 20) return;
}


function isOperator(value) {
    return ['+', '-', '/', '÷', '*', '×'].includes(value);
}

function calculate() {
    if (!calculatorOn) return; 

    try {
        
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

    display.value = display.value.slice(0, -1) || "0"; 

    let lastChar = display.value.slice(-1);
    if (isOperator(lastChar)) {
        lastInputWasOperator = true;
    } else {
        lastInputWasOperator = false;
    }

    resultCalculated = false; 
}

function turnOffCalculator() {
    if (calculatorOn) {
        display.value = "Goodbye";  
        history.value = ""
        calculatorOn = false;  

        setTimeout(() => {
            display.value = "";  
            calculatorOn = false;
        }, 1000);
    }
}

function turnOnCalculator() {
    display.value = "0";  
    calculatorOn = true;  
}

function showHello() {  
    if (!calculatorOn) return;
    
    const randomHello = languages[Math.floor(Math.random() * languages.length)];
    display.value = randomHello;
    history.value = "";
}

document.getElementById("bye").addEventListener("click", turnOffCalculator);
document.getElementById("hello").addEventListener("click", showHello);
document.getElementById("AC").addEventListener("click", clearDisplay);
