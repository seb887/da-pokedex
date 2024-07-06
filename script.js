const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
const pokemonData = [];
let pokemonCount = 32;

function init() {
  loadDataFromAPI();
}

async function loadDataFromAPI() {
  for (let i = 1; i < pokemonCount; i++) {
    let response = await fetch(BASE_URL + i);
    let responseToJson = await response.json();
    pokemonData.push(responseToJson);
  }
  render();
}

function render() {
  let content = document.getElementById('content');

  for (let i = 0; i < pokemonData.length; i++) {
    let id = pokemonData[i].id;
    let name = pokemonData[i].name;
    let img = pokemonData[i].sprites.other.home.front_default;
    let types = pokemonData[i].types;

    console.log(pokemonData[i]);

    const capitalizedName =
      name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    content.innerHTML += createCardHTML(id, capitalizedName, img, types);
  }
}

function renderTypes(types) {
  let labels = '';

  for (let i = 0; i < types.length; i++) {
    labels += `<div class="card-types bg-${types[i].type.name}" id="type-${
      i + 1
    }">${types[i].type.name}</div>`;
  }
  return labels;
}

// function getType(type) {
//   for (let i = 0; i < type.length; i++) {
//     return type[i];
//   }
// }

init();
