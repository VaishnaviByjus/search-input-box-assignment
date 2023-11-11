import { useState, useEffect } from "react";

const useKeyPress = (targetKey) => {
  const [keyPressed, setKeyPressed] = useState(false);

  function handleKeyDown({ key }) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  function handleKeyUp({ key }) {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Clean up the effect
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
};

export default useKeyPress;
