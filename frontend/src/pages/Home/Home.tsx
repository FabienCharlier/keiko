import React from "react"
import styles from "./Home.module.css"
import { Pokemon } from "components/Pokemon"
import { Loader } from "components/Loader"

export const Home = () => {
  interface PokemonInfo {
    name: string
    id: number
    height: number
    weight: number
  }

  const [pokemonsList, setPokemonsList] = React.useState<PokemonInfo[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  const fetchPokemons = () => {
    return fetch("http://localhost:8000/pokemons", { headers: { accept: "application/json" } })
  }

  React.useEffect(() => {
    const loadPokemons = async () => {
      const response = await fetchPokemons()
      const pokemonData = await response.json()
      setPokemonsList(pokemonData)
      setIsLoading(false)
    }
    loadPokemons()
  }, [])

  return (
    <div className={styles.intro}>
      <div className={styles.title}>Pokedex !</div>
      {!isLoading ? (
        <div className={styles.pokemonList}>
          {pokemonsList.map(({ name, id, weight, height }) => {
            return <Pokemon name={name} id={id} weight={weight} height={height} key={id} />
          })}
        </div>
      ) : (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}
    </div>
  )
}
