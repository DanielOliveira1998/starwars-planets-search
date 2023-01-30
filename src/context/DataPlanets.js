import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const DataPlanets = createContext();

function DataProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [planets, setPlanets] = useState([]);

  const fetchDataAndSetState = async () => {
    setIsLoading(true);
    const url = 'https://swapi.dev/api/planets';
    const response = await fetch(url);
    const json = await response.json();
    const data = json.results;
    const planetsData = data.filter((planet) => delete planet.residents);
    setPlanets(planetsData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDataAndSetState();
  }, []);

  return (
    <DataPlanets.Provider value={ { planets, isLoading } }>
      {children}
    </DataPlanets.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default DataProvider;
