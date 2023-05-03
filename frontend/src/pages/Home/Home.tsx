import React from "react"
import styles from "./Home.module.css"
import { Pokemon } from "components/Pokemon"

export const Home = () => {
  interface PokemonInfo {
    name: string
    id: number
    height: number
    weight: number
  }

  /*
  interface Pokemon {
    name: string
    id: number
  }

  const pokemonsList = [
    {
      name: "Carapuce",
      id: 7,
    },
    {
      name: "Carabaffe",
      id: 8,
    },
    {
      name: "Tortank",
      id: 9,
    },
  ]*/

  const [pokemonFilterValue, setPokemonFilterValue] = React.useState("")
  const [pokemonsList, setPokemonsList] = React.useState<PokemonInfo[]>([])

  const fetchPokemons = () => {
    return fetch("http://localhost:8000/pokemons", { headers: { accept: "application/json" } })
  }

  React.useEffect(() => {
    fetchPokemons()
      .then(response => response.json())
      .then(pokemonData => setPokemonsList(pokemonData))
  }, [])

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPokemonFilterValue(event.target.value)
  }

  const filterPokemonsByName = (pokemons: PokemonInfo[], userInput: string) => {
    return pokemons.filter(pokemon => pokemon.name.includes(userInput))
  }

  return (
    <div className={styles.intro}>
      <div>Bienvenue sur ton futur pokédex !</div>
      <div>Tu vas pouvoir apprendre tout ce qu'il faut sur React et attraper des pokemons !</div>
      <input className={styles.input} onChange={onInputChange} value={pokemonFilterValue} />
      {filterPokemonsByName(pokemonsList, pokemonFilterValue).map(({ name, id }) => {
        return <Pokemon name={name} id={id} key={id} />
      })}
    </div>
  )
}
