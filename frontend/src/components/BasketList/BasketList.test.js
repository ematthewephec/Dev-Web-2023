import { render } from '@testing-library/react';
import BasketList from './BasketList';

describe('Component rendering test <BasketList />', () => {
    it('Should render without crash', async () => {
      const FakeBasket = {ItemIndex: 1, ProductName: 'Test', ProductPrice: '1', ItemQuantity: '1'}

      render(
            <BasketList products={FakeBasket}/>
        )
    })
})