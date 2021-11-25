
import React, { useContext, useState } from "react";

const LoadingContext = React.createContext(null);

const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(null);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}    >
      {children}
    </LoadingContext.Provider>
  );
};
const useLoading = () => {
  const loading = useContext(LoadingContext);
  if (loading == null) {
    throw new Error("useLoading() called outside of a DataLoading?");
  }
  return loading;
};

export { LoadingProvider, useLoading };