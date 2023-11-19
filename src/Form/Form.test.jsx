import { render, screen } from "@testing-library/react";
import Form from "./Form";

jest.mock("axios");

describe("Form component", () => {
  test("renders Form component correctly", () => {
    render(<Form />);
    expect(
      screen.getByRole("heading", {
        name: /new property classified/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/title/i)).toBeInTheDocument();
    expect(screen.getByText(/select type/i)).toBeInTheDocument();
    expect(
      screen.getByText(/type in the property's area/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/price \(in euros\)/i)).toBeInTheDocument();
    expect(screen.getByText(/extra description/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /submit/i,
      }),
    ).toBeInTheDocument();
  });
});
