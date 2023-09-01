let pokemonRepository = (function () {                                    // wrapping pokemonList array inside of an IIFE (Immediately Invoked Function Expression)
  let pokemonList = [];                                                   // an empty array of pokemon objects

  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

  function add (pokemon) {                                                // the add function adds the selected pokemon to the array
      pokemonList.push(pokemon)
  }

  function getAll () {                                                    // the getAll function returns all items in the pokemonList array
    return pokemonList;
  }


  function addListItem(pokemon) {                                         // the addListItem function adds a pokemon as a list item and button (via a click event)
    let pokemonList = document.querySelector('.pokemon-list');            // assign ul element to pokemonList array,
    
    let listItem = document.createElement('li');                          // create an li element
    listItem.classList.add('pokemon-list-item');                          // add 'pokemon-list-item' class to list item (pokemon card button)
    listItem.innerHTML =  ` 
                              <img src=${pokemon.image}>                                  
                              <h2>#${pokemon.id} ${pokemon.name}</h2>
                          `                                               // add the pokemon's image, number, and name to the button
    pokemonList.appendChild(listItem);                                    // add listItem pokemon button to pokemonList
    listItem.addEventListener('click', () => {                            // load pokemon details when user clicks on pokemon button
      loadDetails (pokemon)
  })
}



function loadList() {
    return fetch(apiUrl).then(function(response) {
        return response.json();
    }).then (function (json) {
        json.results.forEach(function(item, index){
            let pokemon = {
                name: item.name,
                id: index + 1,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index +1}.png`,
                detailsUrl: item.url
            };
            add(pokemon);
        }); 
    }).catch(function (e){
        console.error(e);
    })
}

const pokeCache = {};                                                   // use this to store chached pokemon information 


function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    if (pokeCache[url]) {
      console.log('cache item found',pokeCache[url])
      dataForModal(pokeCache[url])
      return 
    } 
    return fetch(url).then(function(response){
        return response.json();
    }).then(function(details) {
      pokeCache[url] = details
      console.log(details)
      dataForModal(details)
    }).catch(function(e){
        console.error(e);
    });
}


  function dataForModal(details){
    let pokemon = { 
    name : details.name,
    id: details.id,
    imageUrl : details.sprites.front_default,
    imageUrlBack : details.sprites.back_default,
    height : details.height,
    types : details.types.map( (type) => type.type.name).join(', ')
}
    showModal(pokemon);
  }


  // Displays the modal with pokemon details
  function showModal(pokemon) {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.innerHTML =''                                        // clears existing modal content
      

      let modal = document.createElement('div');                          // creates new div to hold modal with pokemon info
      modal.classList.add('modal');                                       // adds class of pokemon-list-item to newly created div

      let pokemonCard = document.createElement('div');
      pokemonCard.classList.add('pokemon-card');

      let closeButtonElement = document.createElement('button');          // create a button element
      closeButtonElement.classList.add('modal-close');                    // add class of modal-close to newly created button
      closeButtonElement.innerText = 'X';                                 // set inner text of button to 'Close'
      closeButtonElement.addEventListener('click', hideModal);            // hide modal when user clicks button    

      
      let titleElement = document.createElement('h2');                    // create a title element for modal
      titleElement.innerText = `#${pokemon.id} ${pokemon.name}`;          // add pokemon name to modal title

      let imageElement = document.createElement('img');                   // creates element to hold image
      imageElement.classList.add('modal-img');                            // add modal-img class to modal 
      imageElement.src = pokemon.imageUrl;                                // link pokemon image to modal

      let imageElementBack = document.createElement('img');
      imageElementBack.classList.add('modal-img');
      imageElementBack.src = pokemon.imageUrlBack;

      let contentElement = document.createElement('p');                   // create a new paragraph element within modal
      contentElement.innerText = 'Height: ' + pokemon.height + 'm';       // concatenate height details

      let typesElement = document.createElement('p');
      typesElement.innerText = 'Types: ' + pokemon.types;                 // create new paragraph element within modal

      pokemonCard.appendChild(closeButtonElement);                        // add close button to modal
      pokemonCard.appendChild(titleElement);                              // add pokemon name to modal
      pokemonCard.appendChild(imageElement);                              // add pokemon image to modal
      pokemonCard.appendChild(imageElementBack);                          // add pokemon second image to modal
      pokemonCard.appendChild(contentElement);                            // add pokemon height to modal
      pokemonCard.appendChild(typesElement);                              // add pokemon types to modal
    
      modal.classList.add('is-visible');    
      modal.appendChild(pokemonCard);                                     // add pokemon card to modal
      modalContainer.appendChild(modal);                                  // add modal to modal container
      
      modalContainer.classList.add('is-visible');
      modalContainer.addEventListener('click', (e) => {                   // since this is also triggered when clicking inside the modal, 
          let target = e.target;                                      
          if (target === modalContainer) {                                // only close it if the user clicks directly on the overlay
              hideModal();
          };
      });
      document.addEventListener('keydown', (event) => {                   // close event added to document closes modal when user presses the Esc key
        if (event.key === 'Escape') {
            hideModal();
          }
      })

  }

  function hideModal() {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove('is-visible'); 
      let modal = document.querySelector('.modal');
      modal.classList.remove('is-visible');

  }


  return {                                                                // this returns an object with the value of the getAll and the add function
    getAll: getAll,                                                       // getAll: is the key that calls the function and returns the value of the same name (key : value)
    add:add,                                                              // add: is the key that calls the function and returns the value of the same name (key : value)
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem, 
    dataForModal: dataForModal,
    showModal: showModal,
    hideModal: hideModal
  }
}) ();                                                                    // the (); makes this a self-executing function


pokemonRepository.loadList().then(function() {                            // runs the loadList function for each pokemon and adds a list item to the page                   
  pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
  }); 
});

                                        
let back2TopBtn = document.getElementById("back2TopBtn");                 // Get the back to top button

window.onscroll = function() {                                            // When the user scrolls, run scrollFunction 
    scrollFunction()
}; 

function scrollFunction(){                                                // When the user scrolls down 20px from the top of the document, show the button
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
        back2TopBtn.style.display = "block";
    } else {
        back2TopBtn.style.display = "none";
    }
}

function backToTopFunction() {                                            // When the user clicks on the button, scroll to the top of the document
    window.scrollTo({top: 0, behavior: 'smooth'});

    //document.body.scrollTop = 0;                                          // For Safari
    //document.documentElement.scrollTop = 0;                               // For Chrome, Firefox, IE and Opera
}