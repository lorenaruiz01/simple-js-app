// wrap pokemonList array inside of an IIFE (Immediately Invoked Function Expression)
let pokemonRepository = (function () {

  let pokemonList = []; 

  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151";

  // adds the selected pokemon to the array
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  // returns all items in the pokemonList array
  function getAll() {
    return pokemonList;
  }

  //adds a pokemon as a list item and button (via a click event)
  function addListItem(pokemon) {

    let pokemonList = document.querySelector(".pokemon-list"); 

    let listItem = document.createElement("li"); 
    listItem.classList.add("pokemon-list-item"); 
    listItem.innerHTML = ` 
                              <img src=${pokemon.image}>                                  
                              <h2>#${pokemon.id} ${pokemon.name}</h2>
                          `;
    pokemonList.appendChild(listItem);
    listItem.addEventListener("click", () => {
      loadDetails(pokemon);
    });
  }

  // fetches data and creates pokemon object with specific details, activates add() function
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item, index) {
          let pokemon = {
            name: item.name,
            id: index + 1,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // use this to store chached pokemon information
  const pokeCache = {}; 

  // fetches and stores details into pokeCahce 
  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    if (pokeCache[url]) {
      console.log("cache item found", pokeCache[url]);
      dataForModal(pokeCache[url]);
      return;
    }
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        pokeCache[url] = details;
        console.log(details);
        dataForModal(details);
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // creates a pokemon object with specified details 
  function dataForModal(details) {
    let pokemon = {
      name: details.name,
      id: details.id,
      imageUrl: details.sprites.front_default,
      imageUrlBack: details.sprites.back_default,
      height: details.height,
      types: details.types.map((type) => type.type.name).join(", "),
    };
    // activates showModal function and passes in pokemon object
    showModal(pokemon);
    // hides back to top button when showModal function runs
    let back2TopBtn = document.getElementById("back2TopBtn");
    back2TopBtn.style.display = "none";
  }

  // Displays the modal with pokemon details
  function showModal(pokemon) {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.innerHTML = "";

    let modal = document.createElement("div"); 
    modal.classList.add("modal");

    let pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokemon-card");

    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "X";
    closeButtonElement.addEventListener("click", hideModal);

    let titleElement = document.createElement("h2");
    titleElement.innerText = `#${pokemon.id} ${pokemon.name}`;

    let imageElement = document.createElement("img");
    imageElement.classList.add("modal-img");
    imageElement.src = pokemon.imageUrl;

    let imageElementBack = document.createElement("img");
    imageElementBack.classList.add("modal-img");
    imageElementBack.src = pokemon.imageUrlBack;

    let contentElement = document.createElement("p");
    contentElement.innerText = "Height: " + pokemon.height + "m";

    let typesElement = document.createElement("p");
    typesElement.innerText = "Types: " + pokemon.types;

    pokemonCard.appendChild(closeButtonElement);
    pokemonCard.appendChild(titleElement);
    pokemonCard.appendChild(imageElement);
    pokemonCard.appendChild(imageElementBack);
    pokemonCard.appendChild(contentElement);
    pokemonCard.appendChild(typesElement);

    modal.appendChild(pokemonCard);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");
    
    // adds a click event on modal container to hide modal
    modalContainer.addEventListener("click", (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
    // adds an esc keydown event on modal container to hide modal
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        hideModal();
      }
    });
  }

  // hides modal and its content from view
  function hideModal() {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
    let modalCard = document.querySelector(".modal > *");
    modalCard.remove(".modal > *");
    
    // displays back to top button when modal is hidden
    let back2TopBtn = document.getElementById("back2TopBtn");
    back2TopBtn.style.display = "block";
  }

  // A key calls a function and returns the value of the same name (key : value)
  return {
    getAll: getAll, 
    add: add, 
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    dataForModal: dataForModal,
    showModal: showModal,
    hideModal: hideModal,
  };
})(); // the (); makes the IFFE a self-executing function

pokemonRepository.loadList().then(function () {
  // runs the loadList function for each pokemon and adds a list item to the page
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

let back2TopBtn = document.getElementById("back2TopBtn"); // Get the back to top button

window.onscroll = function () {
  // When the user scrolls, run scrollFunction
  scrollFunction();
};

function scrollFunction() {
  // When the user scrolls down 20px from the top of the document, show the button
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    back2TopBtn.style.display = "block";
  } else {
    back2TopBtn.style.display = "none";
  }
}

// pseudocode: 
// if modal-container is showing
// hide back to top button

function backToTopFunction() {
  // When the user clicks on the button, scroll to the top of the document
  window.scrollTo({ top: 0, behavior: "smooth" });

  //document.body.scrollTop = 0;                                          // For Safari
  //document.documentElement.scrollTop = 0;                               // For Chrome, Firefox, IE and Opera
}
