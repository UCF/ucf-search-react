import { useEffect, useState } from 'react';
import './Spotlight.scss'
import type { SpotlightData } from '../typings/SpotlightData';

const MYUCF_API_URL = import.meta.env.VITE_MYUCF_API_URL;

function Spotlight() {
  const [myucfSettings, setMyUCFSettings] = useState<SpotlightData>();

  useEffect( () => {
    let isMounted = true;

    const fetchData = async () => {
    
      const response = await fetch(MYUCF_API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const result: SpotlightData = await response.json();
      if (isMounted) {
        setMyUCFSettings(result);
      }
    };
    
    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className='spotlight mt-4'>
      {myucfSettings ? (
        <>
          <a href={myucfSettings.sidebarSpotlight.url} target="_blank">
            <img
              src={myucfSettings.sidebarSpotlight.image}
              alt={myucfSettings.sidebarSpotlight.alt}
              className='img-fluid' />
          </a>
        </>
      ) : <></> }
    </div>
  )
}

export default Spotlight
