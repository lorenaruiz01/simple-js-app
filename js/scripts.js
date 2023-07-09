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
                listItem.classList.add("list-group-item");
                let button = document.createElement("button");
                button.innerText = pokemon.name;
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
              
              

        function showModal (item){
          let modalContainer = document.querySelector('#modal-container');
          $(modalContainer).addClass("modal fade show").attr("aria-labelledby", "Pokemon details").attr("aria-hidden", "true")
          let modalBody = $(".modal-body");
          let modalTitle = $(".modal-title");

          modalTitle.empty();
          modalBody.empty();


          // Add title to modal
          let titleElement = $("<h1>" + item.name + "</h1>" )
          
          // Add image to modal
          let imageElement = $('<img class="modal-img" style="width:50%">');
          imageElement.attr("src", item.imageUrl);
          
          // Add height to modal
          let heightElement = $("<p>" + item.height + "</p>");

          // Add types to modal
          let typesElement = $("<p>" + item.types + "</p>");

          
          modalTitle.append(titleElement);
          modalBody.append(imageElement);
          modalBody.append(heightElement);
          modalBody.append(typesElement);  
  
                // modal.appendChild(closeButtonElement);
                // modal.appendChild(titleElement);
                // modal.appendChild(imageElement);
                // modal.appendChild(contentElement);
                // modalContainer.appendChild(modal);
                
                // modalContainer.classList.add('is-visible');
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