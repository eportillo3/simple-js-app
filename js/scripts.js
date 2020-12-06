let pokemonRepository = (function () {
  let pokemonList = [{
    name: 'Bulbasaur',
    height: '0.7',
    type: ['grass', 'poison'],
  },
  {
    name: 'Ivysaur',
    height: '1.0',
    type: ['grass', 'poison'],
  },
  {
    name: 'Venusaur',
    height: '2.0',
    type: ['grass', 'poison'],
  },
  {
    name: 'Charmander',
    height: '0.6',
    type: ['fire'],
  },
  {
    name: 'Charmeleon',
    height: '1.1',
    type: ['fire'],
  },
  {
    name: 'Charizard',
    height: '1.7',
    type: ['fire'],
  },
  {
    name: 'Squirtle',
    height: '0.5',
    type: ['water'],
  },
  {
    name: 'Wartortle',
    height: '1.0',
    type: ['water'],
  },
  {
    name: 'Blastoise',
    height: '1.6',
    type: ['water'],
  }
];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

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

  function showDetails(pokemon){
    console.log(pokemon)
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
  };
})();

pokemonRepository.add({ name: 'Pikachu', height: 0.3, type: ['Electric'] })

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  })



// displays height and size of pokemon

// for (let i = 0; i < pokemonList.length; i++) {
//   if (pokemonList[i].height < 0.9) {
//     document.write(pokemonList[i].name + " height: " + (pokemonList[i].height) + " small pokemon" + "<br>");
//   } else if (pokemonList[i].height > 0.9 && pokemonList[i].height < 1.4) {
//     document.write(pokemonList[i].name + " medium pokemon" + "<br>");
//   } else {
//     document.write(pokemonList[i].name + " large pokemon" + "<br>");
//   }
// }
