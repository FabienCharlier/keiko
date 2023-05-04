import React from "react"
import styles from "./Home.module.css"
import { Pokemon } from "components/Pokemon"
import { Loader } from "components/Loader"
import { useParams, Link } from "react-router-dom"

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

  const { page } = useParams()

  const handleError = (errorMessage: string) => {
    setErrorMessage(errorMessage)
  }

  React.useEffect(() => {
    const loadPokemons = async () => {
      try {
        setErrorMessage("")
        const response = await fetch(`http://localhost:8000/pokemons?page=${page}`, {
          headers: { accept: "application/json" },
        })
        if (response.ok) {
          const pokemonData = await response.json()
          setPokemonsList(pokemonData)
          setIsLoading(false)
        } else {
          const errorMessage = await response.text()
          handleError(errorMessage)
        }
      } catch (error) {
        handleError(error as string)
      }
    }
    loadPokemons()
  }, [page])

  const displayHome = () => {
    return (
      <>
        <div className={styles.title}>Pokedex !</div>
        {!isLoading ? (
          <>
            <div className={styles.navigationBox}>
              {page != "0" ? <Link to={`/pokedex/${parseInt(page!) - 1}`}>{"<"}</Link> : <p></p>}
              {page != "10" ? <Link to={`/pokedex/${parseInt(page!) + 1}`}>{">"}</Link> : <p></p>}
            </div>
            <div className={styles.pokemonList}>
              {pokemonsList.map(({ name, id, weight, height }) => {
                return <Pokemon name={name} id={id} weight={weight} height={height} key={id} />
              })}
            </div>
          </>
        ) : (
          <div>
            <Loader />
          </div>
        )}
      </>
    )
  }

  return <div className={styles.intro}>{errorMessage != "" ? <p>{errorMessage.toString()}</p> : displayHome()}</div>
}
