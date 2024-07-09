const userInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const boltIcon = document.getElementById("bolt");
const loadIcon = document.getElementById("loading");
const imgDiv = document.getElementById("img-container");

const types = document.getElementById("types");
const attributes = {
  name: document.getElementById("pokemon-name"),
  id: document.getElementById("pokemon-id"),
  weight: document.getElementById("weight"),
  height: document.getElementById("height"),
  hp: document.getElementById("hp"),
  attack: document.getElementById("attack"),
  defense: document.getElementById("defense"),
  "special-attack": document.getElementById("special-attack"),
  "special-defense": document.getElementById("special-defense"),
  speed: document.getElementById("speed"),
};

const base = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

function unpackStats(pokemon) {
  let pokeAttributes = { ...pokemon, stats: undefined };
  pokemon.stats.forEach((stat) => {
    pokeAttributes[stat.stat.name] = stat.base_stat;
  });
  return pokeAttributes;
}

function setValues(pokemon) {
  console.log(pokemon);
  Object.values(attributes).forEach((v) => (v.innerText = ""));
  imgDiv.innerHTML = `<img src="${pokemon.sprites.front_default}" class="pokeimage" id="sprite" />`;
  Object.keys(attributes).forEach(
    (k) => (attributes[k].innerText = pokemon[k])
  );

  types.innerHTML = "";
  pokemon.types.forEach(({ type }) => {
    types.innerHTML += `<li>${type.name.toUpperCase()}</li>`;
  });
}

async function fetchPokemon() {
  const pokemon = userInput.value.toLowerCase();
  try {
    boltIcon.style.display = "none";
    loadIcon.style.display = "block";
    const url = `${base}${pokemon}`;
    let res = await fetch(url);
    res = await res.json();
    const pokeAttributes = unpackStats(res);
    setValues(pokeAttributes);
  } catch (err) {
    console.log({ err });
    alert("Pokémon not found");
  } finally {
    boltIcon.style.display = "block";
    loadIcon.style.display = "none";
  }
}

searchButton.addEventListener("click", fetchPokemon);
