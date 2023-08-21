let pokemonRepository = (function () {                                  // wrapping pokemonList array inside of an IIFE (Immediately Invoked Function Expression)
  let pokemonList = [];                                                 // an empty array of pokemon objects

  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

  function add (pokemon) {                                              // the add function adds the selected pokemon to the array
      pokemonList.push(pokemon)
  //   if (typeof pokemon === 'object' &&                                // checks whether pokemon is an object
  //     'name' in pokemon &&                                            // checks that pokemon object includes name key 
  //     'height' in pokemon &&                                          // checks that pokemon object includes height key
  //     'types' in pokemon                                              // checks that pokemon object includes types key
  // ) {
  //   pokemonList.push(pokemon);
  // } else {
  //   console.log('pokemon cannot be pushed to pokemonList');
  // }                                                                   // for some reason, the pokemon is not pushed if I uncommment this if-else conditiona statement
  }

  function getAll () {                                                    // the getAll function returns all items in the pokemonList array
    return pokemonList;
  }

  const pokeCache = {};                                                   

  
  function addListItem(pokemon) {                                         // the addListItem function adds a pokemon as a list item and button
    let pokemonList = document.querySelector('.pokemon-list');            // assign ul element to pokemonList variable
    
    let listItem = document.createElement('li');                          // create an li element
    listItem.classList.add('pokemon-list-item');                          // add 'pokemon-list-item' class to button
    listItem.innerHTML =  ` 
                              <img src=${pokemon.image}>                                  
                              <h2>#${pokemon.id} ${pokemon.name}</h2>
                          `                                               // add the pokemon's image, number, and name to the button
    pokemonList.appendChild(listItem);                                    // add listItem pokemon button to pokemonList
    listItem.addEventListener('click', () => {                            // show pokemon details when user clicks on pokemon button
      // if(!pokeCache[pokemon.id]){
      //     const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
      //     const response = fetch(url);
      //     const pokemon = response.json();
      //     pokeCache[pokemon.id] = pokemon;
      //     loadDetails(pokemon);
      //     addListItem(pokemon);
      //     showDetails(pokemon);
      // } else {
      //     loadDetails(pokeCache[id]);
      //     addListItem(pokemon.id);
      //     showDetails(pokemon.id);
      // }
      showDetails (pokemon)
  })
}

  function showDetails (pokemon) {
          loadDetails(pokemon);
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




  function loadDetails(pokemon) {
      let url = pokemon.detailsUrl;
      return fetch(url).then(function(response){
          return response.json();
      }).then(function(details) {
          //pokemon details
          pokemon.imageUrl = details.sprites.front_default;
          pokemon.imageUrlBack = details.sprites.back_default;
          pokemon.height = details.height;
          pokemon.types = details.types.map( (type) => type.type.name).join(', ');
          showModal(pokemon);
      }).catch(function(e){
          console.error(e);
      });
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
      closeButtonElement.innerText = 'Close';                             // set inner text of button to 'Close'
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
      modal.appendChild(pokemonCard);                                     // add pokemon card to modal
      modalContainer.appendChild(modal);                                  // add modal to modal container
      
      modalContainer.classList.add('is-visible');
      modalContainer.addEventListener('click', (e) => {                   // since this is also triggered when clicking inside the modal, 
          let target = e.target;                                      
          if (target === modalContainer) {                                // only close it if the user clicks directly on the overlay
              hideModal();
          };
      })

  }

  function hideModal() {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove('is-visible'); 

  }


  return {                                                                // this returns an object with the value of the getAll and the add function
    getAll: getAll,                                                       // getAll: is the key that calls the function and returns the value of the same name (key : value)
    add:add,                                                              // add: is the key that calls the function and returns the value of the same name (key : value)
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem, 
    showDetails: showDetails,
    showModal: showModal,
    hideModal: hideModal
  }
}) ();                                                                    // the (); makes this a self-executing function


pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
  }); 
});