import { memo } from 'react';
import { Modal } from 'react-bootstrap';






const ModalComponent = ({
    show = false,
    handleToggle = () => { },
    handleClose = () => { },
    handleShow = () => { },
    BackDrop = 'static',
    keyboard = false,
    Centered = false,
    Size = 'xl',
    Scrollable = true,
    Title = '',
    children,
    ClassNames = {},
    hasTitle = true,
    ...rest
}) => {



    return (
        <>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop={BackDrop}
                keyboard={keyboard}
                centered={Centered}
                dialogClassName="modal-100w"
                size={Size}
                scrollable={Scrollable}
                animation={true}
                autoFocus={true}
            >
                {hasTitle && (
                    <Modal.Header closeButton className={`${ClassNames?.Header} text-center ModalHeader`}>
                        <Modal.Title className="text-center">{Title}</Modal.Title>
                    </Modal.Header>
                )}

                <Modal.Body className={`show-grid ${ClassNames?.Body}`}>{children}</Modal.Body>

            </Modal>

        </>
    )
}


export default memo(ModalComponent);