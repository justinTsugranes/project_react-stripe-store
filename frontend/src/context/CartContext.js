import { createContext, useState } from 'react'
import getProductData from '../utils/GetProductData'

// Create a new context object to store our cart state
export const CartContext = createContext({
  // Initial cart state
  items: [],
  // Initial functions to manage cart state
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
})

// A higher-order component that wraps our app and provides the cart context to all child components
export function CartProvider({ children }) {
  // Initialize state to store the current products in the cart
  const [cartProducts, setCartProducts] = useState([])

  // Get the quantity of a specific product in the cart
  function getProductQuantity(id) {
    // Find the product with the matching id in the cart
    const quantity = cartProducts.find((product) => product.id === id)?.quantity

    // If the product is not in the cart, return 0
    if (quantity === undefined) {
      return 0
    }

    // Otherwise, return the quantity of the product
    return quantity
  }

  // Add one of a specific product to the cart
  function addOneToCart(id) {
    // Get the current quantity of the product in the cart
    const quantity = getProductQuantity(id)

    // If the product is not in the cart yet, add it to the cart with quantity 1
    if (quantity === 0) {
      setCartProducts([
        ...cartProducts,
        {
          id: id,
          quantity: 1,
        },
      ])
    }
    // If the product is already in the cart, increase its quantity by 1
    else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product,
        ),
      )
    }
  }

  function removeOneFromCart(id) {
    // Get the current quantity of the product with the given ID
    const quantity = getProductQuantity(id)

    // If the quantity is 1, delete the product from the cart
    if (quantity === 1) {
      deleteFromCart(id)
    }
    // If the quantity is greater than 1, reduce the quantity by 1
    else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product,
        ),
      )
    }
  }

  function deleteFromCart(id) {
    // Set the cart products to a new array that does not include the product with the given ID
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => {
        // If the current product's ID does not match the given ID, add it to the new array
        return currentProduct.id !== id
      }),
    )
  }

  //  ERR: Array.prototype.map() expects a return value from arrow function  array-callback-return
  function getTotalCost(id) {
    // Initialize the total cost to 0
    let totalCost = 0

    // Iterate over the cart products and add the price of each product to the total cost
    // eslint-disable-next-line
    cartProducts.map((cartItem) => {
      // Get the product data for the current cart item
      const productData = getProductData(cartItem.id)

      // Add the price of the product multiplied by its quantity to the total cost
      totalCost += productData.price * cartItem.quantity
    })

    // Return the total cost
    return totalCost
  }

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  }

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  )
}

export default CartProvider

// Content(cart,addToCart,removeCart)
// Provider => gives your react app access to all the things in your context
