const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
const pokemonData = [];
let pokemonCount = 22;

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
    content.innerHTML += renderCardHTML(title, img, type);
  }
}

function renderCardHTML(name, img, type) {
  const capitalizedName =
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  return `
    <div class="card">
        <h2 class="pokemon-title">${capitalizedName}</h2>
        <img
            src="${img}"
            alt="pokemon img"
            class="pokemon-img"
        />
        <div class="type-container" id="type">${renderType(type)}</div>
    </div>
  `;
}

function renderType(type) {
  let labels = '';
  for (let i = 0; i < type.length; i++) {
    labels += `<div class="types" id="type-${i + 1}">${
      type[i].type.name
    }</div>`;
  }
  return labels;
}

// function getType(type) {
//   for (let i = 0; i < type.length; i++) {
//     return type[i];
//   }
// }

init();
