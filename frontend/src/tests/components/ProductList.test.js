import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductList from "../../components/ProductList";

const products = [
  {
    "name": "iphone 1",
    "price": 100,
    "id": "79ddd908-7ce1-4384-b9cc-8667ef09d045"
  }
]
const MockProductList = () => {
  return (
    <BrowserRouter>
      <ProductList products={products} />
    </BrowserRouter>
  )
}

describe("ProductList", () => {

  it('should render list', async () => {
    render(
      <MockProductList />
    );
    const id = await screen.findByText(`79ddd908-7ce1-4384-b9cc-8667ef09d045`)
    expect(id).toBeInTheDocument();

    const name = await screen.findByText(`iphone 1`)
    expect(name).toBeInTheDocument();

    const price = await screen.findByText(`100`)
    expect(price).toBeInTheDocument();
  });

})