"use strict"

function renderCoffee(coffee) {
    var html = '<div class="col-3 coffee">';
    html += '<div class="nameText" data-bs-toggle="modal" data-bs-target="#' + coffee.name.replace(/ /g,'') + 'Modal">' + coffee.name;
    html += '<p class="roastText">' + coffee.roast + '</p></div>';
    html += '<div class="modal fade" id="' + coffee.name.replace(/ /g,'') + 'Modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">'
    html += '<div class="modal-dialog">'
    html += '<div class="modal-content">'
    html += '<div class="modal-header">'
    html += '<h5 class="modal-title" id="' + coffee.name.replace(/ /g,'') + 'ModalLabel">' + coffee.name + '</h5>'
    html += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'
    html += '</div>'
    html += '<div class="modal-body">'
    html += 'Would you like to delete this coffee?'
    html += '</div>'
    html += '<div class="modal-footer">'
    html += '<button id="' + coffee.id + '" type="button" class="btn btn-primary deleteButton">Delete</button>'
    html += '</div>'
    html += '</div>'
    html += '</div>'
    html += '</div>'
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
function updateCoffees() {
    // e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var searchedCoffee = new RegExp(coffeeSearch.value, "i");
    var filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if (searchedCoffee.test(coffee.name) && (coffee.roast === selectedRoast || selectedRoast === "all")) {
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees);
    textNames = document.querySelectorAll('.nameText');
    textNames.forEach(function(name) {
        name.addEventListener('click', removeCoffee);
    })
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
        switch(roastAdd.value) {
            case "light":
                coffees.push({id: newId, name: newName, roast: newRoast, roastId: '1'});
                localStorage.setItem(newId, `${coffeeAdd.value},${roastAdd.value},1`)
                break;
            case "medium":
                coffees.push({id: newId, name: newName, roast: newRoast, roastId: '2'});
                localStorage.setItem(newId, `${coffeeAdd.value},${roastAdd.value},2`)
                break;
            case "dark":
                coffees.push({id: newId, name: newName, roast: newRoast, roastId: '3'});
                localStorage.setItem(newId, `${coffeeAdd.value},${roastAdd.value},3`)
                break;
        }
    }
    sortByNameAndThenRoast();
    updateCoffees();
}
function removeCoffee () {
    let idArray = [];
    coffees.forEach(function(id){
        idArray.push(coffees.id)
    })
    console.log(idArray)
    let coffeeToDelete = idArray.indexOf(coffees.id);
    coffees.splice(coffeeToDelete, 1);
    updateCoffees();


}
// function identifyCoffeeToDelete () {
//     console.log(this.firstChild.textContent);;
// }
// let identifyCoffeeToDelete = function() {
//     return this.firstChild.textContent;
// }

// function removeCoffee() {
//     var thisOne = this.firstChild.textContent;
//     console.log(thisOne);
//     let coffeeArray = [];
//     coffees.forEach(function(coffee) {
//         coffeeArray.push(coffee.name);
//     })
//     let coffeeToDelete = coffeeArray.indexOf(thisOne);
//     localStorage.removeItem(coffees[coffeeToDelete].id);
//     coffees.splice(coffeeToDelete, 1);
//     updateCoffees();
// }



// function loadingAnimation(e) {
//     e.preventDefault();
//     for (let i = 1; i <= 6; i++) {
//         switch (document.getElementById(i).style.color) {
//             case "red":
//                 document.getElementById(i).style.color = "orange"
//                 break;
//             case "orange":
//                 document.getElementById(i).style.color = "yellow"
//                 break;
//             case "yellow":
//                 document.getElementById(i).style.color = "green"
//                 break;
//             case "green":
//                 document.getElementById(i).style.color = "blue"
//                 break;
//             case "blue":
//                 document.getElementById(i).style.color = "indigo"
//                 break;
//             case "indigo":
//                 document.getElementById(i).style.color = "red"
//                 break;
//         }
//     }
// }

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light', roastId: '1'},
    {id: 2, name: 'Half City', roast: 'light', roastId: '1'},
    {id: 3, name: 'Cinnamon', roast: 'light', roastId: '1'},
    {id: 4, name: 'City', roast: 'medium', roastId: '2'},
    {id: 5, name: 'American', roast: 'medium', roastId: '2'},
    {id: 6, name: 'Breakfast', roast: 'medium', roastId: '2'},
    {id: 7, name: 'High', roast: 'dark', roastId: '3'},
    {id: 8, name: 'Continental', roast: 'dark', roastId: '3'},
    {id: 9, name: 'New Orleans', roast: 'dark', roastId: '3'},
    {id: 10, name: 'European', roast: 'dark', roastId: '3'},
    {id: 11, name: 'Espresso', roast: 'dark', roastId: '3'},
    {id: 12, name: 'Viennese', roast: 'dark', roastId: '3'},
    {id: 13, name: 'Italian', roast: 'dark', roastId: '3'},
    {id: 14, name: 'French', roast: 'dark', roastId: '3'},
];

function sortByNameAndThenRoast() {
    coffees = coffees.sort((a,b) => a.name.localeCompare(b.name))
    coffees = coffees.sort((a,b) => a.roastId - b.roastId)
}

function appendFromLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        let newId = coffees.length + 1;
        coffees.push({id: newId, name: localStorage[newId].split(",")[0], roast: localStorage[newId].split(",")[1], roastId: localStorage[newId].split(",")[2]})
    }
}
appendFromLocalStorage();
sortByNameAndThenRoast();

var tbody = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');
var coffeeSearch = document.querySelector('#coffee-search');
var coffeeAdd = document.querySelector('#coffee-add');
var roastAdd = document.querySelector('#roast-add');

tbody.innerHTML = renderCoffees(coffees);

var textNames = document.querySelectorAll('.deleteButton');
textNames.forEach(function(name) {
    name.addEventListener('click', removeCoffee);
})

submitButton.addEventListener('click', addCoffee);
submitButton.addEventListener('click', updateCoffees);
roastSelection.addEventListener('change', updateCoffees);
// roastSelection.addEventListener('change', loadingAnimation);
coffeeSearch.addEventListener('keyup', updateCoffees);
// coffeeSearch.addEventListener('keyup', loadingAnimation);
