//Q1
function add(a, b)
{
    return a+b;
}

function sub(a, b)
{
    return a-b;
}

function mul(a, b)
{
    return a*b;
}

function div(a, b)
{
    return a/b;
}

function calc(a, operation, b)
{
    return operation(a, b);
}

let a = 11;
let b = 4;

console.log("\na = "+a+", b = "+b+"\n");
console.log("Addition : "+calc(a, add, b));
console.log("Subtraction : "+calc(a, sub, b));
console.log("Multiplication : "+calc(a, mul, b));
console.log("Division : "+calc(a, div, b));

//Q2
let myFunction = (firstName, lastName) => { return firstName.charAt(0)+lastName.charAt(0)};

console.log(myFunction("Roger", "Waters"));