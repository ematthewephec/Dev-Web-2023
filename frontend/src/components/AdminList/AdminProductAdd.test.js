import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddProduct from './AdminProductAdd';

describe('AddProduct component', () => {
  it('renders form elements correctly', () => {
    render(<AddProduct />);
    
    expect(screen.getByLabelText('Nom du produit')).toBeInTheDocument();
    expect(screen.getByLabelText('Stock du produit')).toBeInTheDocument();
    expect(screen.getByLabelText('Description du produit')).toBeInTheDocument();
    expect(screen.getByLabelText('Prix du produit')).toBeInTheDocument();
    expect(screen.getByLabelText('En vente ?')).toBeInTheDocument();
    expect(screen.getByLabelText('Image du produit')).toBeInTheDocument();
    expect(screen.getByText('Ajouter le produit')).toBeInTheDocument();
  });

  it('updates form data on input change', () => {
    render(<AddProduct />);
    
    const productNameInput = screen.getByLabelText('Nom du produit');
    fireEvent.change(productNameInput, { target: { value: 'Test Product' } });
    
    expect(productNameInput.value).toBe('Test Product');
  });

  // Add more test cases for other form fields and interactions as needed

  it('submits the form correctly', () => {
    render(<AddProduct />);
    
    // Mock fetch and response here
    
    const addButton = screen.getByText('Ajouter le produit');
    fireEvent.click(addButton);
    
    // Add assertions for expected fetch calls and redirects
  });
});
