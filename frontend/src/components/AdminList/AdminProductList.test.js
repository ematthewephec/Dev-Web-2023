import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AdminProductList from './AdminProductList';

describe('AdminProductList component', () => {
  const mockProducts = [
    {
      ProductID: 1,
      ProductName: 'Product 1',
      ProductStock: 10,
      ProductDesc: 'Description 1',
      ProductPrice: 100,
    },
    {
      ProductID: 2,
      ProductName: 'Product 2',
      ProductStock: 5,
      ProductDesc: 'Description 2',
      ProductPrice: 50,
    },
  ];

  it('displays products when there are products', () => {
    render(<AdminProductList products={mockProducts} />);
    
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('displays "No products on website!" when no products are provided', () => {
    render(<AdminProductList products={[]} />);
    
    expect(screen.getByText('No products on website!')).toBeInTheDocument();
  });

  it('opens and closes the add product form when "Add New Product" is clicked', () => {
    render(<AdminProductList products={mockProducts} />);
    
    const addButton = screen.getByText('Add New Product');
    fireEvent.click(addButton);
    
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Cancel'));
    
    expect(screen.queryByText('Cancel')).toBeNull();
  });
});
