import { createContext, useContext, type Dispatch, type SetStateAction } from "react";

export interface SearchQueryContextType {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

export const SearchQueryContext = createContext<SearchQueryContextType>({
  searchQuery: '',
  setSearchQuery: () => {}
});

export const useSearchQueryContext = () => {
  const context = useContext(SearchQueryContext);
  if (context === undefined) {
    throw new Error('useSearchQueryContext must be used with a SearchQueryContextProvider');
  }

  return context;
};
