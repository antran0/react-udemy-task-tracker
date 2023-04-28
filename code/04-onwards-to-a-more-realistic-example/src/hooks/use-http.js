import { useState, useCallback } from "react";

const useHttp = (requestConfig, callbackfn) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method || "GET",
        headers: requestConfig.headers || {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      callbackfn(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, [requestConfig, callbackfn]);

  // same as:
  //   return { isLoading: isLoading, error: error, sendRequest: sendRequest };
  return { isLoading, error, sendRequest };
};

export default useHttp;
