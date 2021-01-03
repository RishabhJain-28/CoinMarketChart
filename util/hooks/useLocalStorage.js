import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    console.log("fetching value");
    // return initialValue;
    //   return false;
    // }
    // const l = typeof window === "undefined" ? {} : window;
    // useEffect(() => {
    if (typeof window !== "undefined") {
      // useEffect(() => {
      try {
        // if (windowlocalStorage) return initialValue;
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.log(error);
        return initialValue;
      }
      // }, [window]);
    } else return initialValue;
    // }, []);
  });
  // }, [window]);

  const setValue = (value) => {
    console.log("storedValue", storedValue);
    if (typeof window === "undefined") return setStoredValue(value);
    console.log("a");
    try {
      console.log("b");
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      console.log("c");
      setStoredValue(valueToStore);
      console.log("d");

      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
  // return [storedValue, setStoredValue];
}
