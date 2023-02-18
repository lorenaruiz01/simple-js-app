let pokemonList = [
        { name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
        { name: 'Pikachu', height: 0.4, types: 'electric'},
        { name:'Sylveon', height: 3.03, types: 'fairy'}, 
        { name: 'Jigglypuff', height: 0.5, types:['fairy', 'normal']}
];
for (let i = 0; i < pokemonList.length; i++) {
       const pokemon = pokemonList [i]
        document.write(pokemon.name[i]+ " is " + pokemon.height + "m tall");
       if (height[1] > 1) {
                document.write('That is a big pokemon!');
        }
}