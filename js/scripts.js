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
                $(button).addClass("list-button btn btn-primary").attr("type", "button").attr("data-toggle", "modal").attr("data-target", "modal-container");

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
                modalContainer.classList.add("modal");
            
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