import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Card from 'react-bootstrap/Card';

function CardComponent({
    id,
    title,
    description,
    pageCount,
    excerpt,
    publishDate,
    handleShow,
    DeleteBook
}) {
    return (
        <div className="pt-3 pb-5">
            <Card className="text-center Card">
                <Card.Header className="CardHeader blue">{title}</Card.Header>
                <Card.Body className="">
                    <Card.Title>{description}</Card.Title>
                    <Card.Text>
                        {excerpt}
                    </Card.Text>
                    <div>
                        <button className="btn btn-danger  m-1" onClick={() => DeleteBook(id)}>Eliminar</button>
                        <button className="btn btn-success m-1" 
                        onClick={() => {
                            handleShow({  
                                id,
                                title,
                                description,
                                pageCount,
                                excerpt,
                                publishDate,
                                handleShow})}}
                        >
                            Actualizar
                        </button>
                    </div>
                </Card.Body>
                <Card.Footer className="CardFooter blue">{publishDate}</Card.Footer>
            </Card>
        </div>

    );
}

export default CardComponent;