import { useState } from "react";

const useHttp = (callbackfn) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-udemy-task-tracker-default-rtdb.firebaseio.com/tasks.json"
      );

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      callbackfn(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };

  return [isLoading, error, sendRequest];
};

export default useHttp;
