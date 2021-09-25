import { render, screen } from "@testing-library/react";
import Movie from "./Movie";

describe("Movie component", () => {
  test("renders movies if request succeeds", async () => {
    const fakeMovies = [
      {
        id: "fake-id",
        title: "fake-title",
        openingText: "fake-opening-text",
        releaseDate: "fake-release-date",
        producer: "fake-producer",
      },
    ];

    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => fakeMovies,
    });

    render(<Movie />);

    const listItemElements = await screen.findAllByRole("listitem");
    expect(listItemElements).not.toHaveLength(0);
  });
});
