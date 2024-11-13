import { Card, ListGroup } from 'react-bootstrap';

export default function CardPizza({ name, price, ingredients, img }) {
    return (
        <Card style={{ width: '100%' }} className='mt-5 h-100'>
            <Card.Img variant="top" src={img} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text className='align-middle text-center'>
                    <p>Ingredients 🍕:</p>
                    <ul className='list-unstyled'>
                        {ingredients.map((i, index) => (
                            <li key={index}>{i}</li>
                        ))}
                    </ul>
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Price ${price}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Card.Link className='btn btn-info'>Info</Card.Link>
                <Card.Link className='btn btn-dark'>Add 🛒</Card.Link>
            </Card.Body>
        </Card>
    );
}