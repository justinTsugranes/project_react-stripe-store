import { productsArray } from '../constants/ProductsStore'

const getProductData = (id) => {
  let productData = productsArray.find((product) => product.id === id)
  if (productData === undefined) {
    console.log(`Product data does not exist for ID: ${id}`)
    return undefined
  }
  return productData
}

export default getProductData
