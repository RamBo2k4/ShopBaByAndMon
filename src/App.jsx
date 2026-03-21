import { useState } from 'react'
import './App.css'
import Header from './components/header'
import Footer from './components/Footer'
import MainMenu from './components/MenuMain'
import Sale from './pages/sale'
import Chinhsach from './pages/chinhsach'
import FAQ from './pages/FAQ'

function App() {
  const [currentPage, setCurrentPage] = useState('sale')

  const renderPage = () => {
    switch (currentPage) {
      case 'faq': return <FAQ />
      case 'chinhsach': return <Chinhsach />
      default: return <Sale />
    }
  }

  return (
    <div className="app">

      <Header />

      <div className="layout">
        <MainMenu />

        <div className="content">
          {renderPage()}
        </div>
      </div>

      <Footer onNavigate={setCurrentPage} />

    </div>
  )
}

export default App