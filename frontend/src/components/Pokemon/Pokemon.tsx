import { Link } from "react-router-dom"
import styles from "./Pokemon.module.css"

interface Props {
  name: string
  id: number
  weight: number
  height: number
}

export const Pokemon = ({ name, id, weight, height }: Props) => {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  return (
    <div className={styles.pokemonFrame}>
      <Link to={`/pokemon/${id}`}>
        <div className={styles.contentBox}>
          <p className={styles.pokemonName}>{name}</p>
          <img src={imageUrl} alt="Pokémon {name}" />
          <p>Id : {id}</p>
          <p>Poids : {weight / 10} kg</p>
          <p>Taille : {height * 10} cm</p>
        </div>
      </Link>
    </div>
  )
}
