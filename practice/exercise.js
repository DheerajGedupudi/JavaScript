const sect = document.querySelector('section');

const para = document.createElement('p');
para.textContent = 'Hello! How are you?';

sect.appendChild(para);

const text = document.createTextNode(' the website is being developed ');

const linkPara = document.querySelector('p');
linkPara.appendChild(text);

