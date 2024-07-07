const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
const pokemonData = [];
let pokemonCount = 21;
const searchInputValue = document.getElementById('search-input').value;
const content = document.getElementById('content');
const modal = document.getElementById('modal');

function init() {
  loadDataFromAPI();
}

async function loadDataFromAPI() {
  for (let i = 1; i < pokemonCount; i++) {
    let response = await fetch(BASE_URL + i);
    let dataFromAPI = await response.json();
    pokemonData.push(dataFromAPI);
    renderCard(dataFromAPI);
  }
}

function renderCard(dataFromAPI) {
  let id = dataFromAPI.id;
  let name = dataFromAPI.name;
  let img = dataFromAPI.sprites.other.home.front_default;
  let types = dataFromAPI.types;

  // console.log(dataFromAPI);

  const capitalizedName =
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  content.innerHTML += createCardHTML(id, capitalizedName, img, types);
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

async function loadMorePokemons() {
  const currentPokemonCount = pokemonCount;
  pokemonCount += 20;

  for (let i = currentPokemonCount; i < pokemonCount; i++) {
    let response = await fetch(BASE_URL + i);
    let dataFromAPI = await response.json();
    pokemonData.push(dataFromAPI);
    renderCard(dataFromAPI);
  }
}

function openModal() {}

function renderFullscreenCard(pokemonData) {
  let id = pokemonData.id;
  let name = pokemonData.name;
  let img = pokemonData.sprites.other.home.front_default;
  let types = pokemonData.types;

  for (let i = 0; i < pokemonData.length; i++) {
    modal.innerHTML += createFullscreenCardHTML(id, name, img, types);
  }
}

init();
