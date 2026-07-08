import { useState } from "react";

export function useToggle(defaultValue = false) {
  const [value, setValue] = useState(defaultValue);

  const toggle = () => setValue((prev) => !prev);

  return {
    value,
    toggle,
    setValue,
  };
}
