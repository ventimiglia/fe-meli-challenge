import { render, screen } from '@testing-library/react';
import Component, { TItem } from './App';
import { useFetchItems } from './hooks/useFetchItems';

jest.mock('./hooks/useFetchItems');

describe('Component', () => {
  it('renders the title and search input', () => {
    (useFetchItems as jest.Mock).mockReturnValue({
      items: [],
      loading: false,
      hasMore: false,
      setPage: jest.fn(),
      setItems: jest.fn(),
    });

    render(<Component />);

    expect(screen.getByText(/list with search/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search items/i)).toBeInTheDocument();
  });

  it('renders an item when items are fetched', () => {
    const mockItem: TItem = {
      id: 1,
      title: 'Title test item',
      description: 'This is a test item',
      image: 'https://via.placeholder.com/150',
      detail: {
        info: 'Test info',
        price: 100,
        address: '123 Test St',
      },
    };

    (useFetchItems as jest.Mock).mockReturnValue({
      items: [mockItem],
      loading: false,
      hasMore: false,
      setPage: jest.fn(),
      setItems: jest.fn(),
    });

    render(<Component />);

    expect(screen.getByText(/title test item/i)).toBeInTheDocument();
  });
});
