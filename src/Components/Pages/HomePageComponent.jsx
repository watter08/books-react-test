import { memo, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { NavbarComponent, 
    CardComponent, 
    AccordionComponent, 
    OptionsBookComponent, 
    ModalComponent, 
    LoaderComponent,
    ToastComponent,
} from '../';
import { Book } from '../../Models/BookModel';
import { DeleteBooksAsync, GetBookByIdAsync, GetBooksAsync, PostBookAsync, PutBooksAsync, fotmatDate } from '../../Service/BookService';
import useModalHooks from '../../Hooks/useModalHooks';





const HomePageComponent = () => {

    let InitialState = {
        Books: [],
        BookFilter: [],
        InputSearch: '',
        FormBook: new Book({}),
        Visibility: false,
    }

    const [state, setState] = useState(InitialState);
    const { handleClose, handleShow, handleToggle, show } = useModalHooks();

    const [showToast , setShowToast ] = useState({Show : false , Message : '' , Alert : 'primary'});




    const CleanToast = () =>  setShowToast({Show : false , Message : '' , Alert : 'primary'})
    const ShowToast = ({Show , Message , Alert}) => setShowToast({Show , Message , Alert  })
    const SetShow = (Show) => setShowToast((state) => ({...state,Show }))
    

    useEffect(() => {
        if(!showToast.Show)
            CleanToast();
    },[showToast.Show])


    const handleUpdateBook = (form) => {
        handleShow();
        let newState = {...state}
        newState.FormBook = new Book({...form});
        setState(newState)
    }

    const GetBooksById = () => {
        let newState = { ...state };
        GetBookByIdAsync(state.InputSearch).then((data) => {
            if(data.HasError)
                ShowToast({Show : true , Message : data.Message , Alert : 'warning'})
            
            let Result = data.Data.map((book) => {
                return new Book({ ...book, publishDate: fotmatDate(book.publishDate) })
            });
            newState.Books = Result;
            newState.BookFilter = Result;
            setState(newState);
        
        });
    }

    const GetAllBooks = () => {
        let newState = { ...state };
        GetBooksAsync().then((data) => {
            if(data.HasError)
            ShowToast({Show : true , Message : data.Message , Alert : 'warning'})
        
            let Result = data.Data.map((book) => {
                return new Book({ ...book, publishDate: fotmatDate(book.publishDate) })
            });
            newState.Books = Result;
            newState.BookFilter = Result;
            setState(newState);
        
        });
    }

    const setVisibility = async (bool) => await setState((state) => ({ ...state, Visibility: bool }));

    const SearchBooks = async () => {
        await setVisibility(true)

        if (String(state.InputSearch).length > 0)
            await GetBooksById();
        else
            await GetAllBooks();

    }

    const handleChangeInput = ({ currentTarget: input }) => {
        let newState = { ...state }
        newState.InputSearch = input.value ??= '';
        setState(newState);
    }

    const handleChangeFormInput = ({ currentTarget: input }) => {
        let newState = {...state};
        const { name } = input;
        newState.FormBook[name] = input.value;
        setState(newState)
    }

    const saveBook = async () => {   
        await setVisibility(true)      
        let Result = await PostBookAsync(state.FormBook);
        ShowToast({Show : true , Message :  Result.Message , Alert : Result.HasError ? 'warning' : 'primary'})
        await setVisibility(false)
     }

     const UpdateBook = async () => {
        await setVisibility(true)
        let Result = await PutBooksAsync(state.FormBook);
        ShowToast({Show : true , Message :  Result.Message , Alert : Result.HasError ? 'warning' : 'primary'})
        await setVisibility(false)
     }

     const DeleteBook = async (id) => {
        await setVisibility(true)
        let Result = await DeleteBooksAsync(id);
        if(!Result.HasError)
            DeleteBookLocal(id);
        ShowToast({Show : true , Message :  Result.Message , Alert : Result.HasError ? 'warning' : 'primary'})
        await setVisibility(false)
     }

     const DeleteBookLocal = async (id) => {
        let newState = {...state}
        newState.Books = state.BookFilter.filter(val => val.id  != id)
        newState.BookFilter = state.BookFilter.filter(val => val.id !=  id)
        setState(newState)
     }

    return (
        <>


            <NavbarComponent Title='Ventana Para Manejar Mantenimiento De Libros' />
            <ToastComponent show={showToast.Show} Alert={showToast.Alert} Message={showToast.Message}   setShow={SetShow} />
            <LoaderComponent
                Visibility={state.Visibility}
            />

            <Container fluid className="pt-4">
                <Row className="pb-4">
                    <Col>
                        <AccordionComponent Title='Opciones De Mantenimiento De Libros'>
                            <OptionsBookComponent
                                InputSearch={state.InputSearch}
                                handleChangeInput={handleChangeInput}
                                handleShow={handleShow}
                                SearchBooks={SearchBooks}
                            />
                        </AccordionComponent>
                    </Col>
                </Row>

                <Row>
                    {state && state.BookFilter?.length > 0 && state.BookFilter.map((item) => (
                        <Col sm={12} md={6} lg={4} xl={3}>
                            <CardComponent
                                id={item.id}
                                title={item.title}
                                description={item.description}
                                pageCount={item.pageCount}
                                excerpt={item.excerpt}
                                publishDate={item.publishDate}
                                handleShow={handleUpdateBook}
                                DeleteBook={DeleteBook}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>

            <ModalComponent
                show={show}
                handleToggle={handleToggle}
                handleClose={handleClose}
                handleShow={handleShow}
                BackDrop={false}
                Scrollable={true}
                Title='Books'
                ClassNames={{ Header: "ModalHeader" }}
            >

                <Row>
                    <Col sm={12} md={6} lg={4} xl={3}>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                            <input name='title' onChange={handleChangeFormInput} type="text" className="form-control" placeholder="" value={state.FormBook.title} />
                        </div>
                    </Col>
                    <Col sm={12} md={6} lg={4} xl={3}>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Description</label>
                            <input name='description' onChange={handleChangeFormInput}  type="text" className="form-control" placeholder="" value={state.FormBook.description} />
                        </div>
                    </Col>
                    <Col sm={12} md={6} lg={4} xl={3}>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Excerpt</label>
                            <input name='excerpt' onChange={handleChangeFormInput}  type="text" className="form-control" placeholder="" value={state.FormBook.excerpt} />
                        </div>
                    </Col>
                    <Col sm={12} md={6} lg={4} xl={3}>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Publish Date</label>
                            <input name='publishDate' onChange={handleChangeFormInput}  type="date" className="form-control" placeholder="" value={state.FormBook.publishDate} />
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className='float-end'>
                            <button className="btn btn-success blue m-1" onClick={Number(state.FormBook.id) > 0 ? UpdateBook : saveBook }>{Number(state.FormBook.id) > 0 ? 'Actualizar' : 'Guardar'}</button>
                        </div>
                    </Col>
                </Row>

            </ModalComponent>

            

        </>
    )
}



export default memo(HomePageComponent);