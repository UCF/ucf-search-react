import { useEffect, useState } from 'react'
import './App.scss'
import Footer from './components/Footer'
import HeaderMenu from './components/HeaderMenu'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import { SearchQueryContextProvider } from './SearchContextProvider'

const SEARCH_ENGINE_ID = import.meta.env.VITE_SEARCH_ENGINE_ID;

function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://cse.google.com/cse.js?cx=${SEARCH_ENGINE_ID}`;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <HeaderMenu />
      <main>
        <SearchQueryContextProvider>
          <SearchBar />
          <SearchResults />
        </SearchQueryContextProvider>
      </main>
      <Footer />
    </>
  )
}

export default App
