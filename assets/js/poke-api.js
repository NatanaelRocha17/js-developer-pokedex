
function abilidades(aux){
    return fetch(aux.ability.url)
        .then((abilites) => abilites.json())
        .then(abilidade => abilidade.effect_entries[0].effect)
        .then(date => {
          return date
        })
        
    
  }
  
  async function convertPokeApiDetailToPokemon(pokeDetail) {
  
    const pokemon = new Pokemon();
    pokemon.description = await abilidades(pokeDetail.abilities[0])
  
    
    pokemon.name = pokeDetail.name;
    pokemon.number = pokeDetail.id
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
  
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types //pegando o array types o objeto da primeira posição --> isso se chama array des
  
    pokemon.type = type
    pokemon.types = types
    
  
    return pokemon;
  
  }
  
  
  const pokeApi = {
  
    poderes: {
  
    },
  
    getPokemosDetail: (pokemon) => {
      return fetch(pokemon.url)
        .then((response) => response.json())
        .then((aux) => convertPokeApiDetailToPokemon(aux))
    },
  
    getPokemos: (offset = 0, limit = 5) => {
      const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
      return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => {
          const pokemons = jsonBody.results;
         
          return pokemons.map(pokeApi.getPokemosDetail);
        })
        .then((detailRequets) => {
       
          return Promise.all(detailRequets);
        });
    }
  
  
  }
  