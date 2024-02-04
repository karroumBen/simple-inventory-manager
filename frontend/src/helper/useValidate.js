import { useState } from "react";

function useValidate() {
  const [error, setError] = useState();

  function validate(product) {
    
    if (product.name === "" ||
        product.price === "" ||
        product.origin === "" ||
        product.instock === ""
      ) {
      setError("All fields are required");
      return false;
    }

    // check if price is number
    if (!isNumber(product.price)) {
      setError("Price should be number");
      return false;
    }
    return true;
  }

  return [error, setError, validate];
}

function isNumber(value) {
  const pattern = /^\d+([.]\d+)*$/;
  return pattern.test(value);
}

export { useValidate }

