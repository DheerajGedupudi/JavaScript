/**
*
* Assume we are fetching the data from a rest endpoint in the get data function.
* we can simulate the same by replacing the setTimeout with fetch api and executing the same in a browser.
*
*/

// function getData(uId) {
//     setTimeout(() => {
//         console.log("Fetched the data!");
//         return "skc@gmail.com";
//     }, 4000);
// }
    
// console.log("start");
// var email = getData("skc");
// console.log("Email id of the user id is: " + email);
// console.log("end");

// How do you solve this problem. How can we wait for till the function execution is completed, so that we can have correct email at line 10?



async function getData(uid)
{
    let a = 15;
    return new Promise( (resolve,reject)  => {
        setTimeout(() => {
            try 
            {
                console.log("Fetched the data!");
                if (a<=5)
                {
                    throw("Error encountered");
                }
                else
                {
                    resolve("skc@gmail.com");
                }
            }
            catch(error)
            {
                console.log("Inside catch block");
                reject(error);
            }
        }, 4000)
    })
}

console.log("start");
let email = getData("skc").then(
        result => {
            console.log("Email id of the user id is: " + result);
            console.log("end");
    }).catch(
        error => {
            console.log(error);
    })