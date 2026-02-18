import { useContext, useEffect, useState } from 'react';
import './LocationResults.scss'
import { SearchQueryContext } from '../SearchContext';
import type { LocationResultSet } from '../types/LocationTypes';

const MAP_SEARCH_URL = import.meta.env.VITE_MAP_SEARCH_URL;

function LocationResults() {
  const { searchQuery } = useContext(SearchQueryContext);
  const [locationResults, setLocationResults] = useState<LocationResultSet>();

  useEffect( () => {
    let isMounted = true;

    const fetchData = async () => {
      const data = new URLSearchParams({
        q: searchQuery,
        extended: 'true',
        type: 'buildings'
      });

      const response = await fetch(`${MAP_SEARCH_URL}?${data.toString()}`);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const result: LocationResultSet = await response.json();
      if (isMounted) {
        setLocationResults(result);
      }
    };
    
    fetchData();

    return () => {
      isMounted = false;
    };
  }, [searchQuery]);

  return (
    <div className='location-results'>
      {typeof locationResults !== 'undefined' && (
        <div className="results">
          {locationResults.results.locations.length > 0 && locationResults.results.locations.map((loc) => {
            return (
              <div key={loc.name}>
                <h2 className='location-result-heading'>
                  <i className='fa-solid fa-map-location-dot fa-fw' aria-hidden="true"></i> Locations
                </h2>
                <div className='sidebar-result'>
                  <h3 className='location-heading'>{loc.name}</h3>
                  <div className='media pt-1'>
                    <div className='media-body'>
                      <a className='mb-2 d-block' href={loc.profile_link} target="_blank" rel="noopener noreferrer">
                        <i className='fa-solid fa-circle-info fa-fw mr-1' aria-hidden="true"></i> More Information
                      </a>
                      <a className='mb-2 d-block' href={`https://www.google.com/maps/dir/Current+Location/${loc.googlemap_point}`} target='_blank' rel="noopener noreferrer">
                        <i className='fa-solid fa-location-arrow fa-fw mr-1' aria-hidden="true"></i> Directions
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default LocationResults
