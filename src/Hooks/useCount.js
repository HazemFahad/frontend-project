import { useState } from "react";

const useCount = () => {
  const [count, setCount] = useState(0);

  const incCount = () => {
    setCount((currCount) => currCount + 1);
  };

  const decCount = () => {
    setCount((currCount) => currCount - 1);
  };

  return { count, setCount, incCount, decCount };
};

export default useCount;
