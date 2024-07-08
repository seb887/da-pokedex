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
  let img = dataFromAPI.sprites.other['official-artwork'].front_default;
  let types = dataFromAPI.types;

  // console.log(dataFromAPI);

  const capitalizedName =
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  content.innerHTML += createCardHTML(id, capitalizedName, img, types);
}

function createCardHTML(id, name, img, type) {
  return `
      <div class="card" id="pokemon-${id}" onclick="openModal(${id})">
        <img
            src="${img}"
            alt="pokemon img"
            class="card-img"
        />
        <h2 class="pokemon-title">${name}</h2>
        <div class="card-type-container" id="type">${renderTypes(type)}</div>
      </div>
    `;
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

function openModal(id) {
  const pokemon = pokemonData.find((pokemon) => pokemon.id === id);

  if (pokemon) {
    const name = pokemon.name;
    const img = pokemon.sprites.other['official-artwork'].front_default;
    const types = pokemon.types;
    const height = pokemon.height;
    const weight = pokemon.weight;
    const stats = pokemon.stats;

    modal.innerHTML = createFullscreenCardHTML(
      name,
      img,
      types,
      height,
      weight,
      stats
    );
    modal.style.display = 'flex';
  }
}

function createFullscreenCardHTML(name, img, types, height, weight, stats) {
  const capitalizedName =
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  return `
    <div class="modal-card">
      <button class="card-close-btn" onclick="closeModal()">x</button>
      <h2>${capitalizedName}</h2>
      <img src="${img}" alt="${capitalizedName} img" />
      <div class="card-type-container" id="type">${renderTypes(types)}</div>
      <div class="body-stats-container">
        <div class="body-stats" id="height"><b>Height: </b>${
          height / 10
        } m</div>
        <div class="body-stats" id="weight"><b>Weight: </b>${
          weight / 10
        } kg</div>
      </div>
      <div class="stats-container">
        <h3>Stats</h3>
        <div class="stats" id="stats-container">${renderStats(stats)}</div>
      </div>
    </div>
  `;
}

function closeModal() {
  modal.style.display = 'none';
}

function renderStats(stats) {
  let statValues = '';

  for (let i = 0; i < stats.length; i++) {
    statValues += `
      <div class="stat-container" id="stat-${i + 1}">
        <div class="stat-name" id="stat-name-${stats[i].stat.name}">
          <b>${setShortStatName(stats[i].stat.name)}</b></div>
        <div class="stat-value" id="stat-value-${stats[i].stat.name}">${
      stats[i].base_stat
    }</div>
      </div>
    `;
  }
  return statValues;
}

function setShortStatName(name) {
  switch (name) {
    case 'hp':
      return 'HP';
    case 'attack':
      return 'ATK';
    case 'defense':
      return 'DEF';
    case 'special-attack':
      return 'SpA';
    case 'special-defense':
      return 'SpD';
    case 'speed':
      return 'SPD';
  }
}

init();
