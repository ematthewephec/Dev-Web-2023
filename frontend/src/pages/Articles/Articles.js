import './Articles.css';
import ArticlesCard from '../../components/ArticlesCard/ArticlesCard';
import {Container} from 'react-bootstrap';


function Articles(){
    return (
        <div className='articles'>
            <Container className='articles-title page-title'>
                <h2>Articles</h2>
            </Container>
            <Container className='articles-list'>
                <ArticlesCard/>
            </Container>
        </div>
    );
}

export default Articles;