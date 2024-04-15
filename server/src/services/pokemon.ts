import { savePokemon  } from "./db.ts"
export type Pokemon = {
  id: number
  name: string
}
const pokemonList: Pokemon[] = [
  { id: 1, name: 'Bulbasaur' },
  { id: 2, name: 'Ivysaur' },
  { id: 3, name: 'Venusaur' },
  { id: 4, name: 'Charmander' },
  { id: 5, name: 'Charmeleon' },
  { id: 6, name: 'Charizard' },
  { id: 7, name: 'Squirtle' },
  { id: 8, name: 'Wartortle' },
  { id: 9, name: 'Bla2stoise' },
]

export const getPokemonList = async (page?: number): Promise<{ list: Pokemon[], count: number}> => {
  if (!page) { return { list: pokemonList, count: pokemonList.length } }
  return { list: pokemonList.slice((page - 1) * 5, page * 5), count: pokemonList.length }
}

/*export const addPokemon = async (pokemon: Pokemon) => {
  if (pokemonList.some((p) => p.id === pokemon.id)) {
    throw new Error('Pokemon already exists')
  }
  pokemonList.push(pokemon)
  return pokemon
}*/


export const addPokemon = async (pokemon: Pokemon) => {
  if (pokemonList.some((p) => p.id === pokemon.id)) {
    throw new Error('Pokemon already exists')
  }
  pokemonList.push()
  const newPokemonDoc = await savePokemon(pokemon)
  console.log('Saved Pokemon: ', newPokemonDoc)
  return pokemon
}
export const deletePokemon = async (pokemonId: number) => {
  const index = pokemonList.findIndex((pokemon) => pokemon.id === pokemonId)
 
  return pokemonList.splice(index, 1)[0]
}