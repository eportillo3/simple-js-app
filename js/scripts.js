let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let $pokemonList = $('ul');

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  //This function adds a list item to the list for each pokemon
  function addListItem(pokemon) {
    let list = $('.pokemon-list');
    let listItem = $('<li></li>');
    let button = $('<button type="button" id="pokemon-name" class="list-group-item list-group-item-action col-md-4 col-lg-2 pokemon-button" data-toggle="modal" data-target="#exampleModal">' + pokemon.name + '</button>');
    button.addClass('btn-primary');
    button.attr('data-toggle', 'modal'); //this works with bootstrap to open the modal when the pokemon name button is clicked
    button.attr('data-target', '#pokemonModal');
    listItem.append(button);
    list.append(listItem);

    button.on('click', function(event) {
      showDetails(pokemon);
    });
  }

  // this function shows the details in the modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  // this function loads the list of pokemon after it fetches it from the api
  function loadList() {
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    })
  }

  // this function loads the details of the pokemon
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function(e) {
      console.error(e);
    });
  }



  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

// Search form for specific pokemon
$(document).ready(function(){
  $('#pokemon-search').on('keyup', function() {
    let value = $(this).val().toLowerCase();
    $('.list-group-item').filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});


//This is a loop that displays the contents of the array to the browser
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);


  });
});

//The functions below show the modal in the browser
function showModal(pokemon) {
  let modalBody = $('.modal-body');
  let modalTitle = $('.modal-title');

  modalTitle.empty();
  modalBody.empty();

  //Pokemon name element
  let nameElement = $('<h1>' + pokemon.name + '</h1>');

  //Height content
  let heightElement = $('<p>' + 'height: ' + pokemon.height + '</p>');

  //Image content
  let imageElement = $('<img class="modal-img" style="width:50%">');
  imageElement.attr('src', pokemon.imageUrl);

  //appends the children to their parent containers

  modalTitle.append(nameElement);
  modalBody.append(imageElement);
  modalBody.append(heightElement);
}
