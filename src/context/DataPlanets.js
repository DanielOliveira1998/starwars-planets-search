import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const DataPlanets = createContext();

function DataProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [planets, setPlanets] = useState([]);
  const [filtersList, setFiltersList] = useState([]);
  const [combinationFilter, setCombinationFilter] = useState([]);
  const [search, setSearch] = useState('');
  const [column, setColumn] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [numberValue, setNumberValue] = useState('0');
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

  const combinedFilterFunc = (curr, key) => {
    if (curr.operator === 'maior que') {
      return (combinationFilter.length === 0
        ? planets.filter((planet) => Number(planet[key]) > Number(curr.numberValue)
      && planet[key] !== 'unknown')
        : combinationFilter.filter(
          (planet) => Number(planet[key]) > Number(curr.numberValue)
      && planet[key] !== 'unknown',
        ));
    }
    if (curr.operator === 'menor que') {
      return (combinationFilter.length === 0
        ? planets.filter((planet) => Number(planet[key]) < Number(curr.numberValue)
      && planet[key] !== 'unknown')
        : combinationFilter.filter(
          (planet) => Number(planet[key]) < Number(curr.numberValue)
      && planet[key] !== 'unknown',
        ));
    }
    if (curr.operator === 'igual a') {
      return (combinationFilter.length === 0
        ? planets.filter((planet) => Number(planet[key]) === Number(curr.numberValue)
      && planet[key] !== 'unknown')
        : combinationFilter.filter(
          (planet) => Number(planet[key]) === Number(curr.numberValue)
      && planet[key] !== 'unknown',
        ));
    }
  };

  useEffect(() => {
    const filter = filtersList.reduce((acc, curr) => [
      // ...acc,
      ...combinedFilterFunc(curr, curr.column),
    ], []);
    setCombinationFilter(filter);
  }, [filtersList]);

  useEffect(() => {
    if (combinationFilter.length > 0) {
      const filter = combinationFilter
        .filter((planet) => planet.name.includes(search));
      setTableContent(filter);
    }
    if (combinationFilter.length === 0) {
      const filter1 = planets
        .filter((planet) => planet.name.includes(search));
      setTableContent(filter1);
    }
  }, [search, combinationFilter]);

  return (
    <DataPlanets.Provider
      value={ { planets,
        isLoading,
        search,
        handleSearch,
        tableContent,
        handleColumn,
        handleNumberValue,
        handleOperator,
        setFiltersList,
        filtersList,
        column,
        operator,
        numberValue,
        combinationFilter,
      } }
    >
      {children}
    </DataPlanets.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default DataProvider;
