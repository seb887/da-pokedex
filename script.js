//letIABLES
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
const pokemonData = [];
let pokemonCount = 21;
const searchInput = document.getElementById('search-input');
const clearInputBtn = document.getElementById('search-clear-btn');
const loadMoreBtn = document.getElementById('load-more-btn');
const body = document.querySelector('body');
const content = document.getElementById('content');
const modal = document.getElementById('modal');

// FUNCTIONS
function init() {
  searchInput.value = '';
  content.innerHTML = '';
  loadDataFromAPI();
  controlInputClearBtn();
}

async function loadDataFromAPI() {
  for (let i = 1; i < pokemonCount; i++) {
    let response = await fetch(BASE_URL + i);
    let dataFromAPI = await response.json();
    pokemonData.push(dataFromAPI);
    renderCard(dataFromAPI);
  }
  console.log('pokemonCount: ', pokemonCount);
}

function renderCard(dataFromAPI) {
  let id = dataFromAPI.id;
  let name = dataFromAPI.name;
  let img = dataFromAPI.sprites.other['official-artwork'].front_default;
  let types = dataFromAPI.types;

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
  console.log('pokemonCount: ', pokemonCount);
}

function openModal(id) {
  const pokemon = pokemonData.find((pokemon) => pokemon.id === id);
  const body = document.querySelector('body');

  body.style.overflow = 'hidden';

  if (pokemon) {
    const name = pokemon.name;
    const img = pokemon.sprites.other['official-artwork'].front_default;
    const types = pokemon.types;
    const height = pokemon.height;
    const weight = pokemon.weight;
    const stats = pokemon.stats;

    modal.innerHTML = createFullscreenCard(
      id,
      name,
      img,
      types,
      height,
      weight,
      stats
    );
    modal.style.display = 'flex';
    checkModalBtns(id);
    createChart(stats);
  }
}

function closeModal() {
  const body = document.querySelector('body');

  body.style.overflow = 'visible';
  modal.style.display = 'none';
}

