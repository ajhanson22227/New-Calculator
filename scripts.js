let displayVar = document.getElementById('display-screen');
let previousNumber = 0;
let currentNumber = 0;



let numberButtons = document.querySelectorAll('.number').forEach(number => {
    number.addEventListener('click', function(){
        displayVar.innerHTML += number.innerHTML;
    })
})

let operandButtons = document.querySelectorAll('.operand').forEach(operand => {
    operand.addEventListener('click', function(){
        displayVar.innerHTML = operand.innerHTML;
    })
})