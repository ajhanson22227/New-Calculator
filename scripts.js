let currentNumber = '';
let previousNumber = '';

//continueNumber will be the check to determine if we're adding to the current number
let continueNumber = false;
let operator = '';
let firstOperator = true;
let nextOperator = '';

let decimalOnScreen = false;


let displayVar = document.getElementById('display-screen');

let flashButton = document.querySelectorAll('.grid-item').forEach(button => {
    button.addEventListener('click', function(){
        button.classList.add('flash-button');
        button.addEventListener('animationend', function(){
            button.classList.remove('flash-button');
        } )
    })
})

let numberButtons = document.querySelectorAll('.number').forEach(number => {
    number.addEventListener('click', function(){
        //make sure it doesn't go past the display screen
        if ( currentNumber.length >= 14 ) return;

        //determine if the number is going towards the current number or a new one
        if (!continueNumber){
            continueNumber = true;
            clearScreen();
            decimalOnScreen = false;
            currentNumber = "";
            currentNumber += number.innerHTML;
            display(currentNumber);
        }
        else{
            currentNumber += number.innerHTML;
            display(currentNumber);
        }
    })
})

let operandButtons = document.querySelectorAll('.operand').forEach(operand => {
    operand.addEventListener('click', function(){
        if (firstOperator){
            currentOperator = operand.innerHTML;
            firstOperator = false; 
        }
        else{
            currentNumber = operate(previousNumber, currentNumber, currentOperator);
            currentNumber = parseFloat(currentNumber);

            currentNumber = +((currentNumber).toFixed(14));
            display(currentNumber)

            currentOperator = operand.innerHTML;
            decimalOnScreen = false;
        }
        previousNumber = parseFloat(currentNumber)
        
        //currentOperator = operand.innerHTML;
        continueNumber = false;
    })
})

let equalsButton = document.querySelector('.equals-button').addEventListener('click', function(){
    if (!(isNaN(previousNumber) || isNaN(currentNumber))){
        currentNumber = operate(previousNumber, currentNumber, currentOperator);
        currentNumber = parseFloat(currentNumber);

        currentNumber = +((currentNumber).toFixed(10));
        display(currentNumber)

        //reset operator flag
        firstOperator = true;
    }
    
    decimalOnScreen = false;
    //set flag to begin new number
    continueNumber = false;
})

let clearButton = document.querySelector('.clear-button').addEventListener('click', function(){
    reset();
});

let decimalButton = document.querySelector('.decimal').addEventListener('click', function(){
    if (!decimalOnScreen && continueNumber){
        currentNumber += '.';
        continueNumber = true;
        decimalOnScreen = true;
    }
    else if (!decimalOnScreen && !continueNumber){
        currentNumber = ".";
        decimalOnScreen = true;
        continueNumber = true;
    }
    display(currentNumber);
})

let negativeButton = document.querySelector('.negative-button').addEventListener('click', function(){
    currentNumber *= (-1);
    display(currentNumber);
})



function operate(firstNumber, secondNumber, operator){

    if (operator == '+'){
        return parseFloat(firstNumber) + parseFloat(secondNumber);
    }
    else if (operator == '-'){
        return( firstNumber - secondNumber);
    }
    else if (operator == '*'){
         return(firstNumber * secondNumber);
    }
    else if (operator == '/'){
        if (secondNumber == 0 || currentNumber == 0){
            return 0;
        }
        return(firstNumber / secondNumber);
    }
}

function clearScreen(){
    currentNumber = "";
    displayVar.innerHTML = "";
}

function display(number){
    number = number.toString();
    if (number.length < 20)
        displayVar.innerHTML = number;
    else
        displayVar.innerHTML = "OVERFLOW"
}

function reset(){
    currentNumber = 0;
    previousNumber = 0;
    decimalOnScreen = false;
    //continueNumber will be the check to determine if we're adding to the current number
    continueNumber = false;
    operator = '';
    firstOperator = true;
    nextOperator = '';
    display(currentNumber)
}

