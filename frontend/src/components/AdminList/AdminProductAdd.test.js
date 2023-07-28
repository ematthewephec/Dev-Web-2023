/*import React from 'react';
import { render, fireEvent, getByAltText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Pour les matchers supplémentaires comme "toBeInTheDocument"
import AddProduct from './AdminProductAdd';

test('devrait afficher le composant AddProduct', () => {
  const { getByLabelText, getByText } = render(<AddProduct />);

  // Vérifier que les éléments du formulaire sont affichés
  const productNameInput = getByLabelText('Nom du produit');
  expect(productNameInput).toBeInTheDocument();

  const productStockInput = getByLabelText('Stock du produit');
  expect(productStockInput).toBeInTheDocument();

  // ... autres éléments du formulaire ...

  // Vérifier que les valeurs initiales du formulaire sont vides ou définies par défaut
  //expect(getByLabelText('Nom du produit')).toHaveValue('test');
  //expect(getByLabelText('Stock du produit')).toHaveValue('1');
  // ... autres champs du formulaire ...

  // Vérifier que la soumission du formulaire fonctionne
  fireEvent.change(productNameInput, { target: { value: 'Produit de test' } });
  fireEvent.change(productStockInput, { target: { value: '10' } });
  // ... définir les valeurs des autres champs du formulaire ...
  
  // Cliquer sur le bouton "Ajouter le produit"
  const submitButton = getByText('Ajouter le produit');
  fireEvent.click(submitButton);

  // (Vous pouvez ajouter des assertions supplémentaires ici pour vérifier si les données du formulaire sont correctement envoyées)

  // Vous pouvez également tester l'image par défaut
  const defaultImage = getByAltText('No Images');
  expect(defaultImage).toBeInTheDocument();
});*/
