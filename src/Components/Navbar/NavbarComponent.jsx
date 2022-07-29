import { memo } from 'react';

function NavbarComponent({  Title = "",}) {
    return (
        <>
            <nav className="navbar">
                <div className="container-fluid ">
                    <a className="navbar-brand">{Title}</a>
                </div>
            </nav>
        </>
    );
}

export default memo(NavbarComponent);