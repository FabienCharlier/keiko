import { render, screen } from "@testing-library/react"
import { Home } from "./index"
import { rest } from "msw"
import { setupServer } from "msw/node"

const server = setupServer(
  rest.get("http://localhost:8000/pokemons", (req: any, res: any, ctx: any) => {
    // Respond with a mocked user token that gets persisted
    // in the `sessionStorage` by the `Login` component.
    return res(
      ctx.json([
        { id: 1, name: "bulbasaur", height: 7, weight: 69 },
        { id: 2, name: "ivysaur", height: 10, weight: 130 },
      ]),
    )
  }),
)

describe("<Home />", () => {
  // Enable API mocking before tests.
  beforeAll(() => server.listen())

  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => server.resetHandlers())

  // Disable API mocking after the tests are done.
  afterAll(() => server.close())

  it("should display bulbasaur", async () => {
    render(<Home />)
    const pokemonName = await screen.findByText("bulbasaur")
    const pokemonWeight = await screen.findByText("Poids : 69 kg")
    const pokemonHeight = await screen.findByText("Taille : 7 cm")
    expect(pokemonName).toBeInTheDocument()
    expect(pokemonWeight).toBeInTheDocument()
    expect(pokemonHeight).toBeInTheDocument()
  })

  it("should display ivysaur", async () => {
    render(<Home />)
    const pokemonName = await screen.findByText("ivysaur")
    const pokemonWeight = await screen.findByText("Poids : 130 kg")
    const pokemonHeight = await screen.findByText("Taille : 10 cm")
    expect(pokemonName).toBeInTheDocument()
    expect(pokemonWeight).toBeInTheDocument()
    expect(pokemonHeight).toBeInTheDocument()
  })
})
