import './SearchBar.scss'

import { useContext, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchQueryContext } from '../SearchContext';

function SearchBar() {
  
  const [searchParams, setSearchParams] = useSearchParams();
  const { setSearchQuery } = useContext(SearchQueryContext);
  const debounceTimerRef = useRef<number | null>(null);

  let searchElement: any = null;

  useEffect(() => {
    const query = searchParams.get('q') ?? null;
    if (query !== null) setSearchQuery(query);
  }, []);

  window.__gcse = {
    callback: () => {
      const element = document.getElementById('gsc-i-id1') as HTMLInputElement || null;
      let cseElementApi = null;

      if (!searchElement) {
        try {
          cseElementApi = (window as any).google?.search?.cse?.element;
          if (cseElementApi && typeof cseElementApi.getElement === 'function') {
            searchElement = cseElementApi.getElement('main-search');
          }
        } catch (e) {
          // ignore
        }
      }

      const onKeyUp = () => {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
        
        debounceTimerRef.current = setTimeout(() => {
          if (element.value === "") {
            searchElement.clearAllResults();
            setSearchParams({});
          } else {
            setSearchParams({
              q: element.value
            });
          }

          setSearchQuery(element.value);

          searchElement.execute();

        }, 250);
      };

      if (element) {
        element.addEventListener('keyup', onKeyUp);
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
