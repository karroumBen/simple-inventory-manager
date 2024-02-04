import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from "../../pages/Home";
import axios from 'axios';
import '../../config/axios';

jest.mock("axios");

const MockHome = () => {
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  )
}

describe("Home", () => {

  beforeEach(() => {
    // console.log("RUNS BEFORE EACH TEST")
    const mockResponse = {
      data: {
        "success": true,
        "data": [
          {
            "name": "iphone 1",
            "price": 100,
            "id": "79ddd908-7ce1-4384-b9cc-8667ef09d045"
          }
        ]
      }      
    }
    axios.get.mockResolvedValueOnce(mockResponse);
  })

  // beforeAll(() => {
  //     console.log("RUNS ONCE BEFORE ALL TESTS")
  // })

  // afterEach(() => {
  //     console.log("RUNS AFTER EACH TEST")
  // })

  // afterAll(() => {
  //     console.log("RUNS ONCE AFTER ALL TESTS")
  // })

  it('should fetch and render list', async () => {
    render(
      <MockHome />
    );
    const id = await screen.findByText(`79ddd908-7ce1-4384-b9cc-8667ef09d045`)
    expect(id).toBeInTheDocument();
  });

  it('should be able to click Add New Product', async () => {
    render(
      <MockHome />
    );
    const addProductBtn = screen.getByRole("button", {name: /Add New Product/i})
    fireEvent.click(addProductBtn);

  });

})