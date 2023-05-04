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

  it("should display bulbasaur and ivysaur", async () => {
    render(<Home />)
    const bulbasaurName = await screen.findByText("bulbasaur")
    const bulbasaurWeight = await screen.findByText("Poids : 6.9 kg")
    const bulbasaurHeight = await screen.findByText("Taille : 70 cm")
    expect(bulbasaurName).toBeInTheDocument()
    expect(bulbasaurWeight).toBeInTheDocument()
    expect(bulbasaurHeight).toBeInTheDocument()
    const ivysaurName = await screen.findByText("ivysaur")
    const ivysaurWeight = await screen.findByText("Poids : 13 kg")
    const ivysaurHeight = await screen.findByText("Taille : 100 cm")
    expect(ivysaurName).toBeInTheDocument()
    expect(ivysaurWeight).toBeInTheDocument()
    expect(ivysaurHeight).toBeInTheDocument()
  })
})
