import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NewProduct from '../../pages/NewProduct';
import { BrowserRouter } from "react-router-dom";
import axios from 'axios';

jest.mock("axios");
const MockNewProduct = () => {
  return (
    <BrowserRouter>
      <NewProduct/>
    </BrowserRouter>
  )
}

describe("New Product", () => {

  it("should render layout", async () => {
    render(<MockNewProduct/>);

    const title = await screen.findByText("Add New Product");
    expect(title).toBeInTheDocument();

    const name = await screen.findByText("Name");
    expect(name).toBeInTheDocument();

    const price = await screen.findByText("Price");
    expect(price).toBeInTheDocument();

    const origin = await screen.findByText("Origin");
    expect(origin).toBeInTheDocument();

    const instock = await screen.findByText("In Stock");
    expect(instock).toBeInTheDocument();

  })

  it("should validate required fields", () => {
    render(<MockNewProduct/>);

    const addBtn = screen.getByRole("button", {name: /Add/i});
    fireEvent.click(addBtn);
    expect(screen.getByText("All fields are required")).toBeInTheDocument();

  })

  it("should validate price", () => {
    render(<MockNewProduct/>);

    const nameInput = screen.getByLabelText("name");
    const priceInput = screen.getByLabelText("price");
    const originInput = screen.getByLabelText("origin");

    fireEvent.change(nameInput, { target: { value: "test" } });
    fireEvent.change(priceInput, { target: { value: "12.1a" } });
    fireEvent.change(originInput, { target: { value: "US" } });

    const addBtn = screen.getByRole("button", {name: /Add/i});

    fireEvent.click(addBtn);
    expect(screen.getByText("Price should be number")).toBeInTheDocument();

  })

  it("should submit form and call API", async () => {
    const mockResponse = {
      data: {
        "success": true
      }
    }

    render(<MockNewProduct/>);

    const nameInput = screen.getByLabelText("name");
    const priceInput = screen.getByLabelText("price");
    const originInput = screen.getByLabelText("origin");

    fireEvent.change(nameInput, { target: { value: "test" } });
    fireEvent.change(priceInput, { target: { value: "12.1" } });
    fireEvent.change(originInput, { target: { value: "US" } });

    const addBtn = screen.getByRole("button", {name: /Add/i});

    fireEvent.click(addBtn);
    // Wait for Axios POST request to resolve
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/products', 
        { name: "test", 
          price: "12.1", 
          origin: "US", 
          instock: true 
        });
    });

  })

})