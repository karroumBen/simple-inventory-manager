import React from "react";
import { render, screen } from "@testing-library/react";
import DisplayMessage from "../../components/DisplayMessage";

test("display message", () => {
  render(<DisplayMessage type="error" message="Invalid email" />);

  const divElement = screen.getByText("Invalid email");
  expect(divElement).toBeInTheDocument();
  expect(divElement).toHaveClass("error");

});
