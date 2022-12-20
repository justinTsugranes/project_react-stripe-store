import { createContext, useState } from 'react'
import { getProductData } from './ProductsStore'

export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
})

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([])

  function getProductQuantity(id) {
    const quantity = cartProducts.find((product) => product.id === id)?.quantity

    if (quantity === undefined) {
      return 0
    }

    return quantity
  }

  function addOneToCart(id) {
    const quantity = getProductQuantity(id)
    if (quantity === 0) {
      setCartProducts([
        ...cartProducts,
        {
          id: id,
          quantity: 1,
        },
      ])
    } else {
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
    const quantity = getProductQuantity(id)

    if (quantity === 1) {
      deleteFromCart(id)
    } else {
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
    // if object meets condition, add object to array filter
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => {
        return currentProduct.id !== id
      }),
    )
  }

  //  ERR: Array.prototype.map() expects a return value from arrow function  array-callback-return
  function getTotalCost(id) {
    let totalCost = 0
    // eslint-disable-next-line
    cartProducts.map((cartItem) => {
      const productData = getProductData(cartItem.id)
      totalCost += productData.price * cartItem.quantity
    })
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
