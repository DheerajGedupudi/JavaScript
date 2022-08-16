window.onload = function()
{
    displayTableList(tableList);
    displayFoodList(menu);
}

//Food Class
class Food {
    constructor(name, type, price)
    {
        this.name = name;
        this.type = type;
        this.price = price;
    }
}

Food.prototype.toString = function()
{
    return `Name : ${this.name}; Type : ${this.type}; Price : ${this.price}`;
}

//Menu Creation
let chicken_pizza = new Food("Chicken Pizza", "Main Course", 500);
let veg_pizza = new Food("Veg Pizza", "Main Course", 400);
let coke = new Food("Coke", "Drinks", 100);
let pepsi = new Food("Pepsi", "Drinks", 100);
let ice_cream = new Food("Ice Cream", "Deserts", 150);

let menu = []
menu.push(chicken_pizza);
menu.push(veg_pizza);
menu.push(coke);
menu.push(pepsi);
menu.push(ice_cream);

function getFood(name)
{
    for (const food of menu)
    {
        if (food.name===name)
        {
            return food;
        }
    }
    return null;
}

//Table Class
class Table{
    constructor(name)
    {
        this.name = name;
        this.orders = new Map();
    }
    getOrder(){
        return this.orders;
    }
    getBill(){
        let bill = 0;
        for (const [key, value] of this.orders)
        {
            let price = key.price;
            let frequency = value;
            bill += (price*frequency);
        }
        return bill;
    }
    getItemCount(){
        let count = 0;
        for (const value of this.orders.values())
        {
            count += parseInt(value);
        }
        return count;
    }
    addFood(foodToAdd)
    {
        let food = getFood(foodToAdd.name);
        let frequency = this.orders.get(food);
        if (frequency==null)
        {
            frequency = 0;
        }
        this.orders.set(food, frequency+1);
    }
    setFrequencyForFood(foodToChange, frequency)
    {
        if (frequency<0)
        {
            frequency = 0;
        }
        let food = getFood(foodToChange);
        this.orders.set(food, frequency);
    }
    removeFood(foodToRemove)
    {
        let food = getFood(foodToRemove);
        this.orders.delete(food);
    }
    clearOrder()
    {
        this.orders.clear();
    }
}

Table.prototype.toString = function()
{
    let orders = this.getOrder();
    return orders;
}

//Table List Creation
let table_A = new Table("Table A");
let table_B = new Table("Table B");
let table_C = new Table("Table C");
let tableList = [];
tableList.push(table_A);
tableList.push(table_B);
tableList.push(table_C);


function getTable(name)
{
    for (const table of tableList)
    {
        if (table.name===name)
        {
            return table;
        }
    }
    return null;
}

function reloadTables()
{
    displayTableList(tableList);
}

//Making Table Card
function makeTableCard(table)
{
    let tables = document.getElementById("table-list");
    let tableCard = document.createElement('div');
    tableCard.className = "table-card";
    tableCard.addEventListener("click", function() { tableClicked(table); });
    tableCard.ondragover = event => {
        event.preventDefault();
    }
    tableCard.addEventListener('drop', (event) => {
        let {name, type, price} = JSON.parse(event.dataTransfer.getData("Text/plain"));
        let food = new Food(name, type, price);
        table.addFood(food);
        displayTableList(tableList);
        let tableDetails = document.getElementById("table-modal");
        if (tableDetails!=null)
        {
            openTable(table);
        }
    })
    tableCard.innerHTML = `
        <h4>${table.name}</h4>
        <p>Rs : ${table.getBill()} | Total Items : ${table.getItemCount()}</p>
    `;
    tables.appendChild(tableCard);
}

function displayTableList(tableList)
{
    clearTableList();
    let tableSide = document.getElementById("table-side");
    let tables = document.createElement('div');
    tables.id = "table-list";
    tableSide.appendChild(tables);
    for (const table of tableList)
    {
        makeTableCard(table);
    }
}

//Function to make a new table list after taking input from Search Box
function clearTableList()
{
    let tableList = document.getElementById("table-list");
    if (tableList!=null)
    {
        tableList.remove();
    }
}

//Search Tables
function searchTables(textBox)
{
    let searchedTableList = [];
    let filter = textBox.value.toLowerCase();
    for (const table of tableList)
    {
        let tableName = table.name.toLowerCase();
        if (tableName.indexOf(filter) > -1)
        {
            searchedTableList.push(table);
        }
    }
    displayTableList(searchedTableList);
}

