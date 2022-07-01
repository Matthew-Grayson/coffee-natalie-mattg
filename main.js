"use strict"

function renderCoffee(coffee) {
    var html = '<div class="coffee">';
    html += '<div style="display: none">' + coffee.id + '</div>';
    html += '<div><h2>' + coffee.name + '</h2></div>';
    html += '<p>' + coffee.roast + '</p>';
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
        if (searchedCoffee.test(coffee.name) && coffee.roast === selectedRoast || selectedRoast === "all") {
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
    coffees.push({id: newId, name: newName, roast: newRoast});
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
coffeeSearch.addEventListener('keyup', updateCoffees);
