import React, { useContext } from 'react';
import { DataPlanets } from '../context/DataPlanets';

export default function Filters() {
  const { search, handleSearch } = useContext(DataPlanets);
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
        <label htmlFor="coluna">
          Coluna
          <select name="coluna" id="coluna" data-testid="column-filter">
            <option value="population">Population</option>
            <option value="orbital_period">Orbital Period</option>
            <option value="diameter">Diameter</option>
            <option value="rotation_period">Rotation Period</option>
            <option value="surface_water">Surface Water</option>
          </select>
        </label>
        <label htmlFor="operador">
          Operator
          <select name="operador" id="operador" data-testid="comparison-filter">
            <option value="maior que">Maior que</option>
            <option value="menor que">Menor que</option>
            <option value="igual a">Igual a</option>
          </select>
        </label>
      </div>

    </div>
  );
}
