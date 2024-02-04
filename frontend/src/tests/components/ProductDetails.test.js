import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductDetails from "../../components/ProductDetails";

const product =
{
  "name": "iphone 1",
  "price": 100,
  "id": "79ddd908-7ce1-4384-b9cc-8667ef09d045"
}

const MockProductDetails = () => {
  return (
    <BrowserRouter>
      <ProductDetails product={product} />
    </BrowserRouter>
  )
}

describe("ProductDetails", () => {

  it('should render product details', async () => {
    render(
      <MockProductDetails />
    );
    const id = await screen.findByText(`79ddd908-7ce1-4384-b9cc-8667ef09d045`)
    expect(id).toBeInTheDocument();

    const name = await screen.findByText(`iphone 1`)
    expect(name).toBeInTheDocument();

    const price = await screen.findByText(`100`)
    expect(price).toBeInTheDocument();
  });

})