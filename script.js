let profile = document.querySelector('.profile');
let popup = document.querySelector('.popup');

let editButton = profile.querySelector('.profile__edit-button');
let closeButton = popup.querySelector('.form__close-button');

let saveButton = popup.querySelector('.form__save-button');


// Open and close 'popup':

editButton.addEventListener('click', function () {
    popup.classList.add('popup__opened');
    document.body.classList.add('body__overflow');
});


function popupClose () {
    popup.classList.remove('popup__opened');
    document.body.classList.remove('body__overflow');
}

closeButton.addEventListener('click', popupClose);

// Edit 'form': 

let formElement = popup.querySelector('form');
let nameInput = formElement.querySelector('#profile-name');
let jobInput = formElement.querySelector('#profile-description');

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    let name = nameInput.value;
    let job = jobInput.value;
    
    let profileName = profile.querySelector('.profile__name');
    let profileDescription = profile.querySelector('.profile__description');

    saveButton.addEventListener('click', popupClose);

    profileName.textContent = name;
    profileDescription.textContent = job;
}

formElement.addEventListener('submit', formSubmitHandler); 
