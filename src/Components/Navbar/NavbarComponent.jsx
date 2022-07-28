import { memo } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function NavbarComponent({
    Title = "",
    TitleButton = "",
    InputSearch = "",
    handleChangeInput = () => {},
}) {
    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand">{Title}</a>
                    <form className="d-flex">
                        <input className="form-control me-2" onChange={handleChangeInput} value={InputSearch} type="search" placeholder="Busqueda" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">{TitleButton}</button>
                    </form>
                </div>
            </nav>
        </>
    );
}

export default memo(NavbarComponent);