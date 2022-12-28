import { Col, Row } from 'react-bootstrap'
import { productsArray } from '../constants/ProductsStore'
import { ProductCard } from '../components'

const Store = () => (
  <>
    <h1 align='center' className='p-3'>
      Welcome to the store!
    </h1>
    <Row xs={1} md={3} className='g-4'>
      {productsArray.map((product, index) => (
        <Col align='center' key={index}>
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  </>
)

export default Store