function closeModalESC(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

function createFullscreenCard(id, name, img, types, height, weight, stats) {
  const capitalizedName =
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  return `

      <div class="modal-card" onclick="event.stopPropagation()">
        <button>
          <img src="./assets/icons/x-icon.png" alt="x-icon" class="close-modal-btn" id="close-modal-btn" onclick="closeModal()"/>
        </button>
        <h2>${capitalizedName}</h2>
        <div class="modal-card-buttons">
          <div class="modal-btn-container" onclick="event.stopPropagation()">
              <img src="./assets/icons/back.png" alt="chevron-left icon" class="arrow-icons" id="previous-pokemon-btn" onclick="previousPokemon(${id})" />
          </div>
          <img src="${img}" alt="${capitalizedName} img" class="modal-card-img"/>
          <div class="modal-btn-container" onclick="event.stopPropagation()">
              <img src="./assets/icons/forward.png" alt="chevron-right icon" class="arrow-icons" id="next-pokemon-btn" onclick="nextPokemon(${id})" />
          </div>
        </div>
        <div class="modal-card-type-container" id="type">${renderTypes(
          types
        )}</div>
        <div class="body-stats-container">
          <div class="body-stats" id="height"><b>Height: </b>${
            height / 10
          } m</div>
          <div class="body-stats" id="weight"><b>Weight: </b>${
            weight / 10
          } kg</div>
        </div>
        <canvas id="myChart" width="450" height="260"></canvas>
      </div>
      `;
  //
}

function nextPokemon(id) {
  openModal(id + 1);
}

function previousPokemon(id) {
  openModal(id - 1);
}

function checkModalBtns(id) {
  const previousBtn = document.getElementById('previous-pokemon-btn');
  const nextBtn = document.getElementById('next-pokemon-btn');

  if (id == 1) {
    previousBtn.style.display = 'none';
  }

  if (id === pokemonData.length) {
    nextBtn.style.display = 'none';
  }
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

function searchPokemon() {
  content.innerHTML = '';

  controlInputClearBtn();

  const filteredPokemonData = pokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(checkInputText())
  );

  if (filteredPokemonData.length > 0) {
    filteredPokemonData.forEach((pokemon) => renderCard(pokemon));
  } else {
    content.innerHTML = '<p>No Pokémon found</p>';
  }
}

function checkInputText() {
  let inputText = '';

  if (searchInput.value.toLowerCase().length >= 3) {
    loadMoreBtn.style.display = 'none';
    inputText = searchInput.value.toLowerCase();
  } else {
    loadMoreBtn.style.display = 'flex';
  }

  return inputText;
}

function controlInputClearBtn() {
  if (searchInput.value.length > 0) {
    clearInputBtn.style.display = 'flex';
  } else {
    clearInputBtn.style.display = 'none';
  }
}

// CANVAS chart
function createChart(stats) {
  const canvas = document.getElementById('myChart');
  const ctx = canvas.getContext('2d');

  const data = [
    {
      label: 'HP',
      value: stats[0].base_stat,
      color: 'rgba(255, 0, 0, 0.3)',
      borderColor: 'red',
    },
    {
      label: 'ATK',
      value: stats[1].base_stat,
      color: 'rgba(255, 165, 0, 0.3)',
      borderColor: 'orange',
    },
    {
      label: 'DEF',
      value: stats[2].base_stat,
      color: 'rgba(0, 128, 0, 0.3)',
      borderColor: 'green',
    },
    {
      label: 'SpA',
      value: stats[3].base_stat,
      color: 'rgba(128, 0, 128, 0.3)',
      borderColor: 'purple ',
    },
    {
      label: 'SpD',
      value: stats[4].base_stat,
      color: 'rgba(0, 0, 255, 0.3)',
      borderColor: 'blue',
    },
    {
      label: 'SPD',
      value: stats[5].base_stat,
      color: 'rgba(0, 0, 0, 0.3)',
      borderColor: 'black',
    },
  ];

  const chartWidth = canvas.width;
  const chartHeight = canvas.height;
  const barHeight = 24;
  const margin = 16;
  const labelWidth = 50;
  const maxValue = 120;
  // const maxValue = Math.max(...data.map((d) => d.value));
  const borderRadius = 4;

  ctx.font = '14px Roboto-Regular';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';

  function drawRoundedRectRight(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x, y);
    ctx.closePath();
  }

  ctx.strokeStyle = 'black';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(labelWidth + margin, margin / 2);
  ctx.lineTo(labelWidth + margin, chartHeight - margin / 2);
  ctx.stroke();

  data.forEach((item, index) => {
    const y = index * (barHeight + margin) + margin * 2;
    const barWidth =
      (item.value / maxValue) * (chartWidth - labelWidth - margin * 4);

    // Draw the bar
    ctx.fillStyle = data[index].color;
    drawRoundedRectRight(
      ctx,
      labelWidth + margin,
      y - barHeight / 2,
      barWidth,
      barHeight,
      borderRadius
    );
    ctx.fill();

    ctx.strokeStyle = data[index].borderColor; // Color of the border
    ctx.lineWidth = 1; // Width of the border
    ctx.beginPath();
    ctx.moveTo(labelWidth + margin, y - barHeight / 2);
    ctx.lineTo(
      labelWidth + margin + barWidth - borderRadius,
      y - barHeight / 2
    );
    ctx.quadraticCurveTo(
      labelWidth + margin + barWidth,
      y - barHeight / 2,
      labelWidth + margin + barWidth,
      y - barHeight / 2 + borderRadius
    );
    ctx.lineTo(
      labelWidth + margin + barWidth,
      y + barHeight / 2 - borderRadius
    );
    ctx.quadraticCurveTo(
      labelWidth + margin + barWidth,
      y + barHeight / 2,
      labelWidth + margin + barWidth - borderRadius,
      y + barHeight / 2
    );
    ctx.lineTo(labelWidth + margin, y + barHeight / 2);
    ctx.stroke();

    // Draw the label
    ctx.fillStyle = '#000';
    ctx.fillText(item.label, margin, y);

    // Draw the value
    ctx.fillText(item.value, labelWidth + margin + barWidth + 10, y);
  });
}

// EVENTS
searchInput.addEventListener('input', searchPokemon);
clearInputBtn.addEventListener('click', init);
body.onkeydown = (event) => closeModalESC(event);

init();
