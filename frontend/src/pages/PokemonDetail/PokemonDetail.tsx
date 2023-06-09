import { Loader } from "components/Loader"
import React from "react"
import { useParams } from "react-router-dom"
import styles from "./PokemonDetail.module.css"

interface Pokemon {
  name: string
  id: number
  weight: number
  height: number
}

export const PokemonDetail = () => {
  const [displayedPokemon, setDisplayedPokemon] = React.useState<Pokemon>({
    name: "",
    id: -1,
    weight: -1,
    height: -1,
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [errorMessage, setErrorMessage] = React.useState<string>("")
  const { id } = useParams()

  React.useEffect(() => {
    const handleError = (errorMessage: string) => {
      setErrorMessage(errorMessage)
    }

    const loadPokemon = async () => {
      try {
        setErrorMessage("")
        const response = await fetch(`http://localhost:8000/pokemon/${id}`, { headers: { accept: "application/json" } })
        if (response.ok) {
          const pokemon = await response.json()
          setDisplayedPokemon(pokemon)
          setIsLoading(false)
        } else {
          const errorMessage = await response.text()
          handleError(errorMessage)
        }
      } catch (error) {
        handleError(error as string)
      }
    }

    loadPokemon()
  }, [id])

  const baseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon"
  const frontImageUrl = `${baseUrl}/${id}.png`
  const backImageUrl = `${baseUrl}/back/${id}.png`
  const shinyFrontImageUrl = `${baseUrl}/shiny/${id}.png`
  const shinyBackImageUrl = `${baseUrl}/back/shiny/${id}.png`

  const { name, weight, height } = displayedPokemon

  return (
    <div className={styles.intro}>
      {errorMessage != "" ? (
        <p>{errorMessage.toString()}</p>
      ) : isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div>
          <p className={styles.title}>{name}</p>
          <div className={styles.pictureContainer}>
            <img className={styles.picture} src={frontImageUrl} alt={`Pokémon ${name}, vue de face`} />
            <img className={styles.picture} src={backImageUrl} alt={`Pokémon ${name}, vue de dos`} />
            <img
              className={styles.picture}
              src={shinyFrontImageUrl}
              alt={`Pokémon ${name}, version shiny, vu de face`}
            />
            <img className={styles.picture} src={shinyBackImageUrl} alt={`Pokémon ${name}, version shiny, vu de dos`} />
          </div>
          <p className={styles.details}>Id : {id}</p>
          <p className={styles.details}>Poids : {weight / 10} kg</p>
          <p className={styles.details}>Taille : {height * 10} cm</p>
        </div>
      )}
    </div>
  )
}
