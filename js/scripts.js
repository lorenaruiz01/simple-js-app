let pokemonList = [
        {name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
        {name: 'Pikachu', height: 0.4, types: 'electric'},
        {name:'Jynx', height: 1.4, types: ['electric', 'ice']}, 
        {name: 'Jigglypuff', height: 0.5, types:['fairy', 'normal'] }
];

// `for` LOOP
for (let i = 0; i < pokemonList.length; i++){
        document.write(name + " " + height + "m")
}

// CONDITIONAL
let result = height > 1 ? : 'That\'s a big pokmemon!' : 'what a cute pokemon!';
        console.log (result);
