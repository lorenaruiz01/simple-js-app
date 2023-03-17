let pokemonRepository = (function (){
        let pokemonList = [
                {
                        name: 'Bulbasaur',
                        height: 0.7,
                        types: ['grass', 'poison']
                },
                {
                        name: 'Pikachu', 
                        height: 0.4, 
                        types: 'electric'
                },
                {
                        name:'Sylveon', 
                        height: 3.03, 
                        types: 'fairy'
                },
                {
                        name: 'Jigglypuff', 
                        height: 0.5, 
                        types:['fairy', 'normal']
                }
        ]

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
                        console.log(showDetails);
                      });
        }
        function showDetails(pokemon){
                console.log(pokemon);
        }
        return {
                getAll: getAll,
                add:add,
                addListItem: addListItem,
                showDetails:showDetails,
        };
})();


function myLoopFunction(pokemon) {   
        console.log(pokemon.name + " is " + pokemon.height + "m tall");
}
pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
});

