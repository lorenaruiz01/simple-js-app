let pokemonRepository = (function () {
        let pokemonList = [];
        let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


        function getAll(){
                return pokemonList;
        }
        function add (item){
                pokemonList.push(item);
        }
        function addListItem(pokemon){
                let pokemonListItem = document.querySelector(".pokemon-list");
                let listItem = document.createElement("li");
                let button = document.createElement("button");
                button.innerText = pokemon.name;
                button.classList.add("button-class");
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
                    add(pokemon);
                  });
                }).catch(function (e) {
                  console.error(e);
                })
              }

        function loadDetails(item) {
                let url = item.detailsUrl;
                return fetch(url).then(function (response) {
                  return response.json();
                }).then(function (details) {
                  // Now we add the details to the item
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
              
              
        let modalContainer = document.querySelector('#modal-container');

        function showModal (item){
                console.log("item", item);

                

                let modal = document.createElement('div');

                // Clear all existing modal content
                modalContainer.innerHTML = '';

                modal.classList.add('modal');

                // Add the new modal content
                let closeButtonElement = document.createElement('button');
                closeButtonElement.classList.add('modal-close');
                closeButtonElement.innerText = 'Close';
                closeButtonElement.addEventListener('click', hideModal);
                
                let titleElement = document.createElement('h1');
                titleElement.innerText = item.name;
                
                let contentElement = document.createElement('div');
                let imageElement = document.createElement('img');
                imageElement.src = imageUrl;
                contentElement.appendChild(imageElement);
                contentElement.innerText = item.detailsUrl;

                let detailsElement = document.createElement('div');
                detailsElement.textContent = detailsUrl;
                
                modal.appendChild(closeButtonElement);
                modal.appendChild(titleElement);
                modal.appendChild(contentElement);
                modalContainer.appendChild(modal);
                
                modalContainer.classList.add('is-visible');
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
                add: add,
                getAll: getAll,
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