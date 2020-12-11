let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

//This function adds a list item to the list for each pokemon
  function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function (event){
      showDetails(pokemon)
    });
  }

// this function loads the list of pokemon after it fetches it from the api
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  // this function loads the details of the pokemon
    function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

// this fucntion shows the details in the modal
function showDetails(item){
  loadDetails(item).then(function (){
    showModal(item);
  });
}



  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();


//This is a loop that displays the contents of the array to the browser
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);


  });
});

//The functions below show the modal in the browser
function showModal(pokemon) {
  let modalContainer = document.querySelector('#modal-container');

  modalContainer.innerHTML = '';
  let modal = document.createElement('div');
  modal.classList.add('modal');

  //add the new content into the new "modal" div (Title, text content, and close button)
  //close button element
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'x';

  //Title element
  let titleElement = document.createElement('h1');
  titleElement.innerText = pokemon.name;

  //Height content
  let contentHeight = document.createElement('p');
  contentHeight.innerText = 'Height: ' + pokemon.height;

  //Image content
  let imageElement = document.createElement('img');
  imageElement.classList.add('modal-image');
  imageElement.src = pokemon.imageUrl;

  //this closes/hides the modal when the user clicks "Close", hits "Escape", or clicks outside the modal
  //Closes on click
  closeButtonElement.addEventListener('click', hideModal);
  //Closes on "Escape"
  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });
  //closes when the user clicks outside of the modal window
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer){
      hideModal();
    }
  });

  //appends the children to their parent containers
  modalContainer.appendChild(modal);
  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentHeight);
  modal.appendChild(imageElement);

  modalContainer.classList.add('is-visible');
}




let dialogPromiseReject; //This can be set later, by showDialog

//function hides the modal when certain event listeners are triggered (see inside the "showModal" function)
function hideModal(){
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');

  if(dialogPromiseReject){ //This is a fail-safe from the promise below if a user doesn't click "confirm" or "cancel"
    dialogPromiseReject();
    dialogPromiseReject = null;
  }
}

//This function will show dialog within the "Show Dialog" modal
function showDialog(title, text){
  showModal(title, text);

  //we defined the modalContainer here
  let modalContainer = document.querySelector('#modal-container');

  //here we will add a "confirm" and "cancel" button to the modal
  let modal = modalContainer.querySelector('.modal');

  //here's the confirm button
  let confirmButton = document.createElement('button');
  confirmButton.classList.add('modal-confirm');
  confirmButton.innerText = 'Confirm';

  //Here's the cancel button
  let cancelButton = document.createElement('button');
  cancelButton.classList.add('modal-cancel');
  cancelButton.innerText = 'Cancel';

  modal.appendChild(confirmButton);
  modal.appendChild(cancelButton);

  confirmButton.focus(); //this focuses on the confirm button so the user can just hit "enter"

  //the "confirm" and "cancel" buttons in the dialog won't work without this promise below
  return new Promise((resolve, reject) => {
    cancelButton.addEventListener('click', hideModal);
    confirmButton.addEventListener('click', () => {
      dialogPromiseReject = null; //reset this
      hideModal();
      resolve();
    });

    //This can be used to reject from other functions
    dialogPromiseReject = reject;
  });
}



//This listens for a click on "show modal"
document.querySelector('#show-modal').addEventListener('click', () => {
  showModal('title', 'text');
});

//This listens for a click on "show dialog" and opens an alert with a message
document.querySelector('#show-dialog').addEventListener('click', () => {
  showDialog('Confirm action', 'Are you sure want to do this?').then(function() {
    alert('Confirmed');
  }, () => {
    alert('Not Confirmed');
  });
});
