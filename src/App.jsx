import './App.css'
import Header from './components/header'
import Footer from './components/Footer'
import MainMenu from './components/MenuMain'
import Sale from './pages/sale'
import Chinhsach from './pages/chinhsach'
import Voucher from './components/voucher'

function App() {
  return (
    <div className="app">

      <Header />

      <div className="layout">
        <MainMenu />

        <div className="content">
          <Sale />
          {/* <Chinhsach /> */}
        </div>
      </div>

      <Footer />

    </div>
  )
}

export default App