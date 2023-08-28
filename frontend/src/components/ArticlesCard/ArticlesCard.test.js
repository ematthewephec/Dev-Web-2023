import React from 'react';
import { render, screen } from '@testing-library/react';
import ArticlesCard from './ArticlesCard';

describe('Component rendering test <ArticlesCard />', () => {
    it('Should render without crash', async () => {
      const FakeUser = {id: 1, ProductName: 'test', ProductDesc: 'test', ProductPrice: 'test', ProductImg: 'test'}

      render(
            <ArticlesCard products={FakeUser}/>
        )
    })
})

const mockProduct = {
  ProductID: 1,
  ProductName: 'Product',
  ProductDesc: 'This is the description for Product 1',
  ProductPrice: 9.99,
};

test('renders product name', () => {
  render(<ArticlesCard products={mockProduct} />);
  const productName = screen.getByText(/Product 1/i);
  expect(productName).toBeInTheDocument();
});

test('renders product description', () => {
  render(<ArticlesCard products={mockProduct} />);
  const productDesc = screen.getByText(/This is the description for Product 1/i);
  expect(productDesc).toBeInTheDocument();
});

test('renders product price', () => {
  render(<ArticlesCard products={mockProduct} />);
  const productPrice = screen.getByText(/9.99 €/i);
  expect(productPrice).toBeInTheDocument();
});