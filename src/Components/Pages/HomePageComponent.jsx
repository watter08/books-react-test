import { memo, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { NavbarComponent, CardComponent } from '../';
import { Book } from '../../Models/BookModel';
import { DeleteBooksAsync, GetBookByIdAsync, GetBooksAsync, PostBookAsync, PutBooksAsync , fotmatDate} from '../../Service/BookService';






const HomePageComponent = () => {

    let InitialState = {
        Books: [],
        InputSearch: '',
    }

    const [state, setState] = useState(InitialState);

    useEffect(() => {
        GetAllBooks();
    }, [])

    useEffect(() => {
        console.log(state)
    }, [state])

    const GetAllBooks = () => {
        let newState = { ...state };
        GetBooksAsync().then((data) => {
            newState.Books = data.map((book) => {
                return new Book({ ...book , publishDate : fotmatDate(book.publishDate) })
            });
            setState(newState);
        });
    }

    const SearchByBookName = () => {

    }

    const handleChangeInput = ({currentTarget : input}) => {
        let newState = {...state}
        newState.InputSearch = input.value ??= '';
        setState(newState);
    }

    return (
        <>
            <NavbarComponent 
            Title='Lista De Libros' 
            TitleButton='Busqueda'
            InputSearch={state.InputSearch}
            handleChangeInput={handleChangeInput}
             />
            <Container fluid>
                <Row>
                    {state && state.Books?.length > 0 && state.Books.map((item) => (
                        <Col sm={6} md={4} lg={3} xl={2}>
                            <CardComponent 
                             id={item.id}
                             title={item.title}
                             description={item.description}
                             pageCount={item.pageCount}
                             excerpt={item.excerpt}
                             publishDate={item.publishDate}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>

        </>
    )
}



export default memo(HomePageComponent);