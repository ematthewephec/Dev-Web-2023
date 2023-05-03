import { render, screen, fireEvent } from '@testing-library/react';
import BasketList from './BasketList';

describe('Component rendering test <BasketList />', () => {
    it('Should render without crash', async () => {
      const FakeBasket = {ItemIndex: 1, ProductName: 'Test', ProductPrice: '1', ItemQuantity: '1'}

      render(
            <BasketList products={FakeBasket}/>
        )
    })
    it('removes an item', async () => {
        const basket = [
          { ItemIndex: 1, ProductName: 'Product 1', ItemQuantity: 1, ProductPrice: 10 },
          { ItemIndex: 2, ProductName: 'Product 2', ItemQuantity: 2, ProductPrice: 20 },
          { ItemIndex: 3, ProductName: 'Product 3', ItemQuantity: 3, ProductPrice: 30 }
        ];
        const removeItem = jest.fn();
        const { getByText } = render(<BasketList basket={basket} removeItem={removeItem} />);
        const deleteButton = screen.getByText('Delete Item');
        fireEvent.click(deleteButton);
        expect(removeItem).toHaveBeenCalledWith(1);
      });
})