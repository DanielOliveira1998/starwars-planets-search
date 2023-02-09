import React, { useContext, useState } from 'react';
import { DataPlanets } from '../context/DataPlanets';

export default function Filters() {
  const [columnValue, setColumnValue] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);
  const [operatorValue, setOperatorValue] = useState([
    'maior que',
    'menor que',
    'igual a',
  ]);
  const { search, handleSearch, handleColumn,
    handleNumberValue, handleOperator, setFiltersList, column,
    operator,
    numberValue, filtersList } = useContext(DataPlanets);

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
          {columnValue.map((item, index) => (
            <option value={ item } key={ index }>{item}</option>
          ))}
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
        onClick={ () => setFiltersList([...filtersList, {
          column,
          operator,
          numberValue,
        }]) }
      >
        Filtro

      </button>
    </div>
  );
}
