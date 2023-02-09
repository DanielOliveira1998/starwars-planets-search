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

  const combinedFilterFunc = (acc, curr, key) => {
    if (curr.operator === 'maior que') {
      acc = planets.filter((planet) => planet[key] > curr.numberValue);
    }
    if (curr.operator === 'menor que') {
      acc = planets.filter((planet) => planet[key] < curr.numberValue);
    }
    if (curr.operator === 'igual a') {
      acc = planets.filter((planet) => planet[key] === curr.numberValue);
    }
  };

  useEffect(() => {
    const filter = filtersList.length > 0 && filtersList.reduce((acc, curr) => {
      switch (curr.column) {
      case 'population':
        return combinedFilterFunc(acc, curr, 'population');
      case 'orbital_period':
        return combinedFilterFunc(acc, curr, 'orbital_period');
      case 'diameter':
        return combinedFilterFunc(acc, curr, 'diameter');
      case 'rotation_period':
        return combinedFilterFunc(acc, curr, 'rotation_period');
      case 'surface_water':
        return combinedFilterFunc(acc, curr, 'surface_water');
      default:
        return tableContent;
      }
    });
    setCombinationFilter(filter);
  }, [column, operator, numberValue]);

  useEffect(() => {
    const filters = combinationFilter.length > 0 ? combinationFilter
      .filter((planet) => planet.name.includes(search))
      : planets
        .filter((planet) => planet.name.includes(search));
    setTableContent(filters);
  }, [search]);

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
