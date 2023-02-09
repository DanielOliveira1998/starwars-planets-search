import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import userEvent from '@testing-library/user-event';

export const DataPlanets = createContext();

function DataProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [planets, setPlanets] = useState([]);
  const [filtersList, setFiltersList] = useState([]);
  const [search, setSearch] = useState('');
  const [column, setColumn] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [numberValue, setNumberValue] = useState(null);
  const [tableContent, setTableContent] = useState([]);

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

  const handleSearch = ({ target }) => {
    setSearch(target.value);
  };

  const handleColumn = ({ target }) => {
    setColumn(target.value);
  };

  const handleOperator = ({ target }) => {
    setOperator(target.value);
  };

  const handleNumberValue = ({ target }) => {
    setNumberValue(target.value);
  };

  useEffect(() => {
    fetchDataAndSetState();
  }, []);

  useEffect(() => {
    setFiltersList([...filtersList, {
      search,
      column,
      operator,
      numberValue,
    }]);
  }, [search, column, operator, numberValue]);

  useEffect(() => {
    const filters = planets
      .filter((planet) => planet.name.includes(search));
    setTableContent(filters);
  }, [filtersList]);

  return (
    <DataPlanets.Provider
      value={ { planets,
        isLoading,
        search,
        handleSearch,
        tableContent } }
    >
      {children}
    </DataPlanets.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default DataProvider;
