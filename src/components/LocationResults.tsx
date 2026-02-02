import { useContext, useEffect, useState } from 'react';
import './LocationResults.scss'
import { SearchQueryContext } from '../SearchContext';
import type { LocationResultSet } from '../types/LocationTypes';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { byPrefixAndName } from '@awesome.me/kit-850d323291/icons';

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
      {typeof locationResults !== 'undefined' ? (
        <div className="results">
          {locationResults.results.locations.length > 0 && locationResults.results.locations.map((loc) => {
            return (
              <div key={loc.name}>
                <h2 className='location-result-heading'>
                  <FontAwesomeIcon icon={byPrefixAndName.fas['map-location-dot']} className='fa-fw' /> Locations
                </h2>
                <div className='sidebar-result'>
                  <h3 className='location-heading'>{loc.name}</h3>
                  <div className='media pt-1'>
                    <div className='media-body'>
                      <a className='mb-2 d-block' href={loc.profile_link} target="_blank">
                        <FontAwesomeIcon icon={byPrefixAndName.fas['circle-info']} className='fa-fw mr-1' /> More Information
                      </a>
                      <a className='mb-2 d-block' href={`https://www.google.com/maps/dir/Current+Location/${loc.googlemap_point}`} target='_blank'>
                        <FontAwesomeIcon icon={byPrefixAndName.fas['location-arrow']} className='fa-fw mr-1' /> Directions
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ): ( <p>No Results for "{searchQuery}". </p>)}
    </div>
  )
}

export default LocationResults
