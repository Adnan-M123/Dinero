import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import Main from './page';

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        {
          name: 'Klopa',
          description: 'Lorem ipsum dolor sit amet, consectetur',
          image: 'public/Klopa/klopa-restaurant.jpg',
        },
        {
          name: 'Careva Ćuprija',
          description: 'Lorem ipsum dolor sit amet, consectetur',
          image: 'public/careva-cuprija.jpg',
        },
      ]),
  })
);

describe('Main Page', () => {
  it('renders restaurant cards when data is fetched', async () => {
    render(<Main />);

    // Wait for the fetch to complete and the restaurant cards to render
    await waitFor(() => {
      expect(screen.getByText('Klopa')).toBeInTheDocument();
      expect(screen.getByText('Careva Ćuprija')).toBeInTheDocument();
    });

    // Check if images are rendered
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2); // Two restaurants, so two images
    expect(images[0]).toHaveAttribute('src', '/images/restaurants/klopa.jpg');
    expect(images[1]).toHaveAttribute('src', '/images/restaurants/careva-cuprija.jpg');
  });

  it('shows fallback message when no restaurants are available', async () => {
    // Mock fetch to return an empty array
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );

    render(<Main />);

    // Wait for the fallback message to appear
    await waitFor(() => {
      expect(screen.getByText('No restaurants available.')).toBeInTheDocument();
    });
  });
});
