if (localStorage.getItem('counter')==null)
{
    localStorage.setItem('counter', 0);
}

if (sessionStorage.getItem('counter')==null)
{
    sessionStorage.setItem('counter', 0);
}

window.onload = function() {
    document.getElementById("session_counter").innerHTML = sessionStorage.getItem('counter');
    document.getElementById("local_counter").innerHTML = localStorage.getItem('counter');
}

function incrementSessionCounter()
{
    sessionStorage.setItem('counter', parseInt(sessionStorage.getItem('counter'), 10)+1);
    document.getElementById("session_counter").innerHTML = sessionStorage.getItem('counter');
}

function decrementSessionCounter()
{
    sessionStorage.setItem('counter', parseInt(sessionStorage.getItem('counter'), 10)-1);
    document.getElementById("session_counter").innerHTML = sessionStorage.getItem('counter');
}

function clearSessionCounter()
{
    sessionStorage.setItem('counter', 0);
    document.getElementById("session_counter").innerHTML = sessionStorage.getItem('counter');
}

function incrementLocalCounter()
{
    localStorage.setItem('counter', parseInt(localStorage.getItem('counter'), 10)+1);
    document.getElementById("local_counter").innerHTML = localStorage.getItem('counter');
}

function decrementLocalCounter()
{
    localStorage.setItem('counter', parseInt(localStorage.getItem('counter'), 10)-1);
    document.getElementById("local_counter").innerHTML = localStorage.getItem('counter');
}

function clearLocalCounter()
{
    localStorage.setItem('counter', 0);
    document.getElementById("local_counter").innerHTML = localStorage.getItem('counter');
}
