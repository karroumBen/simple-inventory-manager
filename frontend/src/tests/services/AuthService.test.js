import axios from 'axios';
import { waitFor } from "@testing-library/react";
import AuthService from '../../services/AuthService';

jest.mock("axios");

describe("AuthService", () => {

  it("should run", async () => {
    const mockResponse = {
      data: {
        "success": false,
        "error": "Wrong email"
      }
    }
    axios.post.mockResolvedValueOnce(mockResponse);

    const email = "test@miu.edu";
    const password = "123";

    const res = await AuthService.login(email, password);
    expect(res).toEqual(mockResponse.data);

  })
})