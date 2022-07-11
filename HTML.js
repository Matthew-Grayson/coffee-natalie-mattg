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

var tbody = document.querySelector('#coffees');
tbody.innerHTML = renderCoffees(coffees);
