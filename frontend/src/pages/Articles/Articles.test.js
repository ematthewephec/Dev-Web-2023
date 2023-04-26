import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'
import Articles from './Articles';

describe('Articles', () => {
    it('Should render without crash', async () => {
        localStorage.clear();
        localStorage.setItem('user',JSON.stringify(
                {id : 1}
            ));
        render(
            <BrowserRouter>
                <Articles/>
            </BrowserRouter>
        )
    })
})