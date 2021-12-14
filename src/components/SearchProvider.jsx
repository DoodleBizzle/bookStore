import { useState, createContext } from "react";

export const searchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchResult, setSearchResult] = useState([]);

  const contextValue = {
    searchResult,
    setSearchResult
  };

  return (
    <>
      <searchContext.Provider value={contextValue}>
        {children}
      </searchContext.Provider>
    </>
  );
};

export default SearchProvider;