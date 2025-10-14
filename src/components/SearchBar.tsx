import './SearchBar.scss'

import { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchQueryContext } from '../SearchContext';

function SearchBar() {
  
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchQuery, setSearchQuery } = useContext(SearchQueryContext);

  useEffect(() => {
    const query = searchParams.get('q') ?? null;
    if (query) setSearchQuery(query);
  }, []);

  window.__gcse = {
    callback: () => {
      const el = document.getElementById('gsc-i-id1') || null;
      if (el) {
        el.addEventListener('keyup', (e: KeyboardEvent<HTMLInputElement>) => {
          setSearchQuery(e.target.value);
          setSearchParams({
            q: e.target.value
          });
        });
      }
    }
  }

  return (
    <div className='bg-faded py-5'>
      <div className='container'>
        <div className='row align-items-lg-center'>
          <div className='col-lg-4 col-xl-3'>
            <h1 className='h2 text-uppercase mb-3 mb-lg-0'>Search UCF</h1>
          </div>
          <div className='col-lg-8 col-xl-9'>
            <div className='gcse-searchbox' data-gname='main-search'>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
