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

  const combinedFilterFunc = (acc, curr) => {
    if (curr.operator === 'maior que') {
      return (acc.filter(
        (planet) => Number(planet[curr.column]) > Number(curr.numberValue)
      && planet[curr.column] !== 'unknown',
      )
      );
    }
    if (curr.operator === 'menor que') {
      return (acc.filter(
        (planet) => Number(planet[curr.column]) < Number(curr.numberValue)
      && planet[curr.column] !== 'unknown',
      )
      );
    }
    if (curr.operator === 'igual a') {
      return (acc.filter(
        (planet) => Number(planet[curr.column]) === Number(curr.numberValue)
      && planet[curr.column] !== 'unknown',
      )
      );
    }
  };

  useEffect(() => {
    const filter = filtersList.reduce((acc, curr) => [
      // ...acc,
      ...combinedFilterFunc(acc, curr),
    ], planets);
    setCombinationFilter(filter);
  }, [filtersList]);

  useEffect(() => {
    console.log('entrou');
    if (combinationFilter.length > 0) {
      const filter = combinationFilter
        .filter((planet) => planet.name.includes(search));
      setTableContent(filter);
      console.log('filtra combinationFilter');
    }
    if (combinationFilter.length === 0) {
      const filter1 = planets
        .filter((planet) => planet.name.includes(search));
      setTableContent(filter1);
      console.log('filtra planets');
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
        setColumn,
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
