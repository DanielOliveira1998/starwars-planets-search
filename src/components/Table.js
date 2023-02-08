import React, { useContext, useState } from 'react';
import { DataPlanets } from '../context/DataPlanets';

export default function Table() {
  const { planets } = useContext(DataPlanets);
  const [search, setSearch] = useState('');

  // const handleChange = ({ target }) => {
  //   const { name, value } = target;
  //   setSearch({
  //     ...search,
  //     [name]: value,
  //   });
  // };

  const searchFilter = search ? planets
    .filter((planet) => planet.name.includes(search)) : planets;

  console.log(searchFilter);

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        name="searchFilter"
        value={ search }
        onChange={ ({ target }) => setSearch(target.value) }
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {planets && searchFilter.map((planet) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
        <tbody />
      </table>
    </div>
  );
}
