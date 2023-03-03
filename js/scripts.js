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

console.log(pokemonRepository.getAll());



function myLoopFunction(pokemon) {
        console.log(pokemon.name + " is " + pokemon.height + "m tall");
      }
const pokemonList = pokemonRepository.getAll();
pokemonList.forEach(myLoopFunction);
console.log(pokemonRepository.getAll());




      


// for (let i = 0; i < pokemonList.length; i++) {
//         const pokemon = pokemonList[i]
//          document.write("<p>", pokemon.name + " is " + pokemon.height + "m tall" , "</p>");
//         if (pokemon.height > 1) {
//                  document.write("That is a big pokemon!")
//          };
//  }



