import { Button, Modal, Navbar } from 'react-bootstrap'
import { useState, useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { CartProduct } from './'

const NavbarComponent = () => {
  // retrieve the cart from the context
  const cart = useContext(CartContext)

  // state for the cart modal
  const [show, setShow] = useState(false)
  // close the modal
  const handleClose = () => setShow(false)
  // open the modal
  const handleShow = () => setShow(true)

  // function to handle checkout
  const checkout = async () => {
    // send a POST request to the server to initiate the checkout process
    await fetch('http://localhost:4000/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // send the items in the cart as the request body
      body: JSON.stringify({ items: cart.items }),
    })
      .then((res) => {
        // convert the response to json
        return res.json()
      })
      .then((res) => {
        // if the server returns a url, redirect the user to the payment page
        if (res.url) {
          window.location.assign(res.url)
        }
      })
  }

  // calculate the total number of products in the cart
  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0,
  )

  return (
    <>
      {/* Navbar component with cart button */}
      <Navbar expand="sm">
        <Navbar.Brand href="/">Ecommerce Store</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button onClick={handleShow}>Cart ({productsCount} Items)</Button>
        </Navbar.Collapse>
      </Navbar>
      {/* CART MODAL */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* If there are products in the cart, display them */}
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
              {/* Display total cost and purchase button */}
              <h2>Total: {cart.getTotalCost().toFixed(2)}</h2>
              <Button variant="success" onClick={checkout}>
                Purchase Items
              </Button>
            </>
          ) : (
            // If there are no products in the cart, display empty message
            <h1>Your Cart Is Empty</h1>
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default NavbarComponent
