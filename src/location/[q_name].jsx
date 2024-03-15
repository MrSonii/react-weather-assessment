import React from 'react';
import { useParams } from "react-router-dom";

import { getWeatherByCoOrds } from '../services/location';
import "./detail.css";
import { PIN } from '../lib/config';

function Details() {
  const { q_name } = useParams();
  const [ coOrds, setCordinates ] = React.useState(undefined);
  const [ weatherDetails, setWeaterDetails ] = React.useState(null);
  const [ loading, setLoading ] = React.useState(false);
  
  React.useEffect(() => {
      const querySplit = q_name.split(",");
  
      setCordinates([querySplit[0], querySplit[1]]);
  }, []);

  React.useEffect(() => {
    coOrds && handleWeather();
  }, [coOrds]);

  const handleWeather = async () => {
    setLoading(true);
    await getWeatherByCoOrds(coOrds).then(resp => {
      if ( resp.status === 200 ) {
        setWeaterDetails(resp?.data);
        setLoading(false);
      } else {
        setWeaterDetails(null);
        setLoading(false);
      }
    }).catch(err => {
      setLoading(false);
      alert(err.message);
    });  
  };
  return (
    <div className='detail-container'>
      {!!weatherDetails && !loading ? <>
        <header className='header-details'>
          <div>
            <img src={PIN} alt="Pin icon" className='margin-bottom-s' height={100} width={100} />
            <p>{`${weatherDetails.city_name}, ${weatherDetails.country_code}`}</p>
            {/* <p>{`${weatherDetails.data.city_name}, ${weatherDetails.data.country_code}`}</p> */}
          </div>
        </header>
        <main className='main-container'>

        </main>
        <footer className='footer-container'>
          <div className='footer-tab-container'>
            <div>WEATHER</div>
            <div>NEWS & EVENTS</div>
            <div>GALLERY</div>
          </div>
          <div className='footer-body'>
            <div className='first-day'>
              <div>
                <div className='font-xxl'>{weatherDetails?.data?.[0]?.temp}&deg;</div>
                <div className='font-xl'>{weatherDetails?.data?.[0]?.datetime}</div>
              </div>
              <div>
                <div className='font-xl' style={{paddingTop: "5vh"}}>{weatherDetails?.data?.[0]?.weather?.description}</div>
                <div className='font-xl'>{weatherDetails?.data?.[0]?.wind_spd} &nbsp; / &nbsp; {weatherDetails?.data?.[0]?.min_temp}</div>
              </div>
            </div>
            {weatherDetails?.data?.length && weatherDetails.data.slice(1, 7).map(wthr => (
              <div className='other-days'>
                <div>{wthr?.datetime}</div>
                <div>{wthr?.weather?.description}</div>
                <div>{wthr?.min_temp}</div>
              </div>
            ))}
          </div>
        </footer>
      </> : <div className='loading-cont'>...Loading</div>
      }
    </div>
  )
}

export default Details;