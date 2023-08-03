let pokemonRepository = (function () {  // wraps the pokemonList inside of an IIFE (Immediately Invoked Function Expression)
        let pokemonList = []; // this is an array of pokemon
        let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


        function getAll () {    // the getAll function returns all items in the pokemonList array
          return pokemonList;
        }

        /**
         * adds a pokemon to the pokemon list
         * @param {*} item - a pokemon
         */
        function add (item) {  // the add function adds the selected pokemon to the array
                pokemonList.push(item); // item is a parameter. think of item as a placeholder for the argument that is passed into the parameter.  
        }

        function addListItem(pokemon){      // the addListItem function adds a pokemon as a list item and button
                
                // assign ul element to pokemonList variable
                let pokemonListItem = document.querySelector(".pokemon-list");
                let listItem = document.createElement("li");
                let button = document.createElement("button");
                
                button.innerText = pokemon.name;
                $(button).addClass("list-button btn btn-primary button-class").attr("type", "button").attr("data-toggle", "modal").attr("data-target", "modal-container");

                listItem.classList.add("list-group-item");
                listItem.appendChild(button);
                pokemonListItem.appendChild(listItem);
                button.addEventListener('click', function() {
                        showDetails(pokemon);
                      });
        }
        


        function loadList() {
                return fetch(apiUrl).then(function (response) {
                  return response.json();
                }).then(function (json) {
                  json.results.forEach(function (item) {
                    let pokemon = {
                      name: item.name,
                      detailsUrl: item.url
                    };
                    add(pokemon); // calling add function and passing pokemon as parameter
                  });
                }).catch(function (e) {
                  console.error(e);
                })
              }

        function loadDetails(item) { //note: rename item to something specific within this function
          // note: rename this item to something specific to this scope
                let url = item.detailsUrl;
                return fetch(url).then(function (response) {
                  return response.json();
                }).then(function (details) {
                  //add the details to the item
                  item.imageUrl = details.sprites.front_default;
                  item.height = details.height;
                  item.types = details.types;
                }).catch(function (e) {
                  console.error(e);
                });
              }

        function showDetails(item){ 
                pokemonRepository.loadDetails(item).then(function() {
                  showModal(item);
                  console.log(item);
                });

              }
              
              

        function showModal(item) {
                let modalContainer = document.querySelector('#modal-container');
                console.log(modalContainer);
                modalContainer.classList.add('is-visible');
                modalContainer.classList.add('modal');
                modalContainer.classList.add('modal-dialog');
                modalContainer.classList.add('modal-dialog-centered');
            
                // work through: create a div element for modal dialog
                let modalDialogElement = document.createElement('div')

                let closeButtonElement = document.createElement('button');
                closeButtonElement.addEventListener('click', hideModal);
            
                let nameElement = document.createElement('h1');
                nameElement.innerText = item.name;
            
                let imageElement = document.createElement('img');
                imageElement.classList.add('modal-img');
                imageElement.setAttribute('src', item.imageUrl);
            
                let heightElement = document.createElement('p');
                heightElement.innerText = 'height : ' + item.height;
            
                modalContainer.appendChild(closeButtonElement);
                modalContainer.appendChild(nameElement);
                modalContainer.appendChild(imageElement);
                modalContainer.appendChild(heightElement);
            
              }

        function hideModal() {
                modalContainer.classList.remove('is-visible');
                let dialogPromiseReject;
                if (dialogPromiseReject) {
                  dialogPromiseReject();
                  dialogPromiseReject = null;
                }
              }



        return {
                getAll: getAll,
                add: add,
                addListItem: addListItem,
                loadList: loadList,
                loadDetails:loadDetails,
                showDetails:showDetails
              };
        })(); 


function myLoopFunction(pokemon) {   
        console.log(pokemon.name + " is " + pokemon.height + "m tall");
}

pokemonRepository.loadList().then(function() {
        // Now the data is loaded!
pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
        });
      });