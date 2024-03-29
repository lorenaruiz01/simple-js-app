/* eslint-disable object-shorthand */
// wrap pokemonList array inside of an IIFE (Immediately Invoked Function Expression)
// eslint-disable-next-line func-names
const pokemonRepository = (function () {
  const pokemonList = []

  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151'

  // adds the selected pokemon to the array
  function add(pokemon) {
    pokemonList.push(pokemon)
  }

  // returns all items in the pokemonList array
  function getAll() {
    return pokemonList
  }

  // adds a pokemon as a list item and button (via a click event)
  function addListItem(pokemon) {
    // eslint-disable-next-line no-shadow
    const pokemonList = document.querySelector('.pokemon-list')

    const listItem = document.createElement('li')
    listItem.classList.add('pokemon-list-item')
    listItem.innerHTML = ` 
                              <img src=${pokemon.image}>                                  
                              <h2>#${pokemon.id} ${pokemon.name}</h2>
                          `
    pokemonList.appendChild(listItem)
    listItem.addEventListener('click', () => {
      // eslint-disable-next-line no-use-before-define
      loadDetails(pokemon)
    })
  }

  // fetches data and creates pokemon object with specific details, activates add() function
  function loadList() {
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => {
        json.results.forEach((item, index) => {
          const pokemon = {
            name: item.name,
            id: index + 1,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
            detailsUrl: item.url,
          }
          add(pokemon)
        })
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e)
      })
  }

  // use this to store chached pokemon information
  const pokeCache = {}

  // fetches and stores details into pokeCahce
  function loadDetails(pokemon) {
    const url = pokemon.detailsUrl
    if (pokeCache[url]) {
      // eslint-disable-next-line no-console
      console.log('cache item found', pokeCache[url])
      // eslint-disable-next-line no-use-before-define
      dataForModal(pokeCache[url])
      return
    }
    // eslint-disable-next-line consistent-return
    return fetch(url)
      .then((response) => response.json())
      .then((details) => {
        pokeCache[url] = details
        // eslint-disable-next-line no-console
        console.log(details)
        // eslint-disable-next-line no-use-before-define
        dataForModal(details)
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e)
      })
  }

  // creates a pokemon object with specified details
  function dataForModal(details) {
    const pokemon = {
      name: details.name,
      id: details.id,
      imageUrl: details.sprites.front_default,
      imageUrlBack: details.sprites.back_default,
      height: details.height,
      types: details.types.map((type) => type.type.name).join(', '),
    }
    // activates showModal function and passes in pokemon object
    // eslint-disable-next-line no-use-before-define
    showModal(pokemon)
    // hides back to top button when showModal function runs
    const back2TopBtn = document.getElementById('back2TopBtn')
    back2TopBtn.style.display = 'none'
  }

  // Displays the modal with pokemon details
  function showModal(pokemon) {
    const modalContainer = document.querySelector('#modal-container')
    modalContainer.innerHTML = ''

    const modal = document.createElement('div')
    modal.classList.add('modal')

    const pokemonCard = document.createElement('div')
    pokemonCard.classList.add('pokemon-card')

    const closeButtonElement = document.createElement('button')
    closeButtonElement.classList.add('modal-close')
    closeButtonElement.innerText = 'X'
    // eslint-disable-next-line no-use-before-define
    closeButtonElement.addEventListener('click', hideModal)

    const titleElement = document.createElement('h2')
    titleElement.innerText = `#${pokemon.id} ${pokemon.name}`

    const imageElement = document.createElement('img')
    imageElement.classList.add('modal-img')
    imageElement.src = pokemon.imageUrl

    const imageElementBack = document.createElement('img')
    imageElementBack.classList.add('modal-img')
    imageElementBack.src = pokemon.imageUrlBack

    const contentElement = document.createElement('p')
    contentElement.innerText = `Height: ${  pokemon.height  }m`

    const typesElement = document.createElement('p')
    typesElement.innerText = `Types: ${  pokemon.types}`

    pokemonCard.appendChild(closeButtonElement)
    pokemonCard.appendChild(titleElement)
    pokemonCard.appendChild(imageElement)
    pokemonCard.appendChild(imageElementBack)
    pokemonCard.appendChild(contentElement)
    pokemonCard.appendChild(typesElement)

    modal.appendChild(pokemonCard)
    modalContainer.appendChild(modal)

    modalContainer.classList.add('is-visible')

    // adds a click event on modal container to hide modal
    modalContainer.addEventListener('click', (e) => {
      // eslint-disable-next-line prefer-destructuring
      const target = e.target
      if (target === modalContainer) {
        // eslint-disable-next-line no-use-before-define
        hideModal()
      }
    })
    // adds an esc keydown event on modal container to hide modal
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        // eslint-disable-next-line no-use-before-define
        hideModal()
      }
    })
  }

  // hides modal and its content from view
  function hideModal() {
    const modalContainer = document.querySelector('#modal-container')
    modalContainer.classList.remove('is-visible')
    const modalCard = document.querySelector('.modal > *')
    modalCard.style.display = 'none'

    // displays back to top button when modal is hidden
    const back2TopBtn = document.getElementById('back2TopBtn')
    back2TopBtn.style.display = 'block'
  }

  // A key calls a function and returns the value of the same name (key : value)
  return {
    getAll: getAll,
    add: add,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    dataForModal: dataForModal,
    showModal: showModal,
    hideModal: hideModal,
  }
})() // the (); makes the IFFE a self-executing function

pokemonRepository.loadList().then(() => {
  // runs the loadList function for each pokemon and adds a list item to the page
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon)
  })
})

// Get the back to top button
const back2TopBtn = document.getElementById('back2TopBtn')

// eslint-disable-next-line func-names
window.onscroll = function () {
  // When the user scrolls, run scrollFunction
  // eslint-disable-next-line no-use-before-define
  scrollFunction()
}

function scrollFunction() {
  // When the user scrolls down 20px from the top of the document, show the button
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    back2TopBtn.style.display = 'block'
  } else {
    back2TopBtn.style.display = 'none'
  }
}

// eslint-disable-next-line no-unused-vars
function backToTopFunction() {
  // When the user clicks on the button, scroll to the top of the document
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
