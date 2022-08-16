
console.log("\nFor Loop");
for (let i=1; i<=5; i++)
{
    console.log(i);
}

console.log("\nWhile Loop");
let i = 1;
while(i<=5)
{
    console.log(i);
    i++;
}

console.log("\nDo-While Loop");
i = 1;
do
{
    console.log(i);
    i++;
}
while(i<=5)

//new looooooooooooooops

let arr = [1,2,3,4,5];
console.log("\nFor-Of Loop");
for (const x of arr)
{
    console.log(x);
}

let obj = {myName : "Dheeraj", Phone : "12345", email : "dheeraj@gmail.com"};
console.log("\nFor-In Loop");
for (const x in obj)
{
    console.log(x);
}