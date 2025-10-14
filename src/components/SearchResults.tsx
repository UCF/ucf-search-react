import { useContext } from 'react';
import './SearchResults.scss'
import { SearchQueryContext } from '../SearchContext';

function SearchResults() {
  const { searchQuery, setSearchQuery } = useContext(SearchQueryContext);

  return (
    <div className="container results-container mt-3 mb-5">
      {searchQuery}
      <div className="row">
        <div className="col-lg-8 mb-5">
          <article>
            <div className='gcse-searchresults-only' data-gname="main-search"></div>
          </article>
        </div>
      </div>
    </div>
  )
}

export default SearchResults
