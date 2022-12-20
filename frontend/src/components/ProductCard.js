import { Button, Card, Form, Row, Col } from 'react-bootstrap'
import { CartContext } from '../CartContext'
import { useContext } from 'react'

// props.product is the product we are selling
export default function ProductCard(props) {
  const product = props.product
  const cart = useContext(CartContext)
  const productQuantity = cart.getProductQuantity(product.id)
  console.log(cart.items)
  return (
    <Card>
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>${product.price}</Card.Text>
        {productQuantity > 0 ? (
          <>
            <Form as={Row}>
              <Form.Label column='true' sm='6'>
                In Cart: {product.quantity}
              </Form.Label>
              <Col>
                <Button
                  sm='6'
                  onClick={() => cart.addOneToCart(product.id)}
                  className='mx-2'
                >
                  +
                </Button>
                <Button
                  sm='6'
                  onClick={() => cart.removeOneFromCart(product.id)}
                  className='mx-2'
                >
                  -
                </Button>
              </Col>
            </Form>
            <Button
              variant='danger'
              onClick={() => cart.deleteFromCart(product.id)}
              className='my-2'
            >
              Remove from cart
            </Button>
          </>
        ) : (
          <Button
            variant='primary'
            onClick={() => cart.addOneToCart(product.id)}
          >
            Add to Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}
