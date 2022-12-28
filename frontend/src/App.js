import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from './components'
import { Store, Success, Cancel } from './pages'
import CartProvider from './context/CartContext'

const App = () => (
  <CartProvider>
    <Container>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route index element={<Store />} />
          <Route path='success' element={<Success />} />
          <Route path='Cancel' element={<Cancel />} />
        </Routes>
      </BrowserRouter>
    </Container>
  </CartProvider>
)

export default App
