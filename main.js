"use strict"

function renderCoffee(coffee) {
    var html = '<div class="col-3 coffee">';
    html += '<div class="nameText">' + coffee.name;
    html += '<p class="roastText">' + coffee.roast + '</p></div>';
    html += '</div>';
    return html;
}
function renderCoffees(coffees) {
    var html = '';
    for(var i = 0; i <= coffees.length - 1; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}
function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var searchedCoffee = new RegExp(coffeeSearch.value, "i");
    var filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if (searchedCoffee.test(coffee.name) && (coffee.roast === selectedRoast || selectedRoast === "all")) {
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
}
function addCoffee(e) {
    e.preventDefault();
    var newId = coffees.length+1;
    var newName = coffeeAdd.value;
    var newRoast = roastAdd.value;
    var existingNames = [];
    for(let i = 0; i < coffees.length; i++) {
        existingNames.push(coffees[i].name)
    }
    if(existingNames.includes(newName)) {
        alert("That coffee already exists.")
    }
    else {
        coffees.push({id: newId, name: newName, roast: newRoast});
        localStorage.setItem(newId, `${coffeeAdd.value},${roastAdd.value}`)
    }
}
function loadingAnimation(e) {
    e.preventDefault();
    for (let i = 1; i <= 6; i++) {
        switch (document.getElementById(i).style.color) {
            case "red":
                document.getElementById(i).style.color = "orange"
                break;
            case "orange":
                document.getElementById(i).style.color = "yellow"
                break;
            case "yellow":
                document.getElementById(i).style.color = "green"
                break;
            case "green":
                document.getElementById(i).style.color = "blue"
                break;
            case "blue":
                document.getElementById(i).style.color = "indigo"
                break;
            case "indigo":
                document.getElementById(i).style.color = "red"
                break;
        }
    }
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];
function appendFromLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        let newId = coffees.length + 1;
        coffees.push({id: newId, name: localStorage[newId].split(",")[0], roast: localStorage[newId].split(",")[1]})
    }
}
appendFromLocalStorage()

var tbody = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');
var coffeeSearch = document.querySelector('#coffee-search');
var coffeeAdd = document.querySelector('#coffee-add');
var roastAdd = document.querySelector('#roast-add');

tbody.innerHTML = renderCoffees(coffees);

submitButton.addEventListener('click', addCoffee);
submitButton.addEventListener('click', updateCoffees);
roastSelection.addEventListener('change', updateCoffees);
roastSelection.addEventListener('change', loadingAnimation);
coffeeSearch.addEventListener('keyup', updateCoffees);
coffeeSearch.addEventListener('keyup', loadingAnimation);