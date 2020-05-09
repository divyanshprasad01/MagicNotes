console.log(`starting my javascript journey today`)
showCard(); //shows previosly saved notes...
//function to add a note on click of save note button ...
let addbtn = document.getElementById(`saveButton`);
addbtn.addEventListener('click', function() {
    let mTitle = document.getElementById('title');
    let mNotes = document.getElementById('notes');

    //an object to store title and note 
    let myObj = {
        Title: mTitle.value,
        Notes: mNotes.value
    }

    let storage = localStorage.getItem('cards');

    if (storage == null) {
        cardsObj = [];
    } else {
        cardsObj = JSON.parse(storage);
    }

    cardsObj.push(myObj);
    localStorage.setItem('cards', JSON.stringify(cardsObj));

    mTitle.value = '';
    mNotes.value = '';
    // console.log('new card is ', cardsObj);
    showCard(); //updating notes palatte....

});

//function to show previously saved notes.....
function showCard() {
    let storage = localStorage.getItem('cards');

    if (storage == null) {
        cardsObj = [];
    } else {
        cardsObj = JSON.parse(storage);
    }
    let inner_html = '';
    cardsObj.forEach(function(element, index) {
        inner_html += `<div class="card cardss" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${element.Title}</h5>
            <p class="card-text">${element.Notes}</p>
            <button onclick = 'delete_card(this.id)' id = '${index}' class="btn btn-primary">Delete Note</button>
        </div>
    </div> `

    });

    let saved_notes = document.getElementById('savedNotes')
    if (saved_notes == null) {

        saved_notes.innerHTML = 'There is Nothing To show !! Please add Notes from above given Palatte ...'

    } else {
        saved_notes.innerHTML = inner_html;
        // console.log('element added');
    }

}

//function to delete notes on click of delete button.....
function delete_card(index) {
    console.log("deleting this element", index)
    let storage = localStorage.getItem('cards');

    if (storage == null) {
        cardsObj = [];
    } else {
        cardsObj = JSON.parse(storage);
    }
    cardsObj.splice(index, 1);
    localStorage.setItem('cards', JSON.stringify(cardsObj));
    showCard();

}

//search box.....
let search = document.getElementById('searchBox')
search.addEventListener('input', function() {
    let inputval = search.value;
    // console.log('search box triggerd');
    let cards = document.getElementsByClassName('cardss');
    // console.log(cards);
    Array.from(cards).forEach(function(element) {
        // console.log(cards);
        let card_title = element.getElementsByTagName("h5")[0].innerText;
        // console.log(card_title);
        if (card_title.includes(inputval)) {
            element.style.display = 'block'
        } else {
            element.style.display = 'none';

        }

    });
})