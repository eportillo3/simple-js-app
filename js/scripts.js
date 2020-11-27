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
  },
]


// displays height and size of pokemon

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height < 0.9) {
    document.write(pokemonList[i].name + " height: " + (pokemonList[i].height) + " small pokemon" + "<br>");
  } else if (pokemonList[i].height > 0.9 && pokemonList[i].height < 1.4) {
    document.write(pokemonList[i].name + " medium pokemon" + "<br>");
  } else {
    document.write(pokemonList[i].name + " large pokemon" + "<br>");
  }
}
