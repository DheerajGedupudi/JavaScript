var a = 10;
var b = 5;

var add = a+b;
console.log(add);

var sub = a-b;
console.log(sub);

var mul = a*b;
console.log(mul);

var div = a/b;
console.log(div);

var preInc = a++;
console.log(preInc);

console.log("After assigning : "+a);

var postInc = ++a;
console.log(postInc);

var num = 1;
var str = "1";
console.log(num==str);
console.log(num===str);

num = 1;
str = 1;
console.log(num==str);
console.log(num===str);

num = 2;

if (num==1)
{
    console.log("Yes, num is 1");
}
else
{
    console.log("No, num is not 1");
}