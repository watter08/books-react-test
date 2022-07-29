import { useState } from 'react';



const useModalHooks = (FirtsValue = false) => {

    const [show , setShow ] = useState(FirtsValue);
    const handleToggle = () => setShow(!show);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [ fullScreen , setFullScreen ] = useState(false);
    const handleToggleFullScreen = () => setFullScreen(!fullScreen);

    return {
        show,        
        handleToggle,
        handleClose,
        handleShow,
        fullScreen,
        handleToggleFullScreen,
    }

}



export default useModalHooks;