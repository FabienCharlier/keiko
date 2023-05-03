import { render, screen } from "@testing-library/react"
import { Home } from "./index"

const testPokemonPresenceByName = (name: string) => {
  new Promise(resolve => {
    setTimeout(() => {
      render(<Home />)
      const pokemon = screen.getByText("Nom : " + name)
      expect(pokemon).toBeInTheDocument()
      resolve("Squirtle !!!")
    }, 500)
  })
}

describe("<Home />", () => {
  it("should display squirtle", () => {
    testPokemonPresenceByName("squirtle")
  })

  it("should display Carabaffe", () => {
    testPokemonPresenceByName("wartortle")
  })

  it("should display Tortank", () => {
    testPokemonPresenceByName("blastoise")
  })
})
