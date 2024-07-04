import { useRef } from "react";

export const useDebounce = (time = 200) => {
  const timer = useRef(null);

  if (time.current !== null) {
    clearInterval(timer.current);
  }

  const debounce = (cb) => {
    time.current = setTimeout(() => {
      cb();
    }, time);
  };

  return debounce;
};
