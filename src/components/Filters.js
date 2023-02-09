import React, { useContext } from 'react';
import { DataPlanets } from '../context/DataPlanets';

export default function Filters() {
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
          <option value="population">população</option>
          <option value="orbital_period">Translação</option>
          <option value="diameter">Diâmetro</option>
          <option value="rotation_period">Rotação</option>
          <option value="surface_water">Superfície de água</option>
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
          <option value="maior que">Maior que</option>
          <option value="menor que">Menor que</option>
          <option value="igual a">Igual a</option>
        </select>
      </label>
      <input
        type="text"
        placeholder="valor"
        data-testid="value-filter"
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