//Making Food Card
function makeFoodCard(food)
{
    let foods = document.getElementById("food-list");
    let foodCard = document.createElement('div');
    foodCard.className = "food-card";
    foodCard.draggable = true;
    foodCard.ondragstart = event => {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("Text/plain", JSON.stringify(food));
    }
    foodCard.innerHTML = `
        <p>${food.name}, ${food.type}, Price : ${food.price}</p>
    `
    foods.appendChild(foodCard);
}

function displayFoodList(foodList)
{
    let menuSide = document.getElementById("menu-side");
    let foods = document.createElement('div');
    foods.id = "food-list";
    menuSide.appendChild(foods);
    for (const food of foodList)
    {
        makeFoodCard(food);
    }
}

//Function to make a new Food list after taking input from Search Box
function clearMenu()
{
    let foods = document.getElementById("food-list");
    if (foods!=null)
    {
        foods.remove();
    }
}

//Search Food List
function searchMenu(textBox)
{
    let searchedMenu = [];
    let filter = textBox.value.toLowerCase();
    for (const food of menu)
    {
        let foodName = food.name.toLowerCase();
        let foodType = food.type.toLowerCase();
        let foodPrice = food.price.toString().toLowerCase();
        if ((foodName.indexOf(filter) > -1) || (foodType.indexOf(filter) > -1) || (foodPrice.indexOf(filter) > -1))
        {
            searchedMenu.push(food);
        }
    }
    clearMenu();
    displayFoodList(searchedMenu);
}

//Table Modal Creation
function tableClicked(table)
{
    openTable(table);
}

function openTable(table)
{
    let alreadyModal = document.getElementById("table-modal");
    if (alreadyModal!=undefined)
    {
        alreadyModal.remove();
    }
    let modalBlock = document.createElement('div');
    modalBlock.id = "table-modal";
    modalBlock.innerHTML = `
        <img id="close-button" onclick="closeTable()" src="/home/dheerG/VScodeProjects/js projects/Assignments/assignment5/pics/close.png" alt="delete-image" width="auto" height="20px">
        <h2 id="table-opened" >${table.name}</h2>
    `;
    document.body.appendChild(modalBlock);
    let tableDetails = document.createElement('table');
    tableDetails.id = "table-details";
    tableDetails.innerHTML += `
        <thead>
            <tr>
                <th>S.No</th>
                <th>Item</th>
                <th id="modal-food-quantity">Quantity</th>
                <th>Price</th>
            </tr>
        </thead>
    `;
    let tableBody = document.createElement('tbody');
    tableDetails.appendChild(tableBody);
    let index = 1;
    for (const [key, value] of table.orders)
    {
        let foodName = key.name;
        let foodQuantity = value;
        let foodPrice = key.price * foodQuantity;
        tableBody.innerHTML += `
            <tr>
                <td>${index}</td>
                <td>${foodName}</td>
                <td id="modal-food-quantity">
                    <input id="food-quantity-changed" type="number" value="${foodQuantity}" step="1" min="0" onChange="modifyFoodQuantityFromTable('${table.name}', '${foodName}', this.value)" onfocusout="getBackFocus(this)"/>
                </td>
                <td>${foodPrice}</td>
                <td id="modal-food-delete" onclick="deleteFoodFromTable('${table.name}', '${foodName}')">
                    <img src="/home/dheerG/VScodeProjects/js projects/Assignments/assignment5/pics/delete.png" alt="delete-image" width="auto" height="20px">
                </td>
            </tr>
        `;
        index++;
    }
    modalBlock.appendChild(tableDetails);
    let footer = document.createElement('div');
    footer.innerHTML = `
        <p class="center" >The Total is <span>${table.getBill()}</span></p>
        <button id="check-out-button" onclick="makePayment('${table.name}')" >Check Out</button>
    `;
    modalBlock.appendChild(footer);
}

function getBackFocus(textBox)
{
    textBox.focus();

}

function deleteFoodFromTable(tableName, foodName)
{
    let table = getTable(tableName);
    table.removeFood(foodName);
    openTable(table);
    displayTableList(tableList);
}

function modifyFoodQuantityFromTable(tableName, foodName, foodQuantity)
{
    let table = getTable(tableName);
    table.setFrequencyForFood(foodName, foodQuantity);
    openTable(table);
    displayTableList(tableList);
}

function makePayment(tableName)
{
    let table = getTable(tableName);
    let bill = table.getBill();
    table.clearOrder();
    reloadTables();
    closeTable();
    givePaymentSuccessAlert(table, bill);
}

function givePaymentSuccessAlert(table, bill)
{
    alert(`A payment of ${bill} was received.`);
    alert(`${table.name} has successfully made the payment.`);
}

function closeTable()
{
    let tableModal = document.getElementById("table-modal");
    tableModal.remove();
}
