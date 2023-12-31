import React, { useContext, useState, useEffect } from 'react';
import { DataPlanets } from '../context/DataPlanets';

export default function Filters() {
  const [columnValue, setColumnValue] = useState([]);
  const [operatorValue, setOperatorValue] = useState([]);
  const [newColumnValue, setNewColumnValue] = useState([]);

  useEffect(() => {
    setColumnValue([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water']);
    setOperatorValue([
      'maior que',
      'menor que',
      'igual a',
    ]);
  }, []);

  const { search, handleSearch, handleColumn, sortPlanets,
    handleNumberValue, handleOperator, setFiltersList, column,
    operator, numberValue, filtersList, setColumn } = useContext(DataPlanets);

  useEffect(() => {
    const filterListValue = filtersList.map((item) => item.column);
    const newColumn = columnValue.filter((a) => !filterListValue.includes(a));
    setNewColumnValue(newColumn);
  }, [filtersList]);

  const filterClick = () => {
    setFiltersList([...filtersList, {
      column,
      operator,
      numberValue,
    }]);
    setColumn(newColumnValue[0]);
  };

  const removeFilter = ({ target }) => {
    const remove = filtersList.filter((item) => item.column !== target.name);
    setFiltersList(remove);
  };

  const removeAllFilters = () => {
    setFiltersList([]);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          data-testid="name-filter"
          name="searchFilter"
          value={ search }
          onChange={ (e) => handleSearch(e) }
        />
      </div>
      <label htmlFor="coluna">
        Coluna
        <select
          name="coluna"
          id="coluna"
          data-testid="column-filter"
          onChange={ (e) => handleColumn(e) }
        >
          {newColumnValue.length === 0
            ? columnValue.map((item, index) => (
              <option value={ item } key={ index }>{item}</option>))
            : newColumnValue.map((item, index) => (
              <option value={ item } key={ index }>{item}</option>))}
        </select>
      </label>
      <label htmlFor="operador">
        Operator
        <select
          name="operador"
          id="operador"
          data-testid="comparison-filter"
          onChange={ (e) => handleOperator(e) }
        >
          {operatorValue.map((item, index) => (
            <option value={ item } key={ index }>{item}</option>
          ))}
        </select>
      </label>
      <input
        type="text"
        placeholder="valor"
        data-testid="value-filter"
        value={ numberValue }
        onChange={ (e) => handleNumberValue(e) }
      />
      <button
        type="butto"
        data-testid="button-filter"
        onClick={ filterClick }
      >
        Filtro

      </button>
      <div>
        {filtersList.map((item) => (
          <div key={ item.column } data-testid="filter">
            <p>{item.column}</p>
            <p>{item.operator}</p>
            <p>{item.numberValue}</p>
            <button
              type="button"
              name={ item.column }
              onClick={ (e) => removeFilter(e) }
            >
              X

            </button>
          </div>
        ))}
        <div>
          <button
            type="button"
            onClick={ () => sortPlanets('ASC') }
          >
            ASC

          </button>
          <button
            type="button"
            onClick={ () => sortPlanets('DESC') }
          >
            DESC

          </button>
        </div>
        <button
          data-testid="button-remove-filters"
          onClick={ () => removeAllFilters() }
        >
          Remove Filters

        </button>
      </div>
    </div>
  );
}
