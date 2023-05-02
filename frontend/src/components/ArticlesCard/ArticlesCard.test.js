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