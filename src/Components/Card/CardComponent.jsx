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
    publishDate
}) {
    return (
        <div className="p-3">
            <Card className="text-center">
                <Card.Header>{title}</Card.Header>
                <Card.Body>
                    <Card.Title>{description}</Card.Title>
                    <Card.Text>
                        {excerpt}
                    </Card.Text>
                    <div>
                        <button className="btn btn-danger  m-1">Eliminar</button>
                        <button className="btn btn-success m-1">Actualizar</button>
                    </div>
                </Card.Body>
                <Card.Footer className="text-muted">{publishDate}</Card.Footer>
            </Card>
        </div>

    );
}

export default CardComponent;