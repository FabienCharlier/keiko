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
  const [errorMessage, setErrorMessage] = React.useState<string>("")

  const fetchPokemons = () => {
    return fetch("http://localhost:8000/pokemons", { headers: { accept: "application/json" } })
  }

  React.useEffect(() => {
    const loadPokemons = async () => {
      try {
        const response = await fetchPokemons()
        const pokemonData = await response.json()
        setPokemonsList(pokemonData)
        setIsLoading(false)
      } catch (error) {
        setErrorMessage(error as string)
      }
    }
    loadPokemons()
  }, [])

  const displayHome = () => {
    return (
      <div>
        <div className={styles.title}>Pokedex !</div>
        {!isLoading ? (
          <div className={styles.pokemonList}>
            {pokemonsList.map(({ name, id, weight, height }) => {
              return <Pokemon name={name} id={id} weight={weight} height={height} key={id} />
            })}
          </div>
        ) : (
          <div>
            <Loader />
          </div>
        )}
      </div>
    )
  }

  return <div className={styles.intro}>{errorMessage != "" ? <p>{errorMessage.toString()}</p> : displayHome()}</div>
}
