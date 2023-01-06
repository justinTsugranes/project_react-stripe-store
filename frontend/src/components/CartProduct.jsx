import { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { CartContext } from '../context/CartContext' // import the CartContext
import getProductData from '../utils/GetProductData' // import the helper function to get product data

const CartProduct = (props) => {
  const cart = useContext(CartContext) // destructure the `cart` object from the CartContext
  const id = props.id
  const quantity = props.quantity
  const productData = getProductData(id) // get the product data by id

  return (
    <>
      <h3>{productData.title}</h3> {/* display the title of the product */}
      <p>{quantity} total</p> {/* display the quantity of the product */}
      <p>${(quantity * productData.price).toFixed(2)}</p>{' '}
      {/* display the total price of the product */}
      <Button size="sm" onClick={() => cart.deleteFromCart(id)}>
        {' '}
        {/* delete the product from the cart when clicked */}
        Remove
      </Button>
      <hr></hr> {/* horizontal line to separate products in the cart */}
    </>
  )
}

export default CartProduct
