import { render, screen, fireEvent } from '@testing-library/react';
import BasketList from './BasketList';

describe('Component rendering test <BasketList />', () => {
    it('Should render without crash', async () => {
      const FakeBasket = [{ItemIndex: 1, ProductName: 'Test', ProductPrice: '1', ItemQuantity: '1'}]

      await render(
        <>
          <BasketList basket={FakeBasket}/>
        </>
        )
    });

    it('removes an item from the basket', async () => {
      const basket = [
        { ItemIndex: 1, ProductName: 'Product 1', ItemQuantity: 1, ProductPrice: 10 },
        { ItemIndex: 2, ProductName: 'Product 2', ItemQuantity: 2, ProductPrice: 20 },
        { ItemIndex: 3, ProductName: 'Product 3', ItemQuantity: 3, ProductPrice: 30 }
      ];
      const removeItem = jest.fn();
      render(<BasketList basket={basket} removeItem={removeItem} />);
      const deleteButtons = screen.getAllByText('Delete Item');
      fireEvent.click(deleteButtons[0]);
      expect(removeItem).toHaveBeenCalledWith(1);
    });
    
    it('clears the user basket', () => {
        const basket = [
          {
            ItemIndex: 1,
            ProductName: 'Product 1',
            ItemQuantity: 1,
            ProductPrice: 10,
          },
          {
            ItemIndex: 2,
            ProductName: 'Product 2',
            ItemQuantity: 2,
            ProductPrice: 20,
          },
        ];
      
        const clearBasket = jest.fn();
        render(<BasketList basket={basket} clearBasket={clearBasket} />);
      
        fireEvent.click(screen.getByText('Clear Basket'));
      
        expect(clearBasket).toHaveBeenCalled();
    });
})