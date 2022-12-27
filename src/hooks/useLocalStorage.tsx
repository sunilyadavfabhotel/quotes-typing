import { useState } from "react";

const useLocalStorage = (key: string, initialValue: string | number) => {
  // set initial value if don't have value stored in localStorage
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // update value to localStorage
  const setValue = (value: Function) => {
    try {
      // check for value to be Function or(number, string, etc)
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // handle for clearing the localStorage
      if (valueToStore === -1) {
        window.localStorage.clear();
        setStoredValue(initialValue);
        return 0;
      }
      // update value to useState
      setStoredValue(valueToStore);

      // set value to localStorage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setValue];
};

export default useLocalStorage;
