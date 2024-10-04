import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ItemDetailDialog from './ItemDetailDialog';
// import { TItem } from '../../App';

describe('ItemDetailDialog component', () => {
  const mockItem = {
    id: 1,
    title: 'Sample Item',
    description: 'This is a sample description',
    image: 'https://via.placeholder.com/150',
    detail: {
      info: 'Additional information about the item',
      price: 1000,
      address: '123 Sample Street',
    },
  };

  it('should render the image with correct alt text', () => {
    render(<ItemDetailDialog {...mockItem} />);
    const imageElement = screen.getByAltText('Sample Item');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', mockItem.image);
  });

  it('should render the description', () => {
    render(<ItemDetailDialog {...mockItem} />);
    const descriptionElement = screen.getByText('This is a sample description');
    expect(descriptionElement).toBeInTheDocument();
  });

  it('should render the detail info', () => {
    render(<ItemDetailDialog {...mockItem} />);
    const infoElement = screen.getByText(
      'Additional information about the item'
    );
    expect(infoElement).toBeInTheDocument();
  });

  it('should render the price formatted in ARS currency', () => {
    render(<ItemDetailDialog {...mockItem} />);
    const priceElement = screen.getByText('$ 1.000,00');
    expect(priceElement).toBeInTheDocument();
  });

  it('should render the address', () => {
    render(<ItemDetailDialog {...mockItem} />);
    const addressElement = screen.getByText('123 Sample Street');
    expect(addressElement).toBeInTheDocument();
  });
});
