import { renderHook } from "@testing-library/react";
import { useValidate } from "../../helper/useValidate";

const { result } = renderHook(() => useValidate());
const [error, setError, validate] = result.current;

describe("validate product", () => {

  it("Required fields with empty name", () => {

    const product = {
      name: '',
      price: '10',
      origin: 'a',
      instock: true
    }
    expect(validate(product)).toBe(false);
  })

  test("Required fields with empty price", () => {
    const product = {
      name: 'a',
      price: '',
      origin: 'a',
      instock: true
    }
    expect(validate(product)).toBe(false);
  })

  test("Required fields with empty origin", () => {
    const product = {
      name: 'a',
      price: '10',
      origin: '',
      instock: true
    }
    expect(validate(product)).toBe(false);
  })

  test("Required fields with empty instock", () => {
    const product = {
      name: 'a',
      price: '10',
      origin: 'b',
      instock: ''
    }
    expect(validate(product)).toBe(false);
  })

  test("validate invalid price", () => {
    const product = {
      name: 'a',
      price: 'b',
      origin: 'c',
      instock: true
    }
    expect(validate(product)).toBe(false);
  })

  test("validate invalid price", () => {
    const product = {
      name: 'a',
      price: '10.5o',
      origin: 'c',
      instock: true
    }
    expect(validate(product)).toBe(false);
  })

  test("validate valid price", () => {
    const product = {
      name: 'a',
      price: '10',
      origin: 'c',
      instock: true
    }
    expect(validate(product)).toBe(true);
  })

  test("validate valid price", () => {
    const product = {
      name: 'a',
      price: '10.5',
      origin: 'c',
      instock: true
    }
    expect(validate(product)).toBe(true);
  })

})
