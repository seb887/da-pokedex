const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
const pokemonData = [];
let pokemonCount = 21;

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
    let title = pokemonData[i].name;
    let img = pokemonData[i].sprites.front_default;
    let type = pokemonData[i].types;
    content.innerHTML += renderCardHTML(title, img);
    // console.log(pokemonData[i]);
  }
}

function renderCardHTML(name, img, type) {
  return `
    <div class="card">
        <h2 class="pokemon-title">${name}</h2>
        <img
            src="${img}"
            alt="pokemon img"
            class="pokemon-img"
        />
        <div class="type">Type</div>
    </div>
  `;
}

// function getType(type) {
//   for (let i = 0; i < type.length; i++) {
//     return type[i];
//   }
// }

init();
