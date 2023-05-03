import { render, screen } from "@testing-library/react"
import { Home } from "./index"

describe("<Home />", () => {
  it("should display Carapuce", () => {
    render(<Home />)
    const carapuce = screen.getByText("Nom : Carapuce")
    expect(carapuce).toBeInTheDocument()
  })

  it("should display Carabaffe", () => {
    render(<Home />)
    const carapuce = screen.getByText("Nom : Carabaffe")
    expect(carapuce).toBeInTheDocument()
  })

  it("should display Tortank", () => {
    render(<Home />)
    const carapuce = screen.getByText("Nom : Tortank")
    expect(carapuce).toBeInTheDocument()
  })
})
