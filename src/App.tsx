import { useEffect } from 'react'
import './App.scss'
import Footer from './components/Footer'
import HeaderMenu from './components/HeaderMenu'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import { SearchQueryContextProvider } from './SearchContextProvider'
import LocationResults from './components/LocationResults'
import Spotlight from './components/Spotlight'

const SEARCH_ENGINE_ID = import.meta.env.VITE_SEARCH_ENGINE_ID;

function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://cse.google.com/cse.js?cx=${SEARCH_ENGINE_ID}`;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <HeaderMenu />
      <main>
        <SearchQueryContextProvider>
          <SearchBar />
          <div className="container results-container mt-3 mb-5">
            <div className="row">
              <div className="col-lg-8 mb-5">
                <article>
                  <SearchResults />
                </article>
              </div>
              <div className='col-lg-4 mb-5'>
                <aside>
                  <LocationResults />
                  <Spotlight />
                </aside>
              </div>
            </div>
          </div>
        </SearchQueryContextProvider>
      </main>
      <Footer />
    </>
  )
}

export default App
