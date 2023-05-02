import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'
import Basket from './Basket';

describe('Basket', () => {
    it('Should render without crash', async () => {
        render(
            <BrowserRouter>
                <Basket/>
            </BrowserRouter>
        )
    })
})