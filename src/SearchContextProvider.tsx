import React, { useState } from "react";
import { SearchQueryContext, type SearchQueryContextType } from "./SearchContext";

interface SearchQueryContextProviderProps {
  children: React.ReactNode;
}

export const SearchQueryContextProvider: React.FC<SearchQueryContextProviderProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const contextValue: SearchQueryContextType = {
    searchQuery,
    setSearchQuery,
  };

  return (
    <SearchQueryContext.Provider value={contextValue}>
      {children}
    </SearchQueryContext.Provider>
  );
};
