import React, { memo } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

function ToastComponent({
    show = false,
    setShow = () => { },
    Message = '',
    Title = 'Alerta',
    Alert = 'primary'
}) {

    return (
        <Row>
            <Col xs={6}>
                <div
                    aria-live="polite"
                    aria-atomic="true"
                    className="position-relative p-3"
                    style={{ zIndex:99999999}}

                >
                    <Toast position="top-end" onClose={() => setShow(false)} show={show} delay={3000} autohide bg={Alert} className="ToasContainer">
                        <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">{Title}</strong>
                        </Toast.Header>
                        <Toast.Body>{Message}</Toast.Body>
                    </Toast>
                </div>
            </Col>
        </Row>
    );
}

export default memo(ToastComponent);