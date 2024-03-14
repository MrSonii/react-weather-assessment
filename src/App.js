import React from 'react';
import { useNavigate } from 'react-router-dom';

import './App.css';
import { getCordinateByPlaceName } from './services/location';

function App() {
  const [search_q, setQuery] = React.useState("");
  const [ placelist, setList ] = React.useState([]);
  const [ placeSelected, setPlaceSelected ] = React.useState(null);
  const [ loading, setLoading ] = React.useState(false);

  const navigate = useNavigate();

  const handleQuerySearch = async e => {
    setQuery(e.target.value);
    setLoading(true);
    if(e.target.value) {
      const resp = await getCordinateByPlaceName(e.target.value);
      //using if and else instead of then catch or try catch finally, because its a simple outcome, but in other scenarios we can easily convert it.
      if(resp.status === 200){
        setList(resp.data);
        setLoading(false);
      } else {
        setList([]);
        setLoading(false);
      }
    };
  }

  const handleListSelection = sugg => () => {
    setPlaceSelected(sugg);
    setList([]);
    setQuery("");
  };

  const handleNavigate = () => {
    navigate(`/location/${placeSelected.lat},${placeSelected.lon}`);
  };

  return (
    <div className='container'>
      <header className='header'>
        <h1 className='heading'>Weather Forecast</h1>
      </header>
      <main className='main'>
        <form onSubmit={handleNavigate}>
          <div>
            <span className='search-cont'>
              <input type='text' className='search-input' placeholder='Enter a City' onChange={handleQuerySearch} value={!!placeSelected && !!Object.keys(placeSelected).length ? placeSelected.name + ", " + placeSelected.state + ", " + placeSelected.country : search_q}/>
              {!!search_q && <ul className='search-list'>
                {!!placelist.length ? 
                <>
                  <li>Select a suggestion</li>
                  {
                    placelist.map(sugg => <li onClick={handleListSelection(sugg)} key={sugg.lat + " " + sugg.lon} >{sugg.name}, {sugg.state}, {sugg.country}</li>)
                  }
                </>
                : !loading ? <li className='no-results'>No Results Found</li> : <li className='no-results'>...Loading</li>}
              </ul>}
            </span>
          </div>
          <button type='submit' className='submit-btn' onClick={handleNavigate} disabled={!placeSelected} > Get Weather </button>
        </form>
      </main>
    </div>
  );
}

export default App;
