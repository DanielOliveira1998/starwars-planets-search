import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from '../App';
import DataProvider from '../context/DataPlanets';
import apiData from './helper/apiData';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('Testa tabela', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(apiData),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Valida renderização de elementos do componente da tabela,', async () => {
    render(
      <DataProvider>
        <App />)
      </DataProvider>
    )
    const searchInput = screen.getByTestId('name-filter');
    const colunaTag = screen.getByText(/coluna/i);
    const colunaSelect = screen.getByRole('combobox', {
      name: /coluna/i
    });
    const operadorTag = screen.getByText(/operator/i);
    const operadorSelect = screen.getByRole('combobox', {
      name: /operator/i
    });
    const valueInput = screen.getByTestId('value-filter');
    const filtroBtn = screen.getByRole('button', {
      name: /filtro/i
    });
    const removeFiltersBtn = screen.getByRole('button', {
      name: /remove filters/i
    });
    const tableTitle = screen.getAllByRole('columnheader');
    const tableContent = await screen.findAllByRole('cell');
    const ascBtn = screen.getByRole('button', {
      name: /asc/i
    });
    const descBtn = screen.getByRole('button', {
      name: /desc/i
    });
    expect(searchInput).toBeInTheDocument();
    expect(colunaTag).toBeInTheDocument();
    expect(colunaSelect).toBeInTheDocument();
    expect(operadorTag).toBeInTheDocument();
    expect(operadorSelect).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(filtroBtn).toBeInTheDocument();
    expect(ascBtn).toBeInTheDocument();
    expect(descBtn).toBeInTheDocument();
    expect(removeFiltersBtn).toBeInTheDocument();
    expect(tableTitle.length).toBe(13);
    expect(tableContent.length).toBe(130);
  })

  test('testa a função handleSearch', () => {
    render(
      <DataProvider>
        <App />
      </DataProvider>
    );
    const searchInput = screen.getByTestId('name-filter');
    fireEvent.change(searchInput, { target: { value: 'Tatooine' } });
    expect(searchInput.value).toBe('Tatooine');
  });

  test('testa a função handleOperator', () => {
    render(
      <DataProvider>
        <App />
      </DataProvider>
    );
    const operatorInput = screen.getByTestId('comparison-filter');
    fireEvent.change(operatorInput, { target: { value: 'menor que' } });
    expect(operatorInput.value).toBe('menor que');
  });

  test('testa a função handleNumberValue', () => {
    render(
      <DataProvider>
        <App />
      </DataProvider>
    );
    const numberValueInput = screen.getByTestId('value-filter');
    fireEvent.change(numberValueInput, { target: { value: '100000' } });
    expect(numberValueInput.value).toBe('100000');
  });

  test('Valida o funcionamento do botão de filtro', async () => {
    render(
      <DataProvider>
        <App />)
      </DataProvider>
    )
    const colunaSelect = screen.getByRole('combobox', {
      name: /coluna/i
    });
    const operadorSelect = screen.getByRole('combobox', {
      name: /operator/i
    });
    const valueInput = screen.getByTestId('value-filter');
    const filtroBtn = screen.getByRole('button', {
      name: /filtro/i
    });
    userEvent.selectOptions(colunaSelect, ['population']);
    userEvent.selectOptions(operadorSelect, ['maior que']);
    userEvent.type(valueInput, 0);
    userEvent.click(filtroBtn);
    waitFor(() => {
      const tableContent = screen.getAllByRole('cell');
      expect(tableContent.length).toBe(104);
      const removeBtn = screen.getByRole('button', {
        name: /x/i
      })
      userEvent.click(removeBtn)
    })
  })

  test('Valida o funcionamento do botão remove filters', () => {
    render(
      <DataProvider>
        <App />)
      </DataProvider>
    )
    const colunaSelect = screen.getByRole('combobox', {
      name: /coluna/i
    });
    const operadorSelect = screen.getByRole('combobox', {
      name: /operator/i
    });
    const valueInput = screen.getByTestId('value-filter');
    const filtroBtn = screen.getByRole('button', {
      name: /filtro/i
    });
    const removeFilters = screen.getByRole('button', {
      name: /remove filters/i
    });
    userEvent.selectOptions(colunaSelect, ['population']);
    userEvent.selectOptions(operadorSelect, ['maior que']);
    userEvent.type(valueInput, 0);
    userEvent.click(filtroBtn);
    userEvent.selectOptions(colunaSelect, ['rotation_period']);
    userEvent.selectOptions(operadorSelect, ['igual a']);
    userEvent.type(valueInput, 24);
    userEvent.click(filtroBtn);
    userEvent.click(removeFilters)
  })

  test('Valida filtro menor que', async () => {
    render(
      <DataProvider>
        <App />)
      </DataProvider>
    )
    const tableContent = await screen.findAllByRole('cell');
    expect(tableContent.length).toBe(130);
    const colunaSelect = screen.getByRole('combobox', {
      name: /coluna/i
    });
    const operadorSelect = screen.getByRole('combobox', {
      name: /operator/i
    });
    const valueInput = screen.getByTestId('value-filter');
    userEvent.selectOptions(colunaSelect, 'population');
    userEvent.selectOptions(operadorSelect, 'maior que');
    userEvent.type(valueInput, 1000000);
    const filtroBtn = screen.getByRole('button', {
      name: /filtro/i
    })
    userEvent.click(filtroBtn);
    await waitFor(() => {
      const tableContent2 = screen.getAllByRole('cell');
      expect(tableContent2.length).toBe(104);
    })
  })

  test('Valida filtro menor que', async () => {
    render(
      <DataProvider>
        <App />)
      </DataProvider>
    )
    const tableContent = await screen.findAllByRole('cell');
    expect(tableContent.length).toBe(130);
    const colunaSelect = screen.getByRole('combobox', {
      name: /coluna/i
    });
    const operadorSelect = screen.getByRole('combobox', {
      name: /operator/i
    });
    const valueInput = screen.getByTestId('value-filter');
    userEvent.selectOptions(colunaSelect, ['diameter']);
    userEvent.selectOptions(operadorSelect, ['menor que']);
    userEvent.type(valueInput, 5000);
    const filtroBtn = screen.getByTestId('button-filter');
    userEvent.click(filtroBtn);
    // waitFor(() => {
    // })
  })

  test('Valida filtro igual a', async () => {
    render(
      <DataProvider>
        <App />)
      </DataProvider>
    )
    const tableContent = await screen.findAllByRole('cell');
    expect(tableContent.length).toBe(130);
    const colunaSelect = screen.getByRole('combobox', {
      name: /coluna/i
    });
    // const operadorSelect = screen.getByTestId('comparison-filter')
    const valueInput = screen.getByTestId('value-filter');
    userEvent.selectOptions(colunaSelect, 'population');
    userEvent.selectOptions(screen.getByTestId('comparison-filter'), 'igual a');
    userEvent.type(valueInput, 1000);
    expect(screen.getByTestId('comparison-filter')).toBeInTheDocument();
    const filtroBtn = screen.getByRole('button', {
      name: /filtro/i
    })
    userEvent.click(filtroBtn);
    // screen.logTestingPlaygroundURL();
    await waitFor(() => {
      expect(screen.queryByText('Tatooine')).toBeInTheDocument()
    })
    // expect(await screen.findAllByTestId('planet-name')[0].value).toBe('Dagobah');
  })

  test('Valida asc e desc', async () => {
    render(
      <DataProvider>
        <App />)
      </DataProvider>
    )

    const ascBtn = screen.getByRole('button', {
      name: /asc/i
    });
    const descBtn = screen.getByRole('button', {
      name: /desc/i
    });

    userEvent.click(ascBtn);
    userEvent.click(descBtn);
  })
})
