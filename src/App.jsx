import './App.css'
import Header from './components/header'
import MenuMain from './pages/MenuMain'
import Footer from './pages/Footer'
import ProductCard from './components/ProductCard'

function App() {
  return (
    <>
      <Header />
      <hr />
      <ProductCard />
      <MenuMain />
      <Footer />
    </>
  )
}

export default App