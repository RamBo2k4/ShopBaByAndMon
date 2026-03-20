import './App.css'
import Header from './components/header'
import Footer from './pages/Footer'
import MainMenu from './pages/MenuMain'
import Sale from './components/sale'
import Chinhsach from './components/chinhsach'
import Voucher from './components/voucher'

function App() {
  return (
    <div className="app">

      <Header />

      <div className="layout">
        <MainMenu />

        <div className="content">
          {/* <Sale /> */}
          <Chinhsach />
        </div>
      </div>

      <Footer />

    </div>
  )
}

export default App