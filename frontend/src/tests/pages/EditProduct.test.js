import { render, screen } from "@testing-library/react";
import EditProduct from '../../pages/EditProduct';
import { MemoryRouter } from 'react-router-dom';

describe("Edit Product", () => {

  it("should render layout", async () => {
    render(
      // mock useLocation
      <MemoryRouter initialEntries={[
        {
          pathname: '/product/edit',
          state: {
            id: 'id1',
            name: 'iPhone',
            price: 100,
            origin: 'US',
            instock: true
          }
        }
      ]}>
        <EditProduct />
      </MemoryRouter>
    );

    const title = await screen.findByText("Edit Product");
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

  it("should populate fields", () => {
    render(
      // mock useLocation
      <MemoryRouter initialEntries={[
        {
          pathname: '/product/edit',
          state: {
            id: 'id1',
            name: 'iPhone',
            price: 100,
            origin: 'US',
            instock: true
          }
        }
      ]}>
        <EditProduct />
      </MemoryRouter>
    );

    expect(screen.getByDisplayValue("id1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("iPhone")).toBeInTheDocument();
    expect(screen.getByDisplayValue(100)).toBeInTheDocument();
    expect(screen.getByDisplayValue("US")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Yes")).toBeInTheDocument();

  })

})