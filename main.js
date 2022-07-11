"use strict"
function renderCoffee(coffee) {
    var html = `
<div class="col-3 coffee">
    <div class="nameText" data-bs-toggle="modal" data-bs-target="#${coffee.name.toLowerCase().replace(/\W/g,"-")}-modal">
        <span>${coffee.name}</span>
        <p class="roastText">${coffee.roast}</p>
    </div>
    <div class="modal fade opacity-75" id="${coffee.name.toLowerCase().replace(/\W/g,"-")}-modal" tabIndex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="${coffee.name.toLowerCase().replace(/\W/g,"-")}-modal-label">${coffee.name}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Would you like to delete this coffee?</p>
                </div>
                <div class="modal-footer">
                    <button id="${coffee.id}" type="button" class="btn btn-secondary deleteButton">Delete</button>
                </div>
            </div>
        </div>
    </div>
</div>
    `
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
    // let textNames = document.querySelectorAll('.nameText');
    // textNames.forEach(function(name) {
    //     name.addEventListener('click', removeCoffee);
    // })
    var deleteButton = document.querySelectorAll('.deleteButton');
    deleteButton.forEach(function(name) {
        name.addEventListener('click', removeCoffee);
    })
}
function addCoffee(e) {
    e.preventDefault();
    var newName = coffeeAdd.value;
    var newRoast = roastAdd.value;
    var existingNames = [];
    var newId = coffees.length - localStorage.length + 1;
    for(let i = 0; i < coffees.length; i++) {
        existingNames.push(coffees[i].name)
    }
    if(existingNames.includes(newName)) {
        alert("That coffee already exists.")
    }
    else {
        while(JSON.stringify(localStorage).includes(newId)) { //iterates overwriting of existing ids
            newId++;
        }
        switch(roastAdd.value) {
            case "light":
                coffees.push({id: newId, name: newName, roast: newRoast, roastId: 1});
                localStorage.setItem(newId, `${coffeeAdd.value},${roastAdd.value},1`)
                break;
            case "medium":
                coffees.push({id: newId, name: newName, roast: newRoast, roastId: 2});
                localStorage.setItem(newId, `${coffeeAdd.value},${roastAdd.value},2`)
                break;
            case "dark":
                coffees.push({id: newId, name: newName, roast: newRoast, roastId: 3});
                localStorage.setItem(newId, `${coffeeAdd.value},${roastAdd.value},3`)
                break;
        }
    }
    sortByNameAndThenRoast();
    updateCoffees();
}
function removeCoffee () {
    if(JSON.stringify(localStorage).includes(this.id)) {
        localStorage.removeItem(this.id)
        for(let i = 0; i < coffees.length; i++) {
            if(coffees[i].id === Number(this.id)) {
                coffees.splice(i, 1)
            }
        }
        let backdrop = document.querySelector(".modal-backdrop");
        backdrop.remove();
        updateCoffees();
    }
    else {
        alert("You can only delete coffees you added.");
        let backdrop = document.querySelector(".modal-backdrop");
        backdrop.remove();
    }
    // let idArray = [];
    // let idToDelete = Number(this.id); //convert to number (typeof this.id = "string")
    //
    // if(JSON.stringify(localStorage).includes(this.id)) { //remove coffee from local storage
    //     localStorage.removeItem(this.id);
    // }
    //
    // for(let i = 0; i < coffees.length; i++) {
    //     idArray.push(coffees[i].id)
    // }
    // let coffeeToDelete = idArray.indexOf(idToDelete); //indexOf only works numbers of type "number"
    // coffees.splice(coffeeToDelete, 1);
    //
    // let backdrop = document.querySelector(".modal-backdrop");
    // backdrop.remove();
    // updateCoffees();


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
    {id: 1, name: 'Light City', roast: 'light', roastId: 1},
    {id: 2, name: 'Half City', roast: 'light', roastId: 1},
    {id: 3, name: 'Cinnamon', roast: 'light', roastId: 1},
    {id: 4, name: 'City', roast: 'medium', roastId: 2},
    {id: 5, name: 'American', roast: 'medium', roastId: 2},
    {id: 6, name: 'Breakfast', roast: 'medium', roastId: 2},
    {id: 7, name: 'High', roast: 'dark', roastId: 3},
    {id: 8, name: 'Continental', roast: 'dark', roastId: 3},
    {id: 9, name: 'New Orleans', roast: 'dark', roastId: 3},
    {id: 10, name: 'European', roast: 'dark', roastId: 3},
    {id: 11, name: 'Espresso', roast: 'dark', roastId: 3},
    {id: 12, name: 'Viennese', roast: 'dark', roastId: 3},
    {id: 13, name: 'Italian', roast: 'dark', roastId: 3},
    {id: 14, name: 'French', roast: 'dark', roastId: 3},
];

function sortByNameAndThenRoast() {
    coffees = coffees.sort((a,b) => a.name.localeCompare(b.name))
    coffees = coffees.sort((a,b) => a.roastId - b.roastId)
}

function appendFromLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        let storeId = Number(localStorage.key(i));
        coffees.push({id: storeId, name: localStorage[storeId].split(",")[0], roast: localStorage[storeId].split(",")[1], roastId: localStorage[storeId].split(",")[2]})
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

var deleteButton = document.querySelectorAll('.deleteButton');
deleteButton.forEach(function(name) {
    name.addEventListener('click', removeCoffee);
})

submitButton.addEventListener('click', addCoffee);
submitButton.addEventListener('click', updateCoffees);
roastSelection.addEventListener('change', updateCoffees);
// roastSelection.addEventListener('change', loadingAnimation);
coffeeSearch.addEventListener('keyup', updateCoffees);
// coffeeSearch.addEventListener('keyup', loadingAnimation);
