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

  const [pokemonsList, setPokemonsList] = React.useState<PokemonInfo[]>([])

  const fetchPokemons = () => {
    return fetch("http://localhost:8000/pokemons", { headers: { accept: "application/json" } })
  }

  React.useEffect(() => {
    const loadPokemons = async () => {
      const response = await fetchPokemons()
      const pokemonData = await response.json()
      setPokemonsList(pokemonData)
    }
    loadPokemons()
  }, [])

  return (
    <div className={styles.intro}>
      <div className={styles.title}>Pokedex !</div>
      <div className={styles.pokemonList}>
        {pokemonsList.map(({ name, id, weight, height }) => {
          return <Pokemon name={name} id={id} weight={weight} height={height} key={id} />
        })}
      </div>
    </div>
  )
}
