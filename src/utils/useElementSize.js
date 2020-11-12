import { useState, useEffect } from "react";

const useElementSize = (element) => {
  const [size, setSize] = useState([320, 300]);

  const resizeHandler = () => {
    if (!element) return;

    setSize([element.clientWidth, element.clientHeight]);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    resizeHandler();
    return () => window.removeEventListener("resize", resizeHandler);
  }, [element]);

  return size;
};

export default useElementSize;
