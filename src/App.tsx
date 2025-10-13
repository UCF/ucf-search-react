import './App.scss'
import Footer from './components/Footer'
import HeaderMenu from './components/HeaderMenu'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'

function App() {
  return (
    <>
      <HeaderMenu />
      <main>
        <SearchBar />
        <SearchResults />
      </main>
      <Footer />
    </>
  )
}

export default App
