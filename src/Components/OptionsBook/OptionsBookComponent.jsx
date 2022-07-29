import { memo } from "react";





const OptionsBookComponent = ({
    handleChangeInput = () => {},
    InputSearch = "",
    SearchBooks = () => {},
    handleShow = () => {},
}) => {

    return (
        <>

            <div className="d-flex">
                <input className="form-control me-2" onChange={handleChangeInput} value={InputSearch} type="search" placeholder={InputSearch.trim ? 'Buscar Todos' : 'Buscar Uno'} aria-label="Search" />
                <div className="d-flex">
                <button onClick={SearchBooks} className="btn btn-outline-success me-1" >{String(InputSearch).length > 0 ?  'Buscar Uno' : 'Buscar Todos'}</button> 
                <button className="btn btn-outline-success me-1" onClick={handleShow}>Libro Nuevo</button> 
                </div>               
            </div>

        </>
    )
}



export default memo(OptionsBookComponent);