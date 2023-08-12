let pokemonRepository = (function () {  // wraps the pokemonList inside of an IIFE (Immediately Invoked Function Expression)
        let pokemon = []; // this is an array of pokemon
        
        function getAll () {    // the getAll function returns all items in the pokemonList array
            return pokemon;
        }

        function loadList() {
          let url = `https://pokeapi.co/api/v2/pokemon/?limit=151`;

      
          return fetch(url)
            .then(function (response) {
              return response.json();
            })
            .then(function (json) {
              pokemon = json.results.map((item, index) => {
                return {
                  name: item.name,
                  id: index  + 1,
                  image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+ 1}.png`
                };
              });
      
              displayPokemonButtons(); // Call function to display the buttons
            })
            .catch(function (e) {
              console.error(e);
            });

        }
       

        function displayPokemonButtons() {
         //  document.querySelector('.pokemon-list').innerHTML = ''; // Clear previous buttons
  
          const pokemonHTMLString = pokemon.map ( (pokemon) => 
              `<li class="card" onclick="selectPokemon(${pokemon.id})" >
                  <img class="card-image" src="${pokemon.image}"/>
                  <h2 class="card-title">#${pokemon.id} ${pokemon.name}</h2>
              </li>`
              ).join('');
          pokemonRepository.innerHTML = pokemonHTMLString;
      
          pokemon.forEach(function (pokemon) {
            addListItem(pokemon);
          });
        }

        
        

                /** @param {*} pokemon - placeholder */
        function add (pokemon) {  // the add function adds the selected pokemon to the pokemonList array
          pokemonList.push(pokemon);
   
          }

        function addListItem(pokemon) {      // the addListItem function adds a pokemon as a list item and button
                
                // assign ul element to pokemonList variable
                let pokemonListItem = document.querySelector('ul');
                
                // create a list element
                let listItem = document.createElement('li');
                
                // create a button element
                let button = document.createElement('button');
                // add the pokemon's name to the button element
                button.innerText = pokemon.name;
                button.classList.add("list-button", "btn", "btn-primary", "button-class");
                button.type = "button";
                // button.setAttribute("data-toggle", "modal");
                // button.setAttribute("data-target", "#modal-container");
                // $(button).addClass("list-button btn btn-primary button-class").attr("type", "button").attr("data-toggle", "modal").attr("data-target", "modal-container");
                
                // add class to listItem element
                listItem.classList.add("list-group-item");

                // add button to list element
                listItem.appendChild(button);

                // add 'li' to 'ul' element
                pokemonListItem.appendChild(listItem);

                // run showDetails function when user clicks button
                button.addEventListener('click', function(pokemon) {
                      showDetails(pokemon);
                  });
        }
        

        


        

        function loadDetails(pokemon) { 
                let url = pokemon.detailsUrl;
                return fetch(url).then(function (response) {
                  return response.json();
                }).then(function (details) {
                  //add the details to the pokemon item
                  pokemon.imageUrl = details.sprites.front_default;
                  pokemon.height = details.height;
                  pokemon.types = details.types;
                }).catch(function (e) {
                  console.error(e);
                });
          }

        function showDetails(pokemon){ 
                pokemonRepository.loadDetails(pokemon).then(function(pokemon) {
                  // showModal(pokemon);
                  console.log(pokemon);
                });
          }
              
              

        function showModal(item) {  //remove modalContainer as second parameter
                let modalContainer = document.querySelector('#modal-container');
                modalContainer.innerHTML = ''; // Clear any previous content

                let closeButtonElement = document.createElement('button');
                closeButtonElement.innerText = 'Close';
                closeButtonElement.addEventListener('click', hideModal);

            
                let nameElement = document.createElement('h1');
                nameElement.innerText = item.name;
            
                let imageElement = document.createElement('img');
                imageElement.classList.add('modal-img');
                imageElement.setAttribute('src', item.imageUrl);
            
                let heightElement = document.createElement('p');
                heightElement.innerText = 'Height: ' + item.height + 'm';
            
                modalContainer.appendChild(closeButtonElement);
                modalContainer.appendChild(nameElement);
                modalContainer.appendChild(imageElement);
                modalContainer.appendChild(heightElement);


                modalContainer.classList.add('is-visible');
                // modalContainer.classList.add('modal');
                // modalContainer.classList.add('modal-dialog');
                // modalContainer.classList.add('modal-dialog-centered');
            
                // // work through: create a div element for modal dialog
                // let modalDialogElement = document.createElement('div')
          }

        function hideModal(modalContainer) {
                modalContainer.classList.remove('is-visible');
                let dialogPromiseReject;
                if (dialogPromiseReject) {
                  dialogPromiseReject();
                  dialogPromiseReject = null;
                }
          }

        return {    // this returns an object with the value of the getAll and the add function
              getAll: getAll,   // getAll: is the key that calls the function and returns the value of the same name (key : value)
              add:add,       // add: is the key that calls the function and returns the value of the same name (key : value)
              addListItem: addListItem,
              loadList: loadList,
              loadDetails:loadDetails,
              showDetails:showDetails
          }
}) ();        // the (); makes this a self-executing function





pokemonRepository.loadList().then(function() { // loads data
  pokemonRepository.getAll().forEach(function (pokemon) {   // this forEach function loops over each pokemon item and runs the addListItem function for each pokemon item
      pokemonRepository.addListItem(pokemon);   // this calls the addListItem function that's inside the pokemonRepository, passing in the pokemon as a parameter
  });
});