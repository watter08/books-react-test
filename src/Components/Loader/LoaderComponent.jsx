import { memo, useEffect } from 'react';
import useModalHooks from '../../Hooks/useModalHooks';
import Spinner from 'react-bootstrap/Spinner';
import { ModalComponent } from '../'


const LoaderComponent = ({
    Visibility
}) => {

    const { handleClose , handleShow,  handleToggle  , show  } = useModalHooks();

    useEffect(() => {
        handleClose()
    },[])

    useEffect(() => {
        if(typeof Visibility === 'boolean'){
            if(Visibility === true )
                handleShow()
            else
            handleClose()
        }
    },[Visibility])


    return (
        <ModalComponent
                show={show}
                handleToggle={handleToggle}
                handleClose={handleClose}
                handleShow={handleShow}
                BackDrop={true}
                Scrollable={true}
                Title="Cargando...."
                hasTitle={false}
            >
            <Spinner animation="border" variant="primary" className="align-items-center" />
        </ModalComponent>
    )
}




export default memo(LoaderComponent);