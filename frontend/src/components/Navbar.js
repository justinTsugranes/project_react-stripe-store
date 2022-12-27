import { Button, Modal, Navbar } from 'react-bootstrap'
import { useState, useContext } from 'react'
import { CartContext } from '../CartContext'
import CartProduct from './CartProduct'

function NavbarComponent() {
  const cart = useContext(CartContext)

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const checkout = async () => {
    await fetch('http://localhost:4000/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: cart.items }),
    })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res.url) {
          window.location.assign(res.url)
        }
      })
  }

  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0,
  )

  return (
    <>
      <Navbar expand='sm'>
        <Navbar.Brand href='/'>Ecommerce Store</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Button onClick={handleShow}>Cart ({productsCount} Items)</Button>
        </Navbar.Collapse>
      </Navbar>
      {/* CART MODAL */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsCount > 0 ? (
            <>
              <p>Items in your cart:</p>
              {cart.items.map((currentProduct, index) => (
                <CartProduct
                  key={index}
                  id={currentProduct.id}
                  quantity={currentProduct.quantity}
                ></CartProduct>
              ))}

              <h2>Total: {cart.getTotalCost().toFixed(2)}</h2>
              <Button variant='success' onClick={checkout}>
                Purchase Items
              </Button>
            </>
          ) : (
            <h1>Your Cart Is Empty</h1>
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default NavbarComponent
