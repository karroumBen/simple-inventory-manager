import { render, screen } from "@testing-library/react";
import Header from '../../components/Header';
import { BrowserRouter } from "react-router-dom";

const MockHeader = () => {
  return (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  )
}

describe("Header", () => {
  it("should render layout", async () => {
    render(<MockHeader />);

    const appName = await screen.findByText("Inventory Management");
    expect(appName).toBeInTheDocument();

    const logout = await screen.findByRole("button", {name: "Logout"});
    expect(logout).toBeInTheDocument();
  })
})