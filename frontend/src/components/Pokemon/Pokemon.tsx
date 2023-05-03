import styles from "./Pokemon.module.css"

export const Pokemon = ({ name, id, weight, height }: Props) => {
  const imageUrl: string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png"
  return (
    <div className={styles.pokemonFrame}>
      <p className={styles.pokemonName}>{name}</p>
      <img src={imageUrl} alt="Pokémon {name}" />
      <p>Id : {id}</p>
      <p>Poids : {weight} kg</p>
      <p>Taille : {height} cm</p>
    </div>
  )
}

interface Props {
  name: string
  id: number
  weight: number
  height: number
}
