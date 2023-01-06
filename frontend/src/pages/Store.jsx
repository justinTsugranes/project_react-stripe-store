import { Col, Row } from 'react-bootstrap'
import { productsArray } from '../constants/ProductsStore'
import { ProductCard } from '../components'

// This is a functional component that displays a list of products in a grid layout
const Store = () => (
  <>
    {/* This heading is centered and has some padding */}
    <h1 align="center" className="p-3">
      Welcome to the store!
    </h1>
    {/* This row contains 3 columns on medium screens and 1 column on small screens */}
    <Row xs={1} md={3} className="g-4">
      {/* Iterate over the products array and render a ProductCard component for each product */}
      {productsArray.map((product, index) => (
        // {/* Each product is displayed in a centered column */}
        <Col align="center" key={index}>
          {/* Render the ProductCard component with the current product as a prop */}
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  </>
)

export default Store
