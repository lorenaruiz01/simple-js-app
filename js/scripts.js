(function (){
let pokemonList = [
        { name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
        { name: 'Pikachu', height: 0.4, types: 'electric'},
        { name:'Sylveon', height: 3.03, types: 'fairy'}, 
        { name: 'Jigglypuff', height: 0.5, types:['fairy', 'normal']}
];

})()

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
                pokemonList.push(item)
        }

        return {
                getAll: getAll,
                add:add
        }
})()


function myLoopFunction(pokemon) {   
        console.log(pokemon.name + " is " + pokemon.height + "m tall");
      }
const pokemonList = pokemonRepository.getAll();
pokemonList.forEach(myLoopFunction){
        let pokemonList = document.querySelector(".pokemon-list");
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;

};


