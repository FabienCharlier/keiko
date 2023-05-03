export const Pokemon = ({ name, id }: Props) => {
  const imageUrl: string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png"
  return (
    <div>
      <img src={imageUrl} alt="Pokémon {name}" />
      <p>Nom : {name}</p>
      <p>Id : {id}</p>
    </div>
  )
}

interface Props {
  name: string
  id: number
}
