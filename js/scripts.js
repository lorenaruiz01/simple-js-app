let pokemonList = [
        {name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
        {name: 'Pikachu', height: 0.4, types: 'electric'},
        {name:'Sylveon', height: 3.03, types: 'fairy'}, 
        {name: 'Jigglypuff', height: 0.5, types:['fairy', 'normal']}
];

// `for` LOOP
for (let i = 0; i < pokemonList.length; i++) {
        document.write(name[i]+ " is" + height[i] + "m tall");
        if (height > 1 ) {
                document.write('That is a big pokemon!');
        }
}

// CONDITIONAL
// let height = 1
// let result = height > 1 ? 'That\'s a big pokmemon!' : 'What a cute pokemon!';
//         console.log (result);
