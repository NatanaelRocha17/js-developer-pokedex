const pokemonsList = document.querySelector("#pokemonList")

const loadMoreButton = document.querySelector("#loadMoreButton")

const limit = 10
let offset = 0

const maxRecords = 151


function loadPokemonItens(offset = 0, limit = 5) {

    function converterPokemonToLi(pokemon) {  
        return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <textarea  id="caixaDeTexto" name="mensagem" rows="4" cols="10" >${pokemon.description}</textarea>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(" ")}
                </ol>
                <img src=${pokemon.photo} alt=${pokemon.name}>    
              
            </div>
        
        `
    }

    const poke = pokeApi.getPokemos(offset, limit)

    poke.then((pokemons = []) => {
        console.log(pokemons)
        let aux = pokemons.map(converterPokemonToLi)
        pokemonsList.innerHTML += aux.join("")
        
    })
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
    offset += limit;

    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;

        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)

    } else {
        loadPokemonItens(offset, limit)
    }

})