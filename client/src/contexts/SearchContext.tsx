import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

type SearchHandler = (value: string) => void;

type SearchContextValue = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  registerSearchHandler: (handler: SearchHandler) => void;
  unregisterSearchHandler: (handler: SearchHandler) => void;
};

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTermState] = useState("");
  const handlers = useRef<Set<SearchHandler>>(new Set());

  const registerSearchHandler = useCallback((handler: SearchHandler) => {
    handlers.current.add(handler);
  }, []);

  const unregisterSearchHandler = useCallback((handler: SearchHandler) => {
    handlers.current.delete(handler);
  }, []);

  const setSearchTerm = useCallback((term: string) => {
    setSearchTermState(term);
    handlers.current.forEach((handler) => handler(term));
  }, []);

  const value = useMemo(
    () => ({ searchTerm, setSearchTerm, registerSearchHandler, unregisterSearchHandler }),
    [searchTerm, setSearchTerm, registerSearchHandler, unregisterSearchHandler],
  );

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }

  return context;
};
